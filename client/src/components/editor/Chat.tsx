import { useEffect, useRef, useState } from "react";

import { Message } from "@/lib/types";
import { Mic, Send } from "lucide-react";

import { Button } from "../ui/button";
import ChatMessage from "./ChatMessage";
import "./messages.css";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>(chatmsgs);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");

  const handleSendClick = async () => {
    if (!prompt) {
        setError("Please enter a message!");
        return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: prompt },
    ]);

    try {
      const response = await fetch("/pyapi/llm/4o", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [
            ...messages,
            { role: "user", content: prompt },
        ], tuned: false }),
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
        { role: "assistant", content: "" },
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
            updatedMessages[updatedMessages.length - 1].content = botMessage;
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
          content:
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
        <p className="text-sm text-red-500 w-full absolute -top-6 left-2">{error}</p>
          <textarea
            onChange={(e) => setPrompt(e.currentTarget.value)}
            className="h-full max-h-20 w-full rounded-b-lg rounded-r-none resize-none overflow-y-scroll border-r-[0.5px] border-r-gray-400 p-2 outline-none"
            placeholder="What do you want to learn today?"
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
