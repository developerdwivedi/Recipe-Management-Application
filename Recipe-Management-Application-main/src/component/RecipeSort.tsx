import React from 'react';

interface RecipeSortProps {
    onSortChange: (order: 'asc' | 'desc') => void;
}

const RecipeSort: React.FC<RecipeSortProps> = ({ onSortChange }) => {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value as 'asc' | 'desc');
    };

    return (
        <div className="recipe-sort">
            <label htmlFor="sortOrder">Sort By Preparation Time: </label>
            <select id="sortOrder" onChange={handleSortChange}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    );
};

export default RecipeSort;
