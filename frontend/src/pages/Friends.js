import "../css/Groups.css";
import NavBar from "../components/Navbar";
import Logout from "../components/Logout";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Friends() {
    let [grp, setGrp] = useState({});
    let [loader, setLoader] = useState(false);
    let [search, setSearch] = useState("");

    useEffect(() => {
        setLoader(true);
        axios
            .get("http://localhost:3002/friendlist", {
                params: { name: "kp" },
            })
            .then(async (r) => {
                setGrp(r.data);
                await delay(400);
                setLoader(false);
            });
    }, []);

    console.log(grp);

    return (
        <div>
            <NavBar />
            <Logo />
            <div class="d-flex flex-column align-items-center">
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
                <div className="groupsContainer">
                    {!loader ? (
                        <div class="fc Gcontainer">
                            {Object.keys(grp)
                                .filter((i) =>
                                    i
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )
                                .map((i) => {
                                    return (
                                        <div class="group-border">
                                            <div className="f grpName">{i}</div>
                                            <div className="f grpOwe">
                                                {grp[i] >= 0
                                                    ? `You owe ${grp[i]}`
                                                    : `You are owed ${-grp[i]}`}
                                            </div>
                                        </div>
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
                    <p>Add new contact</p>
                </div>
            </div>

            <Logout/>
        </div>
    );
}
