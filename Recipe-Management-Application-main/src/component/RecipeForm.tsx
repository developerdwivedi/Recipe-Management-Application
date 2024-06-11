import React, { useState, useEffect } from 'react';
import './RecipeForm.css';

interface Recipe {
    title: string;
    ingredients: string;
    instructions: string;
    prepTime: string;
    isFavorite: boolean;
}

interface RecipeFormProps {
    onAddRecipe: (recipe: Recipe) => void;
    editingRecipe?: Recipe; 
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onAddRecipe, editingRecipe }) => {
    const [title, setTitle] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [prepTime, setPrepTime] = useState<string>('');

    useEffect(() => {
        if (editingRecipe) {
            setTitle(editingRecipe.title);
            setIngredients(editingRecipe.ingredients);
            setInstructions(editingRecipe.instructions);
            setPrepTime(editingRecipe.prepTime);
        }
    }, [editingRecipe]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddRecipe({ title, ingredients, instructions, prepTime, isFavorite: false });
        setTitle('');
        setIngredients('');
        setInstructions('');
        setPrepTime('');
    };

    return (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Ingredients:</label>
                <textarea
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Instructions:</label>
                <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Preparation Time:</label>
                <input
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                />
            </div>
            <button type="submit">{editingRecipe ? 'Update Recipe' : 'Add Recipe'}</button>
        </form>
    );
};

export default RecipeForm;
