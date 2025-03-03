// components/ChatInput.jsx
import Send from "../Icons/Send";

const ChatInput = ({ inputMessage, onInputChange, onSendMessage, isLoading }) => {
  return (
    <div className="absolute bottom-0 left-4 right-4 z-10 bg-white h-[4rem] rounded-tl-4xl rounded-tr-4xl ">
      <form
        onSubmit={onSendMessage}
        className="shadow-xs border border-zinc-300 rounded-full flex items-center bg-white focus-within:border-black focus-within:border-2"
      >
        <input
          className="flex-1 outline-none px-4 py-1"
          placeholder="Ask a question..."
          value={inputMessage}
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="py-1 px-2 hover:cursor-pointer"
          disabled={!inputMessage.trim() || isLoading}
        >
          <Send />
        </button>
      </form>
    </div>
  );
};
export default ChatInput