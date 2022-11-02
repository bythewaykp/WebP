import "../css/Groups.css";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    let [grp, setGrp] = useState([]);

    useEffect(() => {
        // setGrp(["a", "b", "c", "d", "e"]);
        axios.get("http://localhost:3002/grplist").then((r) => {
            // setGrp(["a", "b", "c", "d", "e"]);
            console.log(r.data);
            setGrp(r.data);
        });
    }, []);

    return (
        <div>
            <NavBar />
            <Logo />

            <div class="d-flex flex-column align-items-center">
                <form class="searchBarBorder">
                    <input
                        class="searchBar"
                        type="text"
                        placeholder="Search for a group.."
                    />
                    <i class="searchIcon fa-solid fa-magnifying-glass"></i>
                </form>

                <div class="groupsContainer">
                    <div class=" fc Gcontainer">
                        {[...grp].map((i) => {
                            return (
                                <div class="group-border">
                                    <div className="f grpName">{i}</div>
                                    <div className="f grpOwe">
                                        You are owed Rs 1237.5
                                    </div>
                                </div>
                            );
                        })}

                        {/* </div> */}
                    </div>
                </div>

                <div class="align-items-center">
                    <i class="plus-icon fa-solid fa-circle-plus"></i>
                    <p>Create a new group</p>
                </div>
            </div>
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
