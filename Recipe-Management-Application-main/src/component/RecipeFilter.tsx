import React from 'react';

interface RecipeFilterProps {
    onFilterChange: (filter: string) => void;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ onFilterChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onFilterChange(e.target.value);
    };

    return (
        <div className="recipe-filter">
            <label htmlFor="prepTimeFilter">Filter By Preparation Time: </label>
            <select id="prepTimeFilter" onChange={handleChange}>
                <option value="all">All</option>
                <option value="lessThan30">Less than 30 minutes</option>
                <option value="30to60">30-60 minutes</option>
                <option value="moreThan60">More than 60 minutes</option>
            </select>
        </div>
    );
};

export default RecipeFilter;
