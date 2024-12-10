import React from "react";

function PokemonList() {
    const container = document.getElementById('pokemon-list');
    async function fetchPokemonList() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
        const data = await response.json();
        const pokemonPromise = data.results.map(async (pokemon) => {
          const pokemonData = await fetch(pokemon.url)
          return pokemonData.json();
        });
      
        const pokemons = await Promise.all(pokemonPromise);
        
        displayPokemons(pokemons) 
    }

    function displayPokemons(pokemons) {
        pokemons.forEach(pokemon => {
            const pokemonDiv = document.createElement(`div`);
            pokemonDiv.classList.add(`pokemon`);

            const firstLetter = pokemon.name.substring(0,1).toUpperCase()
            const lastLetters = pokemon.name.substring(1).toLowerCase()
            const pokemonName = firstLetter.concat(lastLetters)

            pokemonDiv.innerHTML = `
            <img src="${pokemon.sprites.other["official-artwork"].front_default}" alt="${pokemon.name}" onclick="detailsPokemon('${pokemon.name}')">
            <p>${pokemonName}</p>
          `
          container.appendChild(pokemonDiv)
        })
    }
    fetchPokemonList()

    return (
        <section id="pokemon-list"></section>
    )
}

export default PokemonList