import { parseMarkdown } from "@/lib/renderer/parser";
import { Message } from "../../lib/types";

import "./messages.css";

interface MessageParams {
  message: Message;
}

const ChatMessage = ({ message }: MessageParams) => {
  return (
    <div
      className={`m-2 mb-2 flex w-fit max-w-[80%] rounded-lg p-2 px-3 ${message.role === "user" ? "ml-auto justify-end bg-blue-500 text-white" : "mr-auto w-[90%] bg-gray-200"}`}
    >
      <div 
        className={`parser ${message.role === "user" && "dark"}`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}>
      </div>
      {/* <p className="overflow-wrap whitespace-break-spaces break-words text-sm">
        {message.content}
      </p> */}
    </div>
  );
};

export default ChatMessage;
