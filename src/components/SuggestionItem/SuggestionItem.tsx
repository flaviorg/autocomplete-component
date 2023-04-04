import { SuggestionItemProps } from '../types/types';
import './SuggestionItem.css';

// Manage the suggestions to highlight the part the was used on the query
const SuggestionItem: React.FC<SuggestionItemProps> = ({ suggestion, query, onClick }) => {
  const highlightIndex = suggestion.toLowerCase().indexOf(query.toLowerCase());
  const prefix = suggestion.slice(0, highlightIndex);
  const match = suggestion.slice(highlightIndex, highlightIndex + query.length);
  const suffix = suggestion.slice(highlightIndex + query.length);

  return (
    <p className="suggestion" onClick={onClick}>
      <span className="suggestion-text">{prefix}</span>
      <strong className="suggestion-text suggestion-text_highlighted">{match}</strong>
      <span className="suggestion-text">{suffix}</span>
    </p>
  );
};

export default SuggestionItem;
