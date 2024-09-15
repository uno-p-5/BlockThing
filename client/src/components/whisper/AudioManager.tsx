"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

import { Button } from "../ui/button";
import AudioPlayer from "./AudioPlayer";
import AudioRecorder from "./AudioRecorder";
import { Transcriber } from "./hooks/useTranscriber";
import Modal from "./modal/Modal";
import { UrlInput } from "./modal/UrlInput";
import Progress from "./Progress";
import { TranscribeButton } from "./TranscribeButton";
import Constants from "./utils/Constants";

function titleCase(str: string) {
  str = str.toLowerCase();
  return (str.match(/\w+.?/g) || [])
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}

// List of supported languages:
// https://help.openai.com/en/articles/7031512-whisper-api-faq
// https://github.com/openai/whisper/blob/248b6cb124225dd263bb9bd32d060b6517e067f8/whisper/tokenizer.py#L79
const LANGUAGES = {
  en: "english",
  zh: "chinese",
  de: "german",
  es: "spanish/castilian",
  ru: "russian",
  ko: "korean",
  fr: "french",
  ja: "japanese",
  pt: "portuguese",
  tr: "turkish",
  pl: "polish",
  ca: "catalan/valencian",
  nl: "dutch/flemish",
  ar: "arabic",
  sv: "swedish",
  it: "italian",
  id: "indonesian",
  hi: "hindi",
  fi: "finnish",
  vi: "vietnamese",
  he: "hebrew",
  uk: "ukrainian",
  el: "greek",
  ms: "malay",
  cs: "czech",
  ro: "romanian/moldavian/moldovan",
  da: "danish",
  hu: "hungarian",
  ta: "tamil",
  no: "norwegian",
  th: "thai",
  ur: "urdu",
  hr: "croatian",
  bg: "bulgarian",
  lt: "lithuanian",
  la: "latin",
  mi: "maori",
  ml: "malayalam",
  cy: "welsh",
  sk: "slovak",
  te: "telugu",
  fa: "persian",
  lv: "latvian",
  bn: "bengali",
  sr: "serbian",
  az: "azerbaijani",
  sl: "slovenian",
  kn: "kannada",
  et: "estonian",
  mk: "macedonian",
  br: "breton",
  eu: "basque",
  is: "icelandic",
  hy: "armenian",
  ne: "nepali",
  mn: "mongolian",
  bs: "bosnian",
  kk: "kazakh",
  sq: "albanian",
  sw: "swahili",
  gl: "galician",
  mr: "marathi",
  pa: "punjabi/panjabi",
  si: "sinhala/sinhalese",
  km: "khmer",
  sn: "shona",
  yo: "yoruba",
  so: "somali",
  af: "afrikaans",
  oc: "occitan",
  ka: "georgian",
  be: "belarusian",
  tg: "tajik",
  sd: "sindhi",
  gu: "gujarati",
  am: "amharic",
  yi: "yiddish",
  lo: "lao",
  uz: "uzbek",
  fo: "faroese",
  ht: "haitian creole/haitian",
  ps: "pashto/pushto",
  tk: "turkmen",
  nn: "nynorsk",
  mt: "maltese",
  sa: "sanskrit",
  lb: "luxembourgish/letzeburgesch",
  my: "myanmar/burmese",
  bo: "tibetan",
  tl: "tagalog",
  mg: "malagasy",
  as: "assamese",
  tt: "tatar",
  haw: "hawaiian",
  ln: "lingala",
  ha: "hausa",
  ba: "bashkir",
  jw: "javanese",
  su: "sundanese",
};

export enum AudioSource {
  URL = "URL",
  FILE = "FILE",
  RECORDING = "RECORDING",
}

export function AudioManager(props: {
  transcriber: Transcriber;
  wsClient?: WebSocket;
  setServerMessages?: any;
  setInput: (input: string) => unknown;
}) {
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [audioData, setAudioData] = useState<
    | {
        buffer: AudioBuffer;
        url: string;
        source: AudioSource;
        mimeType: string;
      }
    | undefined
  >(undefined);
  const [audioDownloadUrl, setAudioDownloadUrl] = useState<string | undefined>(
    undefined
  );

  const isAudioLoading = progress !== undefined;

  const resetAudio = () => {
    setAudioData(undefined);
    setAudioDownloadUrl(undefined);
  };

  const setAudioFromDownload = async (data: ArrayBuffer, mimeType: string) => {
    const audioCTX = new AudioContext({
      sampleRate: Constants.SAMPLING_RATE,
    });
    const blobUrl = URL.createObjectURL(new Blob([data], { type: "audio/*" }));
    const decoded = await audioCTX.decodeAudioData(data);
    setAudioData({
      buffer: decoded,
      url: blobUrl,
      source: AudioSource.URL,
      mimeType: mimeType,
    });
  };

  const setAudioFromRecording = async (data: Blob) => {
    resetAudio();
    setProgress(0);
    const blobUrl = URL.createObjectURL(data);
    const fileReader = new FileReader();
    fileReader.onprogress = (event) => {
      setProgress(event.loaded / event.total || 0);
    };
    fileReader.onloadend = async () => {
      const audioCTX = new AudioContext({
        sampleRate: Constants.SAMPLING_RATE,
      });
      const arrayBuffer = fileReader.result as ArrayBuffer;
      const decoded = await audioCTX.decodeAudioData(arrayBuffer);
      setProgress(undefined);
      setAudioData({
        buffer: decoded,
        url: blobUrl,
        source: AudioSource.RECORDING,
        mimeType: data.type,
      });
    };
    fileReader.readAsArrayBuffer(data);
  };

  const downloadAudioFromUrl = async (
    requestAbortController: AbortController
  ) => {
    if (audioDownloadUrl) {
      try {
        setAudioData(undefined);
        setProgress(0);
        const { data, headers } = (await axios.get(audioDownloadUrl, {
          signal: requestAbortController.signal,
          responseType: "arraybuffer",

          //@ts-expect-error trust me bro
          onDownloadProgress(progressEvent: { progress: any }) {
            setProgress(progressEvent.progress || 0);
          },
        })) as {
          data: ArrayBuffer;
          headers: { "content-type": string };
        };

        let mimeType = headers["content-type"];
        if (!mimeType || mimeType === "audio/wave") {
          mimeType = "audio/wav";
        }
        setAudioFromDownload(data, mimeType);
      } catch (error) {
        console.log("Request failed or aborted", error);
      } finally {
        setProgress(undefined);
      }
    }
  };

  // When URL changes, download audio
  useEffect(() => {
    if (audioDownloadUrl) {
      const requestAbortController = new AbortController();
      downloadAudioFromUrl(requestAbortController);
      return () => {
        requestAbortController.abort();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioDownloadUrl]);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (props.transcriber.output) {
      console.log("Sending voice message:", props.transcriber.output.text);
      // props.wsClient.send(
      //     JSON.stringify({
      //         type: "msg",
      //         msg:
      //             "[User used voice message]" +
      //             props.transcriber.output.text,
      //     })
      // );

      if (props.transcriber.output) {
        // props.setServerMessages((pastServerMessages: any[]) => [
        //   ...pastServerMessages,
        //   {
        //     type: 'user',
        //     message: props.transcriber.output?.text,
        //     fromUser: true
        //   }
        // ])

        console.log(props.transcriber.output?.text);
        props.setInput(props.transcriber.output?.text);
      } else {
        console.log("Could not send voice message: no output");
      }
      setAudioData(undefined);
      props.transcriber.output.chunks = [];
    } else {
      console.log("Could not send voice message: no output");
    }
  };

  return (
    <div className="z-10 flex flex-col gap-y-4">
      {audioData && audioData.buffer && (
        <div className="flex flex-col gap-0 text-base">
          <AudioPlayer
            audioUrl={audioData.url}
            mimeType={audioData.mimeType}
          />

          <div className="relative flex w-full items-center justify-center">
            <TranscribeButton
              onClick={() => {
                props.transcriber.start(audioData.buffer);
              }}
              isModelLoading={props.transcriber.isModelLoading}
              // isAudioLoading ||
              isTranscribing={props.transcriber.isBusy}
            />

            {props.transcriber.output && (
              <Button
                variant={"default"}
                className="bg-green-500 hover:bg-green-400"
                onClick={handleClick}
              >
                Submit
              </Button>
            )}

            <SettingsTile
              className="absolute right-4"
              transcriber={props.transcriber}
              icon={<SettingsIcon />}
            />
          </div>
          {props.transcriber.progressItems.length > 0 && (
            <div className="relative z-10 w-full p-4">
              <label>Loading model files... (only run once)</label>
              {props.transcriber.progressItems.map((data) => (
                <div key={data.file}>
                  <Progress
                    text={data.file}
                    percentage={data.progress}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col items-center justify-center rounded-lg bg-white shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
        <div className="flex w-full flex-row">
          <UrlTile
            icon={<AnchorIcon />}
            text={"From URL"}
            onUrlUpdate={(e) => {
              props.transcriber.onInputChange();
              setAudioDownloadUrl(e);
            }}
          />
          <VerticalBar />

          {navigator.mediaDevices && (
            <>
              <RecordTile
                icon={<MicrophoneIcon />}
                text={"Record Live"}
                setAudioData={(e) => {
                  props.transcriber.onInputChange();
                  setAudioFromRecording(e);
                }}
              />
            </>
          )}

          <VerticalBar />
          <FileTile
            icon={<FolderIcon />}
            text={"From file"}
            onFileUpdate={(decoded, blobUrl, mimeType) => {
              props.transcriber.onInputChange();
              setAudioData({
                buffer: decoded,
                url: blobUrl,
                source: AudioSource.FILE,
                mimeType: mimeType,
              });
            }}
          />
        </div>

        {isAudioLoading && (
          <AudioDataBar progress={isAudioLoading ? progress : +!!audioData} />
        )}
      </div>
    </div>
  );
}

function SettingsTile(props: {
  icon: JSX.Element;
  className?: string;
  transcriber: Transcriber;
}) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (url: string) => {
    onClose();
  };

  return (
    <div className={props.className}>
      <Tile
        icon={props.icon}
        onClick={onClick}
      />
      <SettingsModal
        show={showModal}
        onSubmit={onSubmit}
        onClose={onClose}
        transcriber={props.transcriber}
      />
    </div>
  );
}

function SettingsModal(props: {
  show: boolean;
  onSubmit: (url: string) => void;
  onClose: () => void;
  transcriber: Transcriber;
}) {
  const names = Object.values(LANGUAGES).map(titleCase);

  const models = {
    // Original checkpoints
    "Xenova/whisper-tiny": [41, 152],
    "Xenova/whisper-base": [77, 291],
    "Xenova/whisper-small": [249],
    "Xenova/whisper-medium": [776],

    // Distil Whisper (English-only)
    "distil-whisper/distil-medium.en": [402],
    "distil-whisper/distil-large-v2": [767],
  };
  return (
    <Modal
      show={props.show}
      title={"Settings"}
      content={
        <>
          <label>Select the model to use.</label>
          <select
            className="my-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            defaultValue={props.transcriber.model}
            onChange={(e) => {
              props.transcriber.setModel(e.target.value);
            }}
          >
            {Object.keys(models)
              .filter(
                (key) =>
                  props.transcriber.quantized ||
                  // @ts-ignore
                  models[key].length == 2
              )
              .filter(
                (key) =>
                  !props.transcriber.multilingual ||
                  !key.startsWith("distil-whisper/")
              )
              .map((key) => (
                <option
                  key={key}
                  value={key}
                >{`${key}${
                  props.transcriber.multilingual ||
                  key.startsWith("distil-whisper/")
                    ? ""
                    : ".en"
                } (${
                  // @ts-ignore
                  models[key][props.transcriber.quantized ? 0 : 1]
                }MB)`}</option>
              ))}
          </select>
          <div className="mb-3 flex items-center justify-between px-1">
            <div className="flex">
              <input
                id="multilingual"
                type="checkbox"
                checked={props.transcriber.multilingual}
                onChange={(e) => {
                  props.transcriber.setMultilingual(e.target.checked);
                }}
              ></input>
              <label
                htmlFor={"multilingual"}
                className="ms-1"
              >
                Multilingual
              </label>
            </div>
            <div className="flex">
              <input
                id="quantize"
                type="checkbox"
                checked={props.transcriber.quantized}
                onChange={(e) => {
                  props.transcriber.setQuantized(e.target.checked);
                }}
              ></input>
              <label
                htmlFor={"quantize"}
                className="ms-1"
              >
                Quantized
              </label>
            </div>
          </div>
          {props.transcriber.multilingual && (
            <>
              <label>Select the source language.</label>
              <select
                className="mb-3 mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                defaultValue={props.transcriber.language}
                onChange={(e) => {
                  props.transcriber.setLanguage(e.target.value);
                }}
              >
                {Object.keys(LANGUAGES).map((key, i) => (
                  <option
                    key={key}
                    value={key}
                  >
                    {names[i]}
                  </option>
                ))}
              </select>
              <label>Select the task to perform.</label>
              <select
                className="mb-3 mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                defaultValue={props.transcriber.subtask}
                onChange={(e) => {
                  props.transcriber.setSubtask(e.target.value);
                }}
              >
                <option value={"transcribe"}>Transcribe</option>
                <option value={"translate"}>Translate (to English)</option>
              </select>
            </>
          )}
        </>
      }
      onClose={props.onClose}
      onSubmit={() => {}}
    />
  );
}

function VerticalBar() {
  return <div className="w-[1px] bg-slate-200"></div>;
}

function AudioDataBar(props: { progress: number }) {
  return <ProgressBar progress={`${Math.round(props.progress * 100)}%`} />;
}

function ProgressBar(props: { progress: string }) {
  return (
    <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-1 rounded-full bg-blue-600 transition-all duration-100"
        style={{ width: props.progress }}
      ></div>
    </div>
  );
}

function UrlTile(props: {
  icon: JSX.Element;
  text: string;
  onUrlUpdate: (url: string) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (url: string) => {
    props.onUrlUpdate(url);
    onClose();
  };

  return (
    <div className="w-full rounded-lg hover:bg-[#f5f5f4]">
      <Tile
        icon={props.icon}
        text={props.text}
        onClick={onClick}
      />
      <UrlModal
        show={showModal}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </div>
  );
}

function UrlModal(props: {
  show: boolean;
  onSubmit: (url: string) => void;
  onClose: () => void;
}) {
  const [url, setUrl] = useState(Constants.DEFAULT_AUDIO_URL);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onSubmit = () => {
    props.onSubmit(url);
  };

  return (
    <Modal
      show={props.show}
      title={"From URL"}
      content={
        <>
          {"Enter the URL of the audio file you want to load."}
          <UrlInput
            onChange={onChange}
            value={url}
          />
        </>
      }
      onClose={props.onClose}
      submitText={"Load"}
      onSubmit={onSubmit}
    />
  );
}

function FileTile(props: {
  icon: JSX.Element;
  text: string;
  onFileUpdate: (
    decoded: AudioBuffer,
    blobUrl: string,
    mimeType: string
  ) => void;
}) {
  // const audioPlayer = useRef<HTMLAudioElement>(null);

  // Create hidden input element
  let elem = document.createElement("input");
  elem.type = "file";
  elem.oninput = (event) => {
    // Make sure we have files to use
    let files = (event.target as HTMLInputElement).files;
    if (!files) return;

    // Create a blob that we can use as an src for our audio element
    const urlObj = URL.createObjectURL(files[0]);
    const mimeType = files[0].type;

    const reader = new FileReader();
    reader.addEventListener("load", async (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer; // Get the ArrayBuffer
      if (!arrayBuffer) return;

      const audioCTX = new AudioContext({
        sampleRate: Constants.SAMPLING_RATE,
      });

      const decoded = await audioCTX.decodeAudioData(arrayBuffer);

      props.onFileUpdate(decoded, urlObj, mimeType);
    });
    reader.readAsArrayBuffer(files[0]);

    // Reset files
    elem.value = "";
  };

  return (
    <div className="w-full rounded-lg hover:bg-[#f5f5f4]">
      <Tile
        icon={props.icon}
        text={props.text}
        onClick={() => elem.click()}
      />
    </div>
  );
}

function RecordTile(props: {
  icon: JSX.Element;
  text: string;
  setAudioData: (data: Blob) => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const onClick = () => {
    setShowModal(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSubmit = (data: Blob | undefined) => {
    if (data) {
      props.setAudioData(data);
      onClose();
    }
  };

  return (
    <div className="z-[10000] size-full border-b-2 border-b-primary hover:bg-[#f5f5f4]">
      <Tile
        icon={props.icon}
        text={props.text}
        onClick={onClick}
      />
      <RecordModal
        show={showModal}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </div>
  );
}

function RecordModal(props: {
  show: boolean;
  onSubmit: (data: Blob | undefined) => void;
  onClose: () => void;
}) {
  const [audioBlob, setAudioBlob] = useState<Blob>();

  const onRecordingComplete = (blob: Blob) => {
    setAudioBlob(blob);
  };

  const onSubmit = () => {
    props.onSubmit(audioBlob);
    setAudioBlob(undefined);
  };

  const onClose = () => {
    props.onClose();
    setAudioBlob(undefined);
  };

  return (
    <Modal
      show={props.show}
      title={"From Recording"}
      content={
        <>
          {"Record audio using your microphone"}
          <AudioRecorder onRecordingComplete={onRecordingComplete} />
        </>
      }
      onClose={onClose}
      submitText={"Load"}
      submitEnabled={audioBlob !== undefined}
      onSubmit={onSubmit}
    />
  );
}

function Tile(props: {
  icon: JSX.Element;
  text?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={props.onClick}
      className="flex w-[100%] items-center justify-start rounded-lg p-3"
    >
      <div className="size-7">{props.icon}</div>
      {props.text && (
        <div className="break-text md:text-md w-30 ml-2 text-center text-sm">
          {props.text}
        </div>
      )}
    </button>
  );
}

function AnchorIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
      />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.25"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function MicrophoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  );
}