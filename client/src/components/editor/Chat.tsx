/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Message } from "@/lib/types";
import { Mic, Send } from "lucide-react";

import { Button } from "../ui/button";
import ChatMessage from "./ChatMessage";
import "./messages.css";

interface ChatParams {
  initialPrompt?: string | null;
  code: string;
  setCode: (code: string) => void;
}

export const Chat = ({
  initialPrompt,
  code,
  setCode,
}: ChatParams) => {
  const [messages, setMessages] = useState<Message[]>(chatmsgs);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialize = async () => {
      if (initialPrompt !== null && initialPrompt !== "") {
        await handleSendClick(initialPrompt as string, true);
      }
    }
    initialize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

//   useLayoutEffect(() => {
//     if (scrollRef && scrollRef.current) {
//         setTimeout(() => {
//             if (scrollRef.current) {
//                 scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 100;
//             }
//         }, 100); 
//     }
// }, [messages]);

  const handleSendClick = async (msg: string, init: boolean = false) => {
    if (!prompt && !init) {
        setError("Please enter a message!");
        return;
    }

    let model = '4o';
    if (init) {
      model = 'o1';
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: msg },
    ]);

    try {
      const response = await fetch(`/pyapi/llm/${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [
            ...messages,
            { role: "user", content: msg },
        ], tuned: false }),
      });

      setPrompt("");

      if (!response.body) {
        console.error("No response body");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botMessage = "";

      // Append an empty message from the bot to the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "" },
      ]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // console.log("Chunk received:", chunk);

          botMessage += chunk;

          // Update the last message in messages
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].content = botMessage;
            return updatedMessages;
          });
        }
      }

      // console.log("Streaming complete");
    } catch (error) {
      console.error("Error fetching and streaming:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          content:
            "I ran into an error with your request! Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="max-h-full w-[600px] pt-12">
      <div className="relative flex h-full flex-col gap-x-2 rounded-lg outline outline-[0.5px] outline-gray-300">
        <div className="overflow-y-auto" ref={scrollRef}>
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg}
            />
          ))}
        </div>

        <div className="sticky bottom-0 mt-auto flex h-20 max-h-20 w-full flex-row rounded-b-lg border-t outline-[0.5px] outline-gray-400">
        <p className="text-sm text-red-500 w-full absolute -top-6 left-2">{error}</p>
          <textarea
            onChange={(e) => setPrompt(e.currentTarget.value)}
            value={prompt}
            className="h-full max-h-20 w-full rounded-b-lg rounded-r-none resize-none overflow-y-scroll border-r-[0.5px] border-r-gray-400 p-2 outline-none"
            placeholder="What do you want to learn today?"
            style={{ overflowY: "auto" }}
          />

          <div className="flex flex-col gap-y-1 p-1">
            <Button
              className="rounded-lg p-1"
              variant="link"
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onClick={(e) => handleSendClick(prompt)}
            >
              <Send className="h-6 w-6" />
            </Button>
            <Button
              className="rounded-lg p-1"
              variant="link"
            >
              <Mic className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const chatmsgs: Message[] = [];
