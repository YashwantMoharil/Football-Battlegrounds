import React, { useState } from 'react'
import axios from "axios"
import Cookies from "universal-cookie"
import infoIcon from "../Assets/Images/informationIcon.png"

function Login({ setIsAuth }) {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const cookies = new Cookies();
  const logInUser = () => {
    if (userName === "" || passWord === "") return alert("Username or Password is missing");

    axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/login`, { userName, passWord }).then(res => {
      const { token, userId, firstName, lastName, userName } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("userName", userName);
      setIsAuth(true);

    })
  }
  return (
    <>
      <div className='auth-container '>
        < img className='infoIcon1' src={infoIcon} title="The backend is hosted on free servers, so Login/Signup takes ~15s on first use." />
        <label>Login</label>
        <input placeholder='Username' onChange={(event) => { setUserName(event.target.value) }} />
        <input placeholder='Password' onChange={(event) => { setPassWord(event.target.value) }} />
        <button onClick={logInUser}>Login</button>
      </div>
    </>

  )
}

export default Login