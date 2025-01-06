"use client"

import { useState, useEffect } from "react";
import Loading from "./components/Loading";
import SearchBar from "./components/SearchBar";
import PokemonDetails from "./components/PokemonDetails"
import Filter from "./components/Filter"

export default function Home() {
  const [loading, setLoading] = useState({ display: "none" });
  const [selectedPokemon, setSelectedPokemon] = useState(null)
    async function fetchPokemon() {
      setLoading({ display: "flex" });
      setSelectedPokemon(null)
      try {
          
          const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
          if (pokemonName.length === 0) {
              throw new Error("Cannot fetch empty data");
          }

          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
          if (!response.ok) {
              throw new Error("Could not fetch resource");
          }

          const data = await response.json();
          setSelectedPokemon(data)
      } catch(error) {
          alert(error);
      } finally {
        setLoading({ display: "none" });
      }
  }
 


  return (
    <div>
        <div id="pokemon-finder">
          <h1>Pokemon Finder</h1>
      </div>
      <Loading loadingType={loading} />
      <SearchBar search={fetchPokemon}/>
      {selectedPokemon && <PokemonDetails pokemon={selectedPokemon}/>}
    </div>

  );
}
