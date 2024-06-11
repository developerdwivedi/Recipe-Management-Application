import React from 'react';
import RecipeItem from './RecipeItem';

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  prepTime: string;
  isFavorite: boolean;
}

interface RecipeListProps {
  recipes: Recipe[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onToggleFavorite: (index: number) => void;
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <RecipeItem
          key={index}
          recipe={recipe}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
          onToggleFavorite={() => onToggleFavorite(index)}
        />
      ))}
    </div>
  );
};

export default RecipeList;
