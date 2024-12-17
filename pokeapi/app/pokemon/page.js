"use client";

import { useState, useEffect } from "react";
import PokemonList from "../components/PokemonList";
import Loading from "../components/Loading";
import PokemonDetails from "../components/PokemonDetails"

export default function PokemonPage() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState({ display: "none" });

  useEffect(() => {
    async function fetchPokemonList() {
      setLoading({ display: "flex" });

      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        if (!response.ok) {
          throw new Error("Could not fetch list");
        };

        const data = await response.json();
        const pokemonPromise = data.results.map(async (pokemon) => {
          const pokemonData = await fetch(pokemon.url);
          return pokemonData.json();
        });

        const pokemons = await Promise.all(pokemonPromise);
        setPokemons(pokemons);
      } catch(error) {
        alert(error)
      } finally {
        setLoading({ display: "none" });
      }
    }

    fetchPokemonList();
  }, []);

  return (
    <div>
      <Loading loadingType={loading} />
      <PokemonList pokemons={pokemons} onSelectPokemon={(name) => PokemonDetails(name)} />
    </div>
  );
}
