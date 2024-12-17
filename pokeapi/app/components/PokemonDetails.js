import { useState } from "react";

export default function PokemonDetails({ selectedPokemon }) {
    if (!selectedPokemon) {
        return null
        }  
    const firstLetterName = selectedPokemon.name.substring(0,1).toUpperCase();
    const lastLettersName = selectedPokemon.name.substring(1).toLowerCase();
    const nameOfPokemon = firstLetterName.concat(lastLettersName);

    const firstLetterType = selectedPokemon.types["0"].type.name.substring(0,1).toUpperCase();
    const lastLettersType = selectedPokemon.types["0"].type.name.substring(1).toLowerCase();
    const pokemonType = firstLetterType.concat(lastLettersType);

    const [isFavorite, setIsFavorite] = useState(false);

    function addToFavorites() {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        const alreadyExists = favorites.some((fav) => fav.id === selectedPokemon.id);
        if (!alreadyExists) {
            favorites.push({
              id: selectedPokemon.id,
              name: selectedPokemon.name,
              image: selectedPokemon.sprites.other["official-artwork"].front_default,
            });
            localStorage.setItem("favorites", JSON.stringify(favorites));
            setIsFavorite(true)
        }
    }

    return (
        <div id="onePokemon">
            <img src ={selectedPokemon.sprites.other["official-artwork"].front_default} alt="Pokemon Sprite" id="pokemonSprite"/>
            <button id="favButton"onClick={addToFavorites} disabled={isFavorite}>
                {isFavorite ? "Dodano!" : "Dodaj do ulubionych"}
            </button>
            <div id="detale">
                <div className="name-id">
                    <div>{nameOfPokemon}</div>
                    <div>Id: {selectedPokemon.id}</div>
                    <div>Type: {pokemonType}</div>
                </div>
                <div className="black-bar">
                    <div>Height: {selectedPokemon.height}</div>
                    <div>Weight: {selectedPokemon.weight}</div>
                </div>
                <div className="details">
                    <section>Stats</section>
                    {selectedPokemon.stats.map((stat, index) => (

                        <div key={index}>
                            {stat.stat.name}: {stat.base_stat}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}