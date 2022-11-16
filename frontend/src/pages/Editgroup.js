import "../css/Groups2.css";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, Link } from "react-router-dom";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
export default function Friends() {
    const location = useLocation();
    let navigate = useNavigate();

    let [newmember, setNewmember] = useState(""); //input name of new member to be added
    let [items, setItems] = useState({}); //object with key name and value owe
    let [loader, setLoader] = useState(false);
    let [search, setSearch] = useState(""); // input search
    let [grpname, setGrpname] = useState(""); //input group name

    let [memberlist, setMemberlist] = useState([]); //full friends list

    useEffect(() => {
        setLoader(true);
        axios
            .get("http://localhost:3002/friendlist", {
                params: { name: location.state.owner },
            })
            .then(async (r) => {
                setGrpname(location.state.grpname);
                setItems(location.state.membs);
                setMemberlist(r.data);
                setLoader(false);
            });
    }, []);

    function Removefromlist(i) {
        let d = { ...items };
        delete d[i];
        setItems(d);

    }

    function Addtolist(i) {
        if (Object.keys(items).includes(i)) {
            {
                alert("Member already exists");
            }
        } else {

            setItems( { ...items,[i]:0 })
        }
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
                    {Object.keys(items).map((i) => {
                        return (
                            <div className="fr">
                                <div class="group-border-list gap">
                                    <div class="group-border-list">
                                        <div className="f grpName">{i}</div>
                                    </div>
                                    <button
                                        id="remove"
                                        className="fc"
                                        onClick={() => {
                                            if (items[i] == 0) {
                                                Removefromlist(i);
                                            } else {
                                                alert(
                                                    "Cannot remove a member from group who owes you an amount"
                                                );
                                            }
                                        }}
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
                            {Object.keys(memberlist)
                                .filter((i) => i != location.state.owner)
                                .filter((i) =>
                                    i
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                )

                                .map((i) => {
                                    return (
                                        <button
                                            class="group-border2"
                                            onClick={() => {
                                                Addtolist(i);
                                            }}
                                        >
                                            <div className="f grpName">{i}</div>
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
                onClick={async () => {
                    await axios
                        .post("http://localhost:3002/editgrp", {
                            grp: location.state.grpname,
                            newgrp:grpname,
                            membs: items,
                            name:location.state.owner
                        })
                        .then((r) => {
                            navigate('/')
                            // console.log(r.data);
                        });
                }}
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
            <div className="back">
                <Link to='/'
                    // class="none"
                    // onClick={() => {
                    //     navigate(-1);
                    // }}
                >
                    <img
                        src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062966/BACKICON_1_bprtda.png"
                        width="50px"
                    />
                </Link>
                <p>Go Back</p>
            </div>
        </div>
    );
}
