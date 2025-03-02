import { useState } from "react";
import ChatContainer from "./components/ChatContainer";
import SessionExpiredModal from "./components/SessionExpiredModal";
import ErrorBanner from "./components/ErrorBanner";
import Header from "./components/Header";
import useChat from "./hooks/useChat";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    messages,
    suggestions,
    inputMessage,
    isLoading,
    error,
    sessionId,
    showSessionExpiredModal,
    handleSendMessage,
    handleInputChange,
    handleClearChat,
    handleSuggestionClick,
    handleDismissSessionExpiredModal
  } = useChat();

  return (
    <div
      className={`relative mx-auto
        ${
          isExpanded
            ? "w-[90vw] h-[90vh] max-w-[900px] max-h-[900px]"
            : "w-full h-full"
        }
        rounded-2xl shadow-lg flex flex-col transition-all duration-300 bg-white`}
    >
      <Header 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        hasMessages={messages.length > 0}
        onClearChat={handleClearChat}
      />

      {error && <ErrorBanner message={error} />}

      <ChatContainer
        messages={messages}
        suggestions={suggestions}
        isLoading={isLoading}
        inputMessage={inputMessage}
        onInputChange={handleInputChange}
        onSendMessage={handleSendMessage}
        onSuggestionClick={handleSuggestionClick}
      />

      {showSessionExpiredModal && (
        <SessionExpiredModal onDismiss={handleDismissSessionExpiredModal} />
      )}
    </div>
  );
}

export default App;
