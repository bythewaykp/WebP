import "./App.css";
import Groups from "./pages/Groups";
import Friends from './pages/Friends'
import Test from "./pages/Test";
import { Routes, Route } from "react-router-dom";


function App() {
    return (

        <Routes>
            <Route path="/friends" element={<Friends />} />
            <Route path='/' element={<Groups/>}/>
            <Route path='/test' element={<Test/>}/>
        </Routes>

    );
}

export default App;
