import React from "react";
import SearchBar from "./SearchBar";
import PokemonList from "./List";

function App() {
    return (
        <div>
            <div id="pokemon-finder">
                <h1>Pokemon Finder</h1>
            </div>
            <SearchBar />
            <PokemonList />
        </div>

    );
};

export default App;