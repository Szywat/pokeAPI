const container = document.getElementById('pokemon-list');
const searchButton = document.getElementById('searchButton');
const classPokemon = document.getElementsByClassName('pokemon');
const searchBar = document.getElementById('pokemonName');

//#region SZUKANIE POKEMONA
async function fetchPokemon(){
  
  try {
    showLoading();

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
    await detailsPokemon(pokemonName)
  }
  catch(error) {
    alert(error);
  }
  finally {
    hideLoading();
  }
}
//#endregion

//#region WYŚWIETLANIE LISTY
async function pokemonList() {
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

pokemonList()
//#endregion

//#region DETALE
async function detailsPokemon(pokemonName) {
  
  try {
    showLoading();

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    if (!response.ok) {
      throw new Error("Could not fetch details")
    };

    const data = await response.json();

    const pokemonSprite = data.sprites.other["official-artwork"].front_default;
    const imgElement = document.getElementById("pokemonSprite")
    const onePokemonElement = document.getElementById("onePokemon")

    imgElement.src = pokemonSprite;
    onePokemonElement.style.display = "block";


    const firstLetterName = data.name.substring(0,1).toUpperCase();
    const lastLettersName = data.name.substring(1).toLowerCase();
    const nameOfPokemon = firstLetterName.concat(lastLettersName);
    
    const firstLetterType = data.types["0"].type.name.substring(0,1).toUpperCase();
    const lastLettersType = data.types["0"].type.name.substring(1).toLowerCase();
    const pokemonType = firstLetterType.concat(lastLettersType);

    const divElement = document.getElementById("detale");

    const pokemonDetails = document.createElement('div');
    divElement.innerHTML = ``;
    pokemonDetails.className = `details`;

    const pokemonIdAndName = document.createElement('div');
    pokemonIdAndName.className = `name-id`;


    pokemonIdAndName.innerHTML = `
    <div>${nameOfPokemon}</div>
    <div>Id: ${data.id}</div>
    <div>Type: ${pokemonType}</div>
    `;
    divElement.appendChild(pokemonIdAndName)

    const blackBar = document.createElement('div');
    blackBar.className = `black-bar`;

    blackBar.innerHTML = `
    <div>Height: ${data.height}</div>
    <div>Weight: ${data.weight}</div>
    `;

    divElement.appendChild(blackBar);

    pokemonDetails.innerHTML = `
    <section>Stats</section>
    <div>${data.stats["0"].stat.name}: ${data.stats["0"].base_stat} </div>
    <div>${data.stats["1"].stat.name}: ${data.stats["1"].base_stat}</div>
    <div>${data.stats["2"].stat.name}: ${data.stats["2"].base_stat}</div>
    <div>${data.stats["3"].stat.name}: ${data.stats["3"].base_stat}</div>
    <div>${data.stats["4"].stat.name}: ${data.stats["4"].base_stat}</div>
    <div>${data.stats["5"].stat.name}: ${data.stats["5"].base_stat}</div>
    `;

    divElement.appendChild(pokemonDetails)


  } 
  catch(error) {
    alert(error);
  } 
  finally {
    hideLoading()
  }

  
}
//#endregion

//#region FUNKCJE DODATKOWE
searchButton.addEventListener('click', () => {
  container.style.display = 'none'
})

function showLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.display = 'flex'; // Pokaż ekran ładowania  
}

function hideLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  // setTimeout(() => {
    loadingScreen.style.display = 'none'; // Ukryj ekran ładowania
    // }, 1000)
  
}
//#endregion
