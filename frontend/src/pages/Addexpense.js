import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default function Addexpense() {
    const navigate = useNavigate();
    const location = useLocation();
    let [memberlist, setMemberlist] = useState([]);
    let [loader, setLoader] = useState(false);
    let [obj, setObj] = useState({});

    let [amount, setAmount] = useState(0);
    let [paidby, setPaidby] = useState("");
    let [among, setAmong] = useState([]);
    let [amongvals, setAmongvals] = useState({});
    let [desc, setDesc] = useState("");

    useEffect(() => {
        // console.log(props);
        setLoader(true);
        axios
            .get("http://localhost:3002/grpmembs", {
                params: {
                    name: location.state.owner,
                    grp: location.state.grpname,
                },
            })
            .then(async (r) => {
                // console.log(r.data);
                setMemberlist(r.data);
                setPaidby(r.data[0]);
                // setAmong(r.data);

                let c = {};
                r.data.map((i) => {
                    c[i] = 0;
                });
                setAmongvals(c);
                setLoader(false)
            });
    }, []);
    console.log(amongvals);
    return (
        <>
			
            <div class="d-flex flex-column align-items-center">
                <div class="searchBarBorder">
                    <p>{location.state.grpname}</p>
                </div>
                <div className="fr">
                    <div class="groupsContainer">
                        {!loader ? (
                            <div class=" fc Gcontainer">
                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        await axios
                                            .post(
                                                "http://localhost:3002/addexpense",
                                                {
                                                    a: paidby,
                                                    membs: amongvals,
                                                    grp: location.state.grpname,
                                                }
                                            )
                                            .then((r) => {
                                                console.log(r.data);
                                            });
                                        // console.log({
                                        //     a: paidby,
                                        //     membs:amongvals,
                                        //     grp: location.state.grpname,
                                        // });
                                    }}
                                >
                                    <span className="fc">
                                        Rs{" "}
                                        <input
                                            type="number"
                                            onChange={(e) => {
                                                setAmount(e.target.value);
                                                if (e.target.value == 0) {
                                                    let c = {};
                                                    setAmong([]);
                                                    memberlist.map((i) => {
                                                        c[i] =0 
                                                    });
                                                    setAmongvals(c);
                                                } else {
                                                    setAmong(memberlist);
                                                    let c = {};
                                                    among.map((i) => {
                                                        c[i] = Number(
                                                            e.target.value /
                                                            among.length
                                                        ).toFixed(2);
                                                    });
                                                    setAmongvals(c);
                                                }
                                            }}
                                            value={amount}
                                            class="fc"
                                            id="amount"
                                            placeholder="0.00"
                                        />
                                    </span>
                                    <input
                                        className="searchBarBorder2"
                                        type="text"
                                        onChange={(e) => {
                                            setDesc(e.target.value);
                                        }}
                                        value={desc}
                                        placeholder="add a desciption"
                                    />
                                    <div id="subbox">
                                        <div class="leftsub">
                                            <div>Paid by</div>
                                            <div>
                                                <select
                                                    value={paidby}
                                                    onChange={(e) => {
                                                        setPaidby(
                                                            e.target.value
                                                        );
                                                    }}
                                                >
                                                    {memberlist.map((i) => {
                                                        return (
                                                            <option value={i}>
                                                                {i}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                            {/* <div class="searchBarBorder3"> */}
                                        </div>
                                        <div class="rightsub">
                                            <div>Split among</div>
                                            <div>
                                                {memberlist.map((i) => {
                                                    return (
                                                        <div className="fr gap">
                                                            {i}
                                                            <input
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setAmongvals(
                                                                        {
                                                                            ...amongvals,
                                                                            [i]: Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            ).toFixed(2),
                                                                        }
                                                                    );
                                                                    if (
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    ) {
                                                                        setAmong(
                                                                            [
                                                                                ...among,
                                                                                i,
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        setAmong(
                                                                            among.filter(
                                                                                (
                                                                                    j
                                                                                ) =>
                                                                                    j !=
                                                                                    i
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                                value={
                                                                    amongvals[
                                                                        i
                                                                    ] ?? 0
                                                                }
                                                                className="searchBarBorder4"
                                                                id="peramount"
                                                                type="number"
                                                                // placeholder={amongvals[i]??0}
                                                            />
                                                            {/* <input type="checkbox" /> */}
                                                            <input
                                                                type="checkbox"
                                                                checked={among.includes(
                                                                    i
                                                                )}
                                                                onClick={() => {
                                                                    if (
                                                                        among.includes(
                                                                            i
                                                                        )
                                                                    ) {
                                                                        setAmong(
                                                                            among.filter(
                                                                                (
                                                                                    j
                                                                                ) =>
                                                                                    j !=
                                                                                    i
                                                                            )
                                                                        );
                                                                        let b =
                                                                            {
                                                                                ...amongvals,
                                                                            };
                                                                        delete b[
                                                                            i
                                                                        ];
                                                                        Object.keys(
                                                                            b
                                                                        ).map(
                                                                            (
                                                                                j
                                                                            ) => {
                                                                                b[
                                                                                    j
                                                                                ] =
                                                                                    (amount /
                                                                                    (
                                                                                        among.length -
                                                                                        1
                                                                                    )).toFixed(
                                                                                        2
                                                                                    );
                                                                            }
                                                                        );
                                                                        setAmongvals(
                                                                            b
                                                                        );
                                                                    } else {
                                                                        setAmong(
                                                                            [
                                                                                ...among,
                                                                                i,
                                                                            ]
                                                                        );
                                                                        // console.log({...amongvals,i:amount/([...among,i]).length});
                                                                        let b =
                                                                            {
                                                                                ...amongvals,
                                                                            };
                                                                        Object.keys(
                                                                            b
                                                                        ).map(
                                                                            (
                                                                                j
                                                                            ) => {
                                                                                b[
                                                                                    j
                                                                                ] =
                                                                                    amount /
                                                                                    (
                                                                                        among.length +
                                                                                        1
                                                                                    ).toFixed(
                                                                                        2
                                                                                    );
                                                                            }
                                                                        );
                                                                        b[i] =
                                                                            (amount /
                                                                            (among.length +
                                                                                1)).toFixed(2);
                                                                        setAmongvals(
                                                                            b
                                                                        );
                                                                    }
                                                                    // setAmong()
                                                                    // let b={...checked}
                                                                    // b[i]=!checked[i]
                                                                    // setChecked(b);
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                <button
                                                    onClick={(e) => {
                                                        let membs = {};
                                                        memberlist.map((i) => {
                                                            membs[i] =
                                                                amount /
                                                                memberlist.length;
                                                        });
                                                        if (amount == 0) {
                                                            setAmong([]);
                                                        } else {
                                                            setAmongvals(membs);
                                                            setAmong([
                                                                ...memberlist,
                                                            ]);
                                                        }
                                                    }}
                                                >
                                                    reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={i=>{navigate(-1)}} className="fc" action="submit">Done</button>
                                </form>
                            </div>
                        ) : (
                            <div className="loaderbox fc">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="back">
                <button class="none" onClick={()=>{
                    navigate(-1)
                }}>
                    <img
                        src="https://res.cloudinary.com/bhavana2002/image/upload/v1665062966/BACKICON_1_bprtda.png"
                        width="50px"
                    />
                </button>
                <p>Go Back</p>
            </div>
        </>
    );
}
