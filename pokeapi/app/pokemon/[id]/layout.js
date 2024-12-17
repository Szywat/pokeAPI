export default function PokemonDetailsLayout({ children }) {
    return (
      <div>
        <div id="back-to-list">
          <a href="/pokemon">Back to List</a>
        </div>
        {children}
      </div>
    );
  }
  