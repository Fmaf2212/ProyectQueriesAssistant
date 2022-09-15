import './Login.css'
import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

import axios from 'axios'

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  // const [authenticated, setauthenticated] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState(false);

  // var URLactual = window.location;
  // console.log(URLactual);
  useEffect(() => {

    const loggedInUser = window.localStorage.getItem("loggedQueriesAssistantUser");
    console.log(loggedInUser);
    if (loggedInUser) {
      console.log('si hay token')
      navigate("/Queries");
      // history.push("/Queries");
      // navigate("/Queries", { replace: true });
    }
  
}, []);

  // siEstoyEnLogin();
  
  // useEffect(() => {
  //     const loggedInUser = window.localStorage.getItem("loggedQueriesAssistantUser");
  //     console.log(loggedInUser);
  //     if (loggedInUser) {
  //       console.log('ya hay token, no puedes setear')
  //     }
  //     else{
  //       setToken('loggedInUser');  
  //     }
  // }, []);

  const validarLogin = async(e) => {   
    e.preventDefault();

    let url = "https://api.santanaturaws.com/api/Acces/Login";
    try{
      const respuesta = await axios({
        method: 'post',
        url: url,
        data: {
          usuario: usuario,
          password: contraseña
        }
      });
      console.log(respuesta)
      if(respuesta.data.message !== "Acceso denegado"){
        setUsuario("");
        setContraseña("");
        window.localStorage.setItem("loggedQueriesAssistantUser", respuesta.data.data);
        navigate("/Queries");
      }else{
        setError(true);
        setUsuario("");
        setContraseña("");
      }
    }catch(error){
      console.log(error)
    }

    // if (!authenticated) {    
      // const account = users.find((user) => user.usu === usuario);
      // if (account && account.contra === contraseña) {
      //   localStorage.setItem("authenticated", true);
      //   navigate("/Queries");
      // }
      // else {
      //   setError(true);
      // }
    // }
    // else{  
    //   console.log('hola');
    // }
  }

  return (
    <div className="loginContainer" data-barba="container" data-barba-namespace="login">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={validarLogin}>
        <div className="input-group">
          <input
            value={usuario}
            type="text"
            id="usuario"
            required
            autoComplete='off'
            className="input"
            name="usuario"
            onChange={(e) => {setUsuario(e.target.value); setError(false)}}
          />
          <label htmlFor="usuario" className="input-label">
            Usuario:
          </label>
        </div>
        <div className="input-group">
          <input
            value={contraseña}
            type="password"
            id="contraseña"
            required
            className="input"
            name="contraseña"
            onChange={(e) => {setContraseña(e.target.value); setError(false)}}
          />
          <label htmlFor="contraseña" className="input-label">
            Contraseña:
          </label>
        </div>
        <div className="input-spanError">
          <span className={`spanError ${error ? 'active' : null}`}>Usuario o contraseña incorrecta. Por favor, vuelve a intentarlo nuevamente.</span>
        </div>
        <div className='sendLogin'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <input className="inputLogin" type="submit" value="Iniciar Sesión" />
        </div>
      </form>
    </div>
  )
}

export default Login
