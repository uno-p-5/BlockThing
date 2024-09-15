import { parseMarkdown } from "@/lib/renderer/parser";
import { Message } from "../../lib/types";
import "./messages.css";

interface MessageParams {
  message: Message;
}

const ChatMessage = ({ message }: MessageParams) => {
  return (
    <div
      className={`m-2 mb-2 flex w-2/3 rounded-lg p-2 px-3 ${message.role === "user" ? "ml-auto justify-end bg-blue-500 text-white" : "mr-auto bg-gray-200"}`}
    >
      <div 
        className={`parser ${message.role === "user" && "dark"}`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}>
      </div>
    </div>
  );
};

export default ChatMessage;
