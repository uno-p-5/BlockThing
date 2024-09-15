import { useRef, useState } from "react";

import { Message } from "@/lib/types";
import { Mic, Send } from "lucide-react";

import { Button } from "../ui/button";
import ChatMessage from "./ChatMessage";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(chatmsgs);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendClick = async () => {
    const prompt = textareaRef.current?.value.trim();
    if (!prompt) return;

    if (!textareaRef.current) {
      console.error("Textarea ref not found");
      return;
    }

    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", message: prompt },
    ]);

    try {
      const response = await fetch("/pyapi/llm/o1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: messages }),
      });

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
        { role: "assistant", message: "" },
      ]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          console.log("Chunk received:", chunk);

          botMessage += chunk;

          // Update the last message in messages
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            updatedMessages[updatedMessages.length - 1].message = botMessage;
            return updatedMessages;
          });
        }
      }

      console.log("Streaming complete");
    } catch (error) {
      console.error("Error fetching and streaming:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          message:
            "I ran into an error with your request! Please try again later.",
        },
      ]);
    }
  };

  return (
    <div className="max-h-full w-[400px] pt-12">
      <div className="relative flex h-full flex-col gap-x-2 rounded-lg outline outline-[0.5px] outline-gray-300">
        <div className="overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
              message={msg}
            />
          ))}
        </div>

        <div className="sticky bottom-0 mt-auto flex h-20 max-h-20 w-full flex-row rounded-b-lg border-t outline-[0.5px] outline-gray-400">
          <textarea
            ref={textareaRef}
            className="h-full max-h-20 w-full resize-none overflow-y-scroll border-r-[0.5px] border-r-gray-400 p-2 outline-none"
            placeholder="What do you want to learn today?"
            onInput={(e: any) => {
              e.target.style.height = "auto";
              if (e.target.scrollHeight <= 200) {
                e.target.style.height = `${e.target.scrollHeight}px`;
              } else {
                e.target.style.height = `200px`;
              }
            }}
            style={{ overflowY: "auto" }}
          />

          <div className="flex flex-col gap-y-1 p-1">
            <Button
              className="rounded-lg p-1"
              variant="link"
              onClick={handleSendClick}
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
