const SuggestionList = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="mb-20 flex flex-col gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="text-left text-blue-500 hover:bg-gray-300 text-sm px-3 py-1 rounded-2xl whitespace-normal break-words w-fit"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionList