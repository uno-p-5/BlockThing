import { Message } from "../../lib/types";

interface MessageParams {
  message: Message;
}

const ChatMessage = ({ message }: MessageParams) => {
  return (
    <div
      className={`m-2 mb-2 flex w-fit max-w-[320px] rounded-lg p-2 px-3 ${message.role === "user" ? "ml-auto justify-end bg-blue-500 text-white" : "mr-auto bg-gray-200"}`}
    >
      <p className="overflow-wrap whitespace-break-spaces break-words text-sm">
        {message.content}
      </p>
    </div>
  );
};

export default ChatMessage;
