import Link from "next/link"

export default function PokemonList({pokemons, onSelectPokemon}) {
    return (
        <section id="pokemon-list">
            {pokemons.map(pokemon => {
                const firstLetter = pokemon.name.substring(0,1).toUpperCase()
                const lastLetters = pokemon.name.substring(1).toLowerCase()
                const pokemonName = firstLetter.concat(lastLetters)
                return (
                    <div key={pokemon.id} className="pokemon">
                        <Link href={`/pokemon/${pokemon.id}`}>
                        <img src={pokemon.sprites.other["official-artwork"].front_default} 
                        alt={pokemon.name} 
                        onClick={() => onSelectPokemon(pokemon.name)} />
                        <p>{pokemonName}</p>
                        </Link>
                    </div>
                )
            })
            }
        </section>
    )
}