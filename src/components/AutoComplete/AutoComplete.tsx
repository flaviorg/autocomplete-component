import React, { useState, useCallback, useEffect, memo } from 'react';
import SuggestionItem from '../SuggestionItem';
import { SuggestionType } from '../types/types';
import { search } from '../service';
import './AutoComplete.css';

const AutoComplete: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);

  const getMovies = async (query: string) => {
    const movies = await search(query);
    setSuggestions(movies);
  };

  const handleQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleItemClick = useCallback(
    (item: string) => () => {
      setQuery(item);
      setSuggestions([]);
    },
    [],
  );

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.trim().length > 0) {
        await getMovies(query);
      } else {
        setSuggestions([]);
      }
    }, 800); // delay time in milliseconds

    // cleanup function to clear timeout if input changes again before delay is up
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="autocomplete">
      <h3>Movies Search</h3>
      <div>
        <label>Autocomplete input:</label>
      </div>
      <input type="text" value={query} onChange={handleQueryChange} className="autocomplete-input" />
      {suggestions.length > 0 && (
        <div className="autocomplete-input_suggestions">
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              suggestion={suggestion.title}
              query={query}
              onClick={handleItemClick(suggestion.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(AutoComplete);
