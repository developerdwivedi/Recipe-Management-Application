import React from 'react';

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  prepTime: string;
  isFavorite: boolean;
}

interface RecipeItemProps {
  recipe: Recipe;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onEdit, onDelete, onToggleFavorite }) => {
  return (
    <div className="recipe-item">
      <h2>{recipe.title}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <div className="recipe-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onToggleFavorite}>{recipe.isFavorite ? 'Unfavorite' : 'Favorite'}</button>
      </div>
    </div>
  );
};

export default RecipeItem;
