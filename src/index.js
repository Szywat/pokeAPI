
//#region List
function PokemonList({pokemons, onSelectPokemon}) {
    return (
        <section id="pokemon-list">
            {pokemons.map(pokemon => {
                const firstLetter = pokemon.name.substring(0,1).toUpperCase()
                const lastLetters = pokemon.name.substring(1).toLowerCase()
                const pokemonName = firstLetter.concat(lastLetters)
                return (
                    <div key={pokemonName} className="pokemon">
                        <img src={pokemon.sprites.other["official-artwork"].front_default} 
                        alt={pokemon.name} 
                        onClick={() => onSelectPokemon(pokemon.name)} />
                        <p>{pokemonName}</p>
                    </div>
                )
            })
            }
        </section>
    )
}

//#endregion

//#region Details
function PokemonDetails({ selectedPokemon }) {
    if (!selectedPokemon) {
        return null
        }  
    const firstLetterName = selectedPokemon.name.substring(0,1).toUpperCase();
    const lastLettersName = selectedPokemon.name.substring(1).toLowerCase();
    const nameOfPokemon = firstLetterName.concat(   lastLettersName);

    const firstLetterType = selectedPokemon.types["0"].type.name.substring(0,1).toUpperCase();
    const lastLettersType = selectedPokemon.types["0"].type.name.substring(1).toLowerCase();
    const pokemonType = firstLetterType.concat(lastLettersType);

    return (
        <div id="onePokemon">
            <img src ={selectedPokemon.sprites.other["official-artwork"].front_default} alt="Pokemon Sprite" id="pokemonSprite"/>
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
//#endregion

//#region Loading

function Loading({ loadingType }) {
    return (
        <div id="loading-screen" style={loadingType}>
            <p>Loading...</p>
        </div>
    )
}

//#endregion

//#region App
function App() {

    let selectedPokemon = null;
    let pokemonList = [];
    let loading = null;

    async function fetchPokemonList() {
        try {
            showLoading();
            renderApp();

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
            if (!response.ok) {
                throw new Error("Could not fetch list");
            };
            const data = await response.json();
            const pokemonPromise = data.results.map(async (pokemon) => {
                const pokemonData = await fetch(pokemon.url)
                return pokemonData.json();
            })

            const pokemons = await Promise.all(pokemonPromise);


            pokemonList = pokemons;
            
            renderApp();
        } catch(error) {
            alert(error);
            pokemonList = [];
        } finally {
            hideLoading();
            renderApp();
        }

    }
    
    async function fetchPokemon() {
        try {
            showLoading();
            renderApp();
            const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
            if (pokemonName.length === 0) {
                renderApp();
                throw new Error("Cannot fetch empty data");
            }

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();
            selectedPokemon = data
            renderApp()
        } catch(error) {
            alert(error);
            selectedPokemon = null;
        } finally {
            hideLoading();
            renderApp();
        }
    }

    async function fetchPokemonDetails(pokemonName) {
        try {
            showLoading();
            renderApp();
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            
            if (!response.ok) {
                throw new Error("Could not fetch details")
            };

            const data = await response.json();
            selectedPokemon = data;
            renderApp();
        } catch(error) {
            alert(error);
            selectedPokemon = null;
            renderApp();
        } finally {
            hideLoading();
            renderApp();
        }
    }

    function showLoading() {
        loading = {display: 'flex'}
    }

    function hideLoading() {
        loading = {display: 'none'}
    }


    function renderApp() {
        ReactDOM.render(
            <div>
                <div id="pokemon-finder">
                    <h1>Pokemon Finder</h1>
                </div>
                <div className="search-bar">
                    <input type="text" id="pokemonName" placeholder="Catch your Pokemon"/>
                    <button onClick={fetchPokemon} id="searchButton">Catch!</button>
                </div>
                <Loading loadingType={loading}/>
                <PokemonDetails selectedPokemon={selectedPokemon} />
                {!selectedPokemon && (
                    <PokemonList pokemons={pokemonList} onSelectPokemon={fetchPokemonDetails} />
                )}
            </div>,
            document.getElementById('root')
        );
    };
    fetchPokemonList();

    return null
}
//#endregion

App();