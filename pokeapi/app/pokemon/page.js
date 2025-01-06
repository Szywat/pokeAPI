"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PokemonList from "../components/PokemonList";
import Loading from "../components/Loading";
import PokemonDetails from "../components/PokemonDetails"
import Filter from "../components/Filter"

export default function PokemonPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState({ display: "none" });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      setLoading({ display: "flex" });
      setError(null);

      try {
        const limit = searchParams.get("limit") || "20";
        const search = searchParams.get("search") || "";
        const type = searchParams.get("type") || "";

        if (!search && !type && limit === 20) {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
          if (!response.ok) {
            throw new Error("Could not fetch list");
          };
  
          const data = await response.json();
          const pokemonPromise = data.results.map(async (pokemon) => {
            const pokemonData = await fetch(pokemon.url);
            return pokemonData.json();
          });
  
          let detailedPokemons = await Promise.all(pokemonPromise);
  
          if (search) {
            detailedPokemons = detailedPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
          }
  
          if (type) {
            detailedPokemons = detailedPokemons.filter((pokemon) =>
              pokemon.types.some((t) => t.type.name.toLowerCase() === type.toLowerCase())
            );
          }
  
          // const pokemons = await Promise.all(pokemonPromise);
          setPokemons(detailedPokemons); //changes
        } else {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`);
          if (!response.ok) {
            throw new Error("Could not fetch list");
          };
  
          const data = await response.json();
          const pokemonPromise = data.results.map(async (pokemon) => {
            const pokemonData = await fetch(pokemon.url);
            return pokemonData.json();
          });
  
          let detailedPokemons = await Promise.all(pokemonPromise);
  
          if (search) {
            detailedPokemons = detailedPokemons.filter((pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase())
            );
          }
  
          if (type) {
            detailedPokemons = detailedPokemons.filter((pokemon) =>
              pokemon.types.some((t) => t.type.name.toLowerCase() === type.toLowerCase())
            );
          }
          detailedPokemons = detailedPokemons.slice(0, limit)
          // const pokemons = await Promise.all(pokemonPromise);
          setPokemons(detailedPokemons); //changes
        }

      } catch(error) {
        console.log(error);
        setError(error.message)
      } finally {
        setLoading({ display: "none" });
      }
    }

    fetchPokemonList();
  }, [searchParams]);

  const updateFilters = (filters) => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.type) params.set("type", filters.type);
    if (filters.limit) params.set("limit", filters.limit);

    router.push(`/pokemon?${params.toString()}`);
  };


  if (error) {
    return (
      <div className="error">
        <Loading loadingType={loading} />
        <h1>Error!</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Loading loadingType={loading} />
      <Filter updateFilters={updateFilters} />
      <PokemonList pokemons={pokemons} onSelectPokemon={(name) => PokemonDetails(name)} />
    </div>
  );
}
