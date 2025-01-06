"use client";

import { useEffect, useState } from "react";

export default function FilterBar({ updateFilters }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [limit, setLimit] = useState("20");
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setPokemonTypes(data.results);
      } catch(error) {
        alert(error)
      }
    }

    fetchTypes();
  }, [])

  const applyFilters = () => {
    updateFilters({ search, type, limit });
  };

  return (
    <div className="filter-bar">
      <h2>Filter Pokemon</h2>
      <div className="filter-name">
        <label>By name: </label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pikachu"
        />
      </div>
      <div className="filter-type">
        <label>By type: </label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value=""></option>
          {pokemonTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-limit">
        <label>Limit: </label>
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          min="1"
          max="100"
        />
      </div>
      <button onClick={applyFilters} className="filter-button">Apply Filters</button>
    </div>
  );
}