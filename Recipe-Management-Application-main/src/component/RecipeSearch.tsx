import React, { useState, useMemo } from 'react';
import { debounce } from '../utils/debounce';

interface RecipeSearchProps {
    onSearch: (query: string) => void;
}

const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const debouncedSearch = useMemo(() => debounce(onSearch, 300), [onSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        debouncedSearch(newQuery);
    };

    return (
        <div className="recipe-search">
            <label htmlFor="prepTimeFilter">Search Recipes By Title Or Ingredients: </label>
            <input
                id="prepTimeFilter"
                type="text"
                placeholder="Search recipes by title or ingredients"
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default RecipeSearch;

