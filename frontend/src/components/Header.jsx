// components/Header.jsx
"use client";
import Expand from "../Icons/Expand";
import X from "../Icons/X";

const Header = ({ isExpanded, setIsExpanded, hasMessages, onClearChat }) => {
  // Add a function to close the chatbot
  const handleClose = () => {
    // Send message to parent window to close the chatbot
    window.parent.postMessage({ type: "closeChatbot" }, "*");
  };

  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 rounded-tr-2xl rounded-tl-2xl">
      <div className="flex items-center">
        {/* <img src="././dist/logo_placeholder.jpg" alt="logo" className="w-auto h-6" /> */}
        <p className="ml-2">LearnAI</p>
      </div>
      <div className="flex items-center space-x-2">
        {/* Close button */}
        <button
          className="hover:text-gray-600 hover:cursor-pointer hover:bg-zinc-100 p-1"
          onClick={handleClose}
          aria-label="Close chatbot"
        >
          <X />
        </button>

        {/* Expand button */}
        <button
          className="hover:text-gray-600 hover:cursor-pointer hover:bg-zinc-100 p-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Expand />
        </button>
      </div>
    </div>
  );
};

export default Header;
