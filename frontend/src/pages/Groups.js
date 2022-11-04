import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Home() {
    const navigate = useNavigate();
    let [grp, setGrp] = useState({});
    let [loader, setLoader] = useState(false);
    let [search, setSearch] = useState("");

    useEffect(() => {
        setLoader(true);
        axios
            .get("http://localhost:3002/grplist", { params: { name: "kp" } })
            .then(async (r) => {
                setGrp(r.data);
                // await delay(300);
                setLoader(false);
            });
    }, []);


    return (
        <div>
            <NavBar />
            <Logo />

            <div class="fc">
                <form class="searchBarBorder fc">
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        class="searchBar "
                        type="text"
                        placeholder="Search for a group.."
                    />
                    <i class="searchIcon fa-solid fa-magnifying-glass"></i>
                </form>

                <div class="groupsContainer">
                    {!loader ? (
                        <div class=" fc Gcontainer">
                            {Object.keys(grp)
                                .filter((i) =>
                                    i
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((i) => {
                                    return (
                                        <button
                                            class="group-border"
                                            onClick={(e) => {
                                                navigate("/grpindividual", {
                                                    state: { grpname: i ,owner:"kp"},
                                                });
                                            }}
                                        >
                                            <div className="f grpName">{i}</div>
                                            <div className="f grpOwe">
                                                {grp[i] >= 0
                                                    ? `You owe ${grp[i]}`
                                                    : `You are owed ${-grp[i]}`}
                                            </div>
                                        </button>
                                    );
                                })}
                        </div>
                    ) : (
                        <div className="loaderbox fc">
                            <Loader />
                        </div>
                    )}
                </div>

                <div class="align-items-center">
                    <i class="plus-icon fa-solid fa-circle-plus"></i>
                    <p>Create a new group</p>
                </div>
            </div>
            <Logout />
        </div>
    );
}
