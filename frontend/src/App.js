import "./App.css";
import Home from "./pages/Groups";
import Contact from './pages/Contact'
import LearnMore from './pages/LearnMore'
import Resource from './pages/Resources'
import Members from "./pages/Members";
import Test from "./pages/Test";
import { Routes, Route } from "react-router-dom";


function App() {
    return (

        <Routes>
            <Route path="members" element={<Members />} />
            <Route path="resources" element={<Resource />} />
            <Route path="learnmore" element={<LearnMore />} />
            <Route path="contact" element={<Contact />} />
            <Route path='/' element={<Home/>}/>
            <Route path='/test' element={<Test/>}/>
        </Routes>

    );
}

export default App;
