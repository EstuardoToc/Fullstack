import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Buscar productos..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
          />
          <button type="submit" className="btn-search">
            🔍
          </button>
          {query && (
            <button 
              type="button" 
              onClick={handleClear}
              className="btn-clear"
            >
              ✕
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;