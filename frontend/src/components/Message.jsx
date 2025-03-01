// components/Message.jsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

const Message = ({ messageType, message }) => {
  return (
    <div
      className={`p-4 rounded-3xl text-[14px] shadow-xs flex flex-col gap-3 ${
        messageType === "ai"
          ? "bg-gray-100 w-9/10"
          : "bg-black text-white w-fit max-w-9/10 ml-auto break-words"
      }`}
    >
      {messageType === "ai" && (
        <div className="flex items-center gap-3 font-medium">
          <span className="bg-black py-1 px-2 rounded-lg text-sm text-white">
            Bot
          </span>
        </div>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown>
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Message);