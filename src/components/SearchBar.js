import React from "react";
import PokemonDetails from "./Details"
function SearchBar() {

  async function fetchPokemon() {

    try {

        const pokemonName = document.getElementById('pokemonName').value.toLowerCase();

        if (pokemonName.length === 0) {
        throw new Error("Cannot fetch empty data!")
        }
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

        if (!response.ok) {
        throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        // wyświetlenie detali
        document.getElementById("pokemonDetailsContainer").innerHTML = "";
        const container = document.createElement("div");
        ReactDOM.render(<PokemonDetails data={data} />, container);
        document.getElementById("pokemonDetailsContainer").appendChild(container);
    }
    catch(error) {
        alert(error);
    }

  }

  return (
    <div className="search-bar">
      <input type="text" id="pokemonName" placeholder="Catch your Pokemon"/>
      <button onClick={fetchPokemon()}>Catch!</button>
    </div>
  );
}

export default SearchBar;
