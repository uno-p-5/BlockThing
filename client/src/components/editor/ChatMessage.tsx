import { Message } from "../../lib/types";

interface MessageParams {
    message: Message;
}

const ChatMessage = ({ message }: MessageParams) => {
    return (
        <div className={`p-2 px-3 rounded-lg mb-2 flex max-w-[320px] m-2
            ${message.role === "user" ? "bg-blue-500 text-white ml-auto justify-end" : "bg-gray-200 mr-auto"}`}>
            <p className="text-sm whitespace-break-spaces break-words overflow-wrap">{message.message}</p>
        </div>
     );
}
 
export default ChatMessage;