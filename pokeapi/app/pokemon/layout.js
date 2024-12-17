export default function PokemonLayout({ children }) {
  return (
    <div>
      <div id="pokemon-finder">
        <h1>Pokemon Finder</h1>
        <div>tutaj będzie pasek do filtrowania</div>
      </div>
      <section>{children}</section>
    </div>
  );
}