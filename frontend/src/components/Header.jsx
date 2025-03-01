// components/Header.jsx
import Expand from "../Icons/Expand";

const Header = ({ isExpanded, setIsExpanded, hasMessages, onClearChat }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b border-gray-200 rounded-tr-2xl rounded-tl-2xl">
      <div className="flex items-center">
        <img src="/logo_placeholder.jpg" alt="logo" className="w-auto h-6" />
      </div>
      <div className="flex items-center space-x-2">

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