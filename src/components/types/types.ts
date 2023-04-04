interface SuggestionType {
  imdb_id: string;
  title: string;
}

interface SuggestionItemProps {
  suggestion: string;
  query: string;
  onClick: () => void;
}

export type { SuggestionItemProps, SuggestionType };
