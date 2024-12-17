import Link from "next/link"
import { useState } from "react";

export default function SearchBar({ search }) {
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="search-bar">
            <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} id="pokemonName" placeholder="Catch your Pokemon"/>
            <Link href={`/pokemon/${inputValue}`}>
            <button onClick={() => search(inputValue)} id="searchButton">Catch!</button>
            </Link>
        </div>
    )
}