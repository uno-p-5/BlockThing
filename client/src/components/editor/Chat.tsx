/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";

import { Message } from "@/lib/types";
import { Mic, Send } from "lucide-react";

import { Button } from "../ui/button";
import ChatMessage from "./ChatMessage";
import "./messages.css";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface ChatParams {
  initialPrompt?: string | null;
  code: string;
  setCode: (code: string) => void;
  project_id: string;
}

export const Chat = ({
  initialPrompt,
  code,
  setCode,
  project_id: projId,
}: ChatParams) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const projectData = useQuery(api.project.getCurrentProject, { projectId: projId });
  const updateProject = useMutation(api.project.update);

  useEffect(() => {
    if (projectData && projectData?.chat_history && messages.length === 0) {
      setMessages(projectData.chat_history);
    }
  }, [projectData]);

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
    let botMessage = "";
    let codeMessage = "";
    if (init) {
      model = 'o1';
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: msg },
    ]);

    try {
      const response = await fetch(`http://localhost:8080/llm/${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [
            ...messages,
            { role: "user", content: msg },
        ], tuned: true }),
      });

      setPrompt("");

      if (!response.body) {
        console.error("No response body");
        return;
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: "" },
      ]);

      if (init) {
        console.log(response.body);
        let botMessage = await response.text();
          console.log("IBM", botMessage);
          if (botMessage.includes("CODE")) {
            codeMessage = botMessage.slice(botMessage.indexOf("CODE") + 5, botMessage.indexOf("ENDCODE"));
            botMessage = botMessage.slice(botMessage.indexOf("EXPLANATION") + 12, botMessage.indexOf("CODE"));
          }
          // console.log("CM", codeMessage)
          // console.log("BM", botMessage);

          codeMessage.replace('```python', '');
          codeMessage.replace('```', '');
          // console.log(codeMessage);
          setCode(codeMessage);

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].content = botMessage;
            return updatedMessages;
          });

          updateProject({
            project_id: projId,
            chat_history: [
              ...messages,
              { role: "user", content: msg },
              { role: "assistant", content: botMessage },
            ],
          }).then((_) => {
            router.replace(`/editor/${projId}`);
          });
      } else {

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;

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

            botMessage += chunk;

            // Update the last message in messages
            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1].content = botMessage;
              return updatedMessages;
            });

            updateProject({
              project_id: projId,
              chat_history: [
                ...messages,
                { role: "user", content: msg },
                { role: "assistant", content: botMessage },
              ],
            }).then((_) => {
              router.replace(`/editor/${projId}`);
            });
          }
        }
      }

      // console.log("Streaming complete");
    } catch (error) {
      console.error("Error fetching and streaming:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
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
