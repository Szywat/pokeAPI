import Link from "next/link";
import "@/app/globals.css";

export default function Navigation() {
  return (
    <nav id="navStyles">
      <ul id="listStyles">
        <li id="itemStyles">
          <Link href="/">Home</Link>
        </li>
        <li id="itemStyles">
          <Link href="/pokemon">Pokémon</Link>
        </li>
        <li id="itemStyles">
          <Link href="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

