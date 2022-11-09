import "../css/Groups2.css";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default function Friends() {
    let [newmember, setNewmember] = useState("");
    let [items, setItems] = useState([]);
    let [grp, setGrp] = useState({});
    let [loader, setLoader] = useState(false);
    let [search, setSearch] = useState("");
    let [grpname, setGrpname] = useState("");

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

    function Removefromlist(i) {
        setItems((current) =>
            current.filter((element) => {
                return element !== i;
            })
        );
    }

    function Addtolist(i) {
        if (items.includes(i)) {
            {
                alert("Member already exists");
            }
        } else {
            setItems([...items, i]);
        }
        console.log({ name: grpname, membs: items });
        //  console.log(arr);
    }
    return (
        <div>
            <NavBar />
            <Logo />
            <div class="d-flex flex-column align-items-center">
                <div class="d-flex flex-row">
                    <form class="searchBarBorder">
                        <input
                            onChange={(e) => {
                                setGrpname(e.target.value);
                            }}
                            value={grpname}
                            class="searchBar"
                            type="text"
                            name="newgroup"
                            placeholder="New group"
                        />
                        <i class="searchIcon fa-solid fa-magnifying-glass"></i>
                    </form>

                    <form
                        class="searchBarBorder"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setNewmember("");
                        }}
                    >
                        <input
                            onChange={(e) => {
                                setNewmember(e.target.value);
                            }}
                            className="searchBar"
                            value={newmember}
                            type="text"
                            name="newmember"
                            placeholder="New member"
                        />
                        <i class="searchIcon fa-solid fa-magnifying-glass"></i>

                        <button
                            class="addMember-button"
                            type="submit"
                            onClick={(e) => {
                                if (newmember != "") {
                                    Addtolist(newmember);
                                }
                            }}
                        >
                            <img
                                class="addMember-icon"
                                src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062967/ADDICON_z0jop2.png"
                            />
                        </button>
                    </form>
                </div>

                <form class="searchBarBorder">
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        value={search}
                        class="searchBar"
                        type="text"
                        placeholder="Search members"
                    />
                    <i class="searchIcon fa-solid fa-magnifying-glass"></i>
                </form>

                <div class="d-flex flex-row">
                    {Object.values(items).map((i) => {
                        return (
                            <div className="fr">
                                <div class="group-border-list gap">
                                    <div class="group-border-list">
                                        <div className="f grpName">{i}</div>
                                    </div>
                                    <button
                                        id="remove"
                                        className="fc"
                                        onClick={() => Removefromlist(i)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

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
                                            <button
                                                class="group-border2"
                                                onClick={() => Addtolist(i)}
                                            >
                                                <div className="f grpName">
                                                    {i}
                                                </div>
                                                <div className="f grpOwe">
                                                    {grp[i] >= 0
                                                        ? `You owe ${grp[i]}`
                                                        : `You are owed ${-grp[
                                                              i
                                                          ]}`}
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
            </div>
            <button
                className="createGrp fc"
                onClick={axios
                    .post("http://localhost/3002/creategroup", {
                        grp: grpname,
                        membs: items,
                    })
                    .then((r) => {
                        console.log(r.data);
                    })}
            >
                Done
            </button>

            <div class="acc-div">
                <img
                    id="acc-img"
                    src="https://res.cloudinary.com/bhavana2002/image/upload/v1665045915/Mask_group_nzxdut.png"
                />
                <p>Logout</p>
            </div>
        </div>
    );
}
