import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Test() {
    let [grp, setGrp] = useState(["a", 'abz',"b", "c", "d", "e"]);
    let [search, setSearch] = useState("");

    return (
        <>
            {/* Hi */}
            {grp.filter(i=>i.toLowerCase().includes(search.toLowerCase())).map(k=><li>{k}</li>)}
            <form class="searchBarBorder">
                <input
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    value={search}
                    class="searchBar"
                    type="text"
                    placeholder="Search for a group.."
                />
                <i class="searchIcon fa-solid fa-magnifying-glass"></i>
            </form>
        </>
    );
}
