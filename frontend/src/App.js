import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Groups from "./pages/Groups";
import Creategroup from "./pages/Creategroup"
import Grpindividual from "./pages/Grpindividual";
import Friends from './pages/Friends'
import Addexpense from "./pages/Addexpense";
import Editgroup from "./pages/Editgroup";
import Test from "./pages/Test";

import { Routes, Route } from "react-router-dom";


function App() {
    
    return (

        <Routes>
            <Route path="/friends" element={<Friends />} />
            <Route path='/' element={<Groups/>}/>
            <Route path='/test' element={<Test/>}/>
            <Route path='/grpindividual' element={<Grpindividual/>}/>
            <Route path='/addexpense' element={<Addexpense/>}/>
            <Route path='/creategroup' element={<Creategroup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/editgrp' element={<Editgroup/>}/>
        </Routes>

    );
}

export default App;
