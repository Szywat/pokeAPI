export default function FavoritesLayout({ children }) {
    return (
      <div>
        <header id="fav-header">
          <h1>Your Favorites</h1>
        </header>
        <section>{children}</section>
      </div>
    );
  }