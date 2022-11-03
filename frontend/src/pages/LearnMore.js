import "../css/Groups.css";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Friends() {

    let [grp, setGrp] = useState({});

    useEffect(() => {
  
        axios
            .get("http://localhost:3002/grplist", { params: { name: "b" } })
            .then((r) => {
                setGrp(r.data)

            });
    }, []);

    // let a = Object.keys(grp)
    console.log(grp);

    return (
        <div>
            <NavBar />
            <Logo />

            
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
