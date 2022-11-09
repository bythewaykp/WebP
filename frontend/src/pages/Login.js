import "../css/Register.css";
import NavBar from "../components/Navbar";
import Logo from "../components/Logo";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    

export default function Home() {
    let [grp, setGrp] = useState({});
    let [loader, setLoader] = useState(false);
    let [search, setSearch] = useState("");
    let [items,setItems] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
  


    useEffect(() => {
        
    }, []);

      // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') { 
      setError(true);
      
    } else {
      navigate('/');
    //   setSubmitted(true);
    //   setError(false);
    }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {name} successfully registered!!</h1>
      </div>
    );
  };
  
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

    console.log(grp);

    return (
        <div>
            {/* <NavBar /> */}
            <Logo />
            {/* Login */}
            <div className="form" class="d-flex flex-column align-items-center">
                <div>
                    <h1 class="heading">User Login</h1>
                </div>
        
            {/* Calling to the methods */}
                <div className="messages">
                    {errorMessage()}
                </div>
        
                <div class="groupsContainer d-flex flex-column align-items-center">
                  <form>
                      {/* Labels and inputs for form data */}
                      <label className="label">Name</label>
                      <input onChange={handleName} className="input"
                      value={name} type="text" />
              
                      <label className="label">Email</label>
                      <input onChange={handleEmail} className="input"
                      value={email} type="email" />
              
                      <label className="label">Password</label>
                      <input onChange={handlePassword} className="input"
                      value={password} type="password" />
              
                      <div class="d-flex flex-row">
                        <button onClick={handleSubmit} className="button-border-login" type="submit">
                        Submit
                        </button>
                        <button className="button-border-login" onClick={()=>navigate('/register')}>Register</button>
                      </div>
                  </form>
                </div>
            </div>

            <div class="acc-div">
               <img
                    id="acc-img"
                    src="https://res.cloudinary.com/bhavana2002/image/upload/v1665045915/Mask_group_nzxdut.png"   />
                <p>Logout</p>
            </div>
        </div>
    );
}