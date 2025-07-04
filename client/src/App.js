import React  from 'react';
import './App.css';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import title from "./Assets/Images/title.png"
import { StreamChat } from "stream-chat"
import {Chat} from "stream-chat-react"
import Cookies from "universal-cookie"
import { useState } from 'react';
import JoinTicTacToe from './Components/JoinTicTacToe';



function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  const client = StreamChat.getInstance(API_KEY);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [isAuth, setIsAuth] = useState(false);

  if(token){
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("userName"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("userName"),
      hashedPassword: cookies.get("hashedPassword")
    }, token).then((user) => {
        setIsAuth(true)
    })
  }

  const logOutUser = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("userName");
    client.disconnectUser();
    setIsAuth(false);

  }

  return (
    <div  >
      
  <div className='title'>
  <img
    src={title}
    alt="Description"
  />
</div>

      { isAuth ?(
        <Chat client = {client}>
          <JoinTicTacToe/>
          <button onClick={logOutUser} setIsAuth = {setIsAuth} className="logout">Log out</button>
        </Chat>
         ) : 
        <>
          <div className='auth-wrapper'>
           <Signup setIsAuth = {setIsAuth}/>
          <div className='auth-divider'> OR </div>
          <Login setIsAuth = {setIsAuth}/>
          </div>
         
        </>
      }
    </div>
  );
}

export default App;
