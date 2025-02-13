"use client";

import { useState, useEffect } from "react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (name) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div id="favorites">
      <h1>Your Favorite Pokémon</h1>
      {favorites.length === 0 ? (
        <p>You don't have any favorite Pokémon yet!</p>
      ) : (
        <section id="pokemon-list">
          {favorites.map(pokemon => (
            <div key={pokemon.name} className="pokemon">
              <img src={pokemon.image}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
              <button
                onClick={() => removeFromFavorites(pokemon.name)}
                id="button-fav"
              >
                Remove
              </button>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}


