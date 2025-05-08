import { handleSignOut } from "src/services/cognito/logout/logout";
import { Button } from "./home.styles"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from 'react';

export function useOnInit(callback: Function) {
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    
    callback();
    hasInitialized.current = true;
  }, []);
}


export const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await handleSignOut();
    localStorage.removeItem('user');
    navigate("/");
  };

  const getListUsers = async (token: string) => {
    const response = await fetch('https://86sdct8qxa.execute-api.us-east-1.amazonaws.com/users', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    console.log(data);
  }



  useOnInit(() => {
    const user = localStorage.getItem("user");
    if(!user) {
      handleLogout();
      return;
    }
    const dataUser = JSON.parse(user);
    
    if(!dataUser.isLogged || !dataUser.token){
      handleLogout();
      return;
    }

    getListUsers(dataUser.token);
    
    // if(isLogged) {
    //   navigate("/");
    // }
  }); // Carga solo 1 vez y es al principio de la página

  

  return (
    <div>
      <h1>Bienvenido, nombre</h1>
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}