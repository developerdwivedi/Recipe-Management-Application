import React, { useState, useEffect } from 'react';
import RecipeForm from './component/RecipeForm';
import RecipeList from './component/RecipeList';
import RecipeFilter from './component/RecipeFilter';
import RecipeSearch from './component/RecipeSearch';
import RecipeSort from './component/RecipeSort';
import Pagination from './component/Pagination';
import './App.css';

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  prepTime: string;
  isFavorite: boolean;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recipesPerPage] = useState<number>(6);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = (newRecipe: Recipe) => {
    if (editingIndex !== null) {
      const updatedRecipes = recipes.map((recipe, index) =>
        index === editingIndex ? newRecipe : recipe
      );
      setRecipes(updatedRecipes);
      setEditingIndex(null);
    } else {
      setRecipes([...recipes, { ...newRecipe, isFavorite: false }]);
    }
  };

  const handleEditRecipe = (index: number) => {
    setEditingIndex(index);
  };

  const handleDeleteRecipe = (index: number) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
  };

  const handleToggleFavorite = (index: number) => {
    const updatedRecipes = recipes.map((recipe, i) =>
      i === index ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
    );
    setRecipes(updatedRecipes);
  };

  const handleFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredRecipes = currentRecipes.filter((recipe) => {
    if (filter === 'all') return true;
    if (filter === 'lessThan30') return parseInt(recipe.prepTime) < 30;
    if (filter === '30to60') return parseInt(recipe.prepTime) >= 30 && parseInt(recipe.prepTime) <= 60;
    if (filter === 'moreThan60') return parseInt(recipe.prepTime) > 60;
    return true;
  });

  const searchedRecipes = filteredRecipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRecipes = searchedRecipes.sort((a, b) => {
    const timeA = parseInt(a.prepTime);
    const timeB = parseInt(b.prepTime);
    if (sortOrder === 'asc') {
      return timeA - timeB;
    } else {
      return timeB - timeA;
    }
  });

  return (
    <div className="App">
      <h1>Recipe Management</h1>
      <div className="main-wrapper">
        <RecipeForm
          onAddRecipe={handleAddRecipe}
          editingRecipe={editingIndex !== null ? recipes[editingIndex] : undefined}
        />
        <div className="recipe-list-wrapper">
          <RecipeFilter onFilterChange={handleFilterChange} />
          <RecipeSearch onSearch={handleSearch} />
          <RecipeSort onSortChange={handleSortChange} />
          <RecipeList
            recipes={sortedRecipes}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            onToggleFavorite={handleToggleFavorite}
          />
          <Pagination
            recipesPerPage={recipesPerPage}
            totalRecipes={recipes.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
