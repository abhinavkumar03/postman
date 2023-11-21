import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../assets/chat.png';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRoutes';

 
function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    useEffect(() => {
        if(localStorage.getItem('chat-app-user') ){
          navigate("/");
        }  
      },[]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const { username, email, password } = values;
            const { data } = await axios.post(registerRoute, {
                username, 
                email,
                password,
            });
            if(data.status === false){
                alert(data.msg);
            }
            if(data.status === true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
      
        if( username.length < 3){
            alert("username must be greater than 3 character");
            return false;
        }
        else if( password.length < 8 ){
            alert("password must be atleast than 8 character");
            return false;
        }
        else if (password !== confirmPassword) {
          alert("confirm password didn't match");
          return false;
        }
        else if( email === ""){
            alert("email need to be filled");
            return false;
        }
        return true;
      };
      

    const handleChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    };
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>POST-MAN</h1>
            </div>
            <input type="text" 
                placeholder='Username' 
                name='username' 
                value={values.username}
                onChange={handleChange} 
            />
            <input type="email" 
                placeholder='Email' 
                name='email' 
                value={values.email}
                onChange={handleChange} 
            />
            <input type="password" 
                placeholder='Password' 
                name='password' 
                value={values.password}
                onChange={handleChange} 
            />
            <input type="password" 
                placeholder='Confirm password' 
                name='confirmPassword' 
                value={values.confirmPassword}
                onChange={handleChange} 
            />
            <button type="submit" >Create User</button>
            <span>
                Already have an account ? 
                <Link to="/login"> Login</Link>
            </span>
        </form>
    </FormContainer>
  </>
  );
};


const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img{
        height: 5rem;
    }
    h1{
        color: white;
    }
}
form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        border-radius: 0.6rem;
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
    }
    button{
        background-color: #997af0;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        ursor: pointer;
        border-radis: 0%.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transistion: 0.5s ease-in-out;
        &:hover{
            background-color: #4e0eff
        }
    }
    span{
        color: white;
        text-transform: uppercase;
        a{
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
}

`;

export default Register
