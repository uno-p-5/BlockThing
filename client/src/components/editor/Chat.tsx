import { Mic, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { Button } from "../ui/button";
import { useState, useRef } from "react";
import { Message } from "@/lib/types";

const Chatbox = () => {
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
      const response = await fetch("http://localhost:8080/llm/o1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
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
        { role: "model", message: "" },
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
        { role: "model", message: "I ran into an error with your request! Please try again later." },
      ]);
    }
  };

  return (
    <div className="max-h-[80vh] w-[400px] py-[48px] pl-4 pr-1">
      <div className="relative flex flex-col gap-x-2 rounded-lg h-full outline outline-[0.5px] outline-gray-300 overflow-y-auto">
        {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
        ))}
        <div className="absolute flex flex-row outline outline-[0.5px] outline-gray-400 bottom-0 w-full min-h-[60px] max-h-[200px] rounded-b-lg">
          <textarea
            ref={textareaRef}
            className="w-full h-full p-2 resize-none outline-none min-h-[60px] max-h-[200px] border-r-[0.5px] border-r-gray-400"
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
            <Button className="p-1 rounded-lg" variant="link">
              <Mic className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const chatmsgs = [
  {
    role: "user",
    message: "Hello, how are you?",
  },
  {
    role: "model",
    message: "Doing great! How about you?",
  },
];

export default Chatbox;
