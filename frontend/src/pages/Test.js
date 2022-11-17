import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Test() {


    return (
        <>
            <button onClick={async ()=>{
                axios
                .post('http://localhost/3002/new',{a:"yes"})

            }}> click me</button>
        </>
    );
}
