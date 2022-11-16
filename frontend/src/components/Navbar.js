import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
    // let navigate = useNavigate();
    useEffect(() => {
        let navitems = document.querySelectorAll(".navitem");
        navitems.forEach((i) => {
            i.addEventListener("click", (e) => {
                console.log(i.href);
                console.log(i.classList);
                // e.preventDefault();
                navitems.forEach((b) => {
                    b.classList.remove("active");
                });
                i.classList.add("active");
                console.log(i.classList);
                // console.log(i.parentElement);
                // i.parentElement.classList.add("active");
                // navigate(i.href.split("/").slice(-1)[0]);
                // console.log(i.href.split("/").slice(-1)[0]);
            });
        });
    }, []);
    return (
        <>
            <div class="fr navbar">
                <Link to="/" className="navitem">
                    Groups
                </Link>
                <Link className="navitem" to="/friends">
                    Friends
                </Link>
                <Link className="navitem" to="/test">
                    Test
                </Link>
                <Link className="navitem" to="/dashboard">
                    Dashboard
                </Link>
            </div>
        </>
    );
}
