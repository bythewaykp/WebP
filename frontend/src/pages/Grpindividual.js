import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Grpindividual() {
    const navigate = useNavigate();
    const location = useLocation();
    let [loader, setLoader] = useState(false);
    let [obj, setObj] = useState({});
    let [simp, setSimp] = useState(true);

    let totsum = (obj) => {
        return Object.values(obj).reduce((a, b) => a + b, 0);
    };

    useEffect(() => {
        setLoader(true);
        axios
            .get("http://localhost:3002/grpindividual", {
                params: {
                    name: location.state.owner,
                    grp: location.state.grpname,
                },
            })
            .then(async (r) => {
                setObj(r.data.db);
                console.log(r.data.s);
                await delay(300);
                setLoader(false);
            });
    }, []);

    return (
        <>
            <Logo />
            <div class="d-flex flex-column align-items-center">
                <div class="searchBarBorder">
                    <p>{location.state.grpname}</p>
                </div>
                <button
                    onClick={() => {
                        setSimp(!simp);
                        if (simp) {
                            setLoader(true);
                            axios
                                .get(
                                    "http://localhost:3002/grpindividualnosimp",
                                    {
                                        params: {
                                            name: location.state.owner,
                                            grp: location.state.grpname,
                                        },
                                    }
                                )
                                .then(async (r) => {
                                    setObj(r.data.db);
                                    console.log(r.data.s);
                                    await delay(300);
                                    setLoader(false);
                                });
                        } else {
                            setLoader(true);
                            axios
                                .get("http://localhost:3002/grpindividual", {
                                    params: {
                                        name: location.state.owner,
                                        grp: location.state.grpname,
                                    },
                                })
                                .then(async (r) => {
                                    setObj(r.data.db);
                                    console.log(r.data.s);
                                    await delay(300);
                                    setLoader(false);
                                });
                        }
                    }}
                >
                    simplify {simp ? "yes" : "no"}
                </button>

                {totsum(obj) >= 0 ? (
                    <div class="group-border">{`You owe ${totsum(obj)}`}</div>
                ) : (
                    <div class="group-border">
                        {`You are owed ${-totsum(obj)}`}
                    </div>
                )}

                <div class="groupsContainer">
                    {!loader ? (
                        <div class=" fc Gcontainer">
                            {Object.keys(obj).map((i) => {
                                return (
                                    <div className="group-border">
                                        <div className="f grpName">{i}</div>
                                        <div className="f grpOwe">
                                            {obj[i] >= 0
                                                ? `You owe ${obj[i]}`
                                                : `You are owed ${-obj[i]}`}
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
            </div>
            <div className="back">
                <Link to="/">
                    <img
                        src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062966/BACKICON_1_bprtda.png"
                        width="50px"
                    />
                </Link>
                <p>Go Back</p>
            </div>
            <div class="fr options">
                <div className="fc">
                    <Link to="/addexpense" state="hi">
                        <img
                            src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062967/TICKICON_1_chfwrw.png"
                            class="option-icons"
                        />
                    </Link>
                    <p>Settle it Up</p>
                </div>
                <div className="fc">
                    <Link to="/editgroup">
                        <img
                            src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062957/EDITICON_v5mwie.png"
                            class="option-icons"
                        />
                    </Link>

                    <p>Edit the Group</p>
                </div>
                <div className="fc">
                    <Link
                        to="/addexpense"
                        state={{
                            owner: location.state.owner,
                            grpname: location.state.grpname,
                        }}
                    >
                        <img
                            src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062967/ADDICON_z0jop2.png"
                            class="option-icons"
                        />
                    </Link>
                    <p>Add new expense</p>
                </div>
            </div>
        </>
    );
}
