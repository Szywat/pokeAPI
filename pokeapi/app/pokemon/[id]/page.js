"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PokemonDetails from "../../components/PokemonDetails";
import Loading from "../../components/Loading";

export default function PokemonDetailsPage() {
  const { id } = useParams();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState({ display: "none" });

  useEffect(() => {
    async function fetchPokemonDetails() {
      setLoading({ display: "flex" });

      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setSelectedPokemon(data);
      } catch (error) {
        alert("Error fetching Pokémon details");
      } finally {
        setLoading({ display: "none" });
      }
    }

    fetchPokemonDetails();
  }, [id]);

  return (
    <div>
      <Loading loadingType={loading} />
      <PokemonDetails selectedPokemon={selectedPokemon} />
    </div>
  );
}
