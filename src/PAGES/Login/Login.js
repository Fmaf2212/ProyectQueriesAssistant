import './Login.css'
import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

import { getToken, setToken } from '../Helpers/auth-helpers.js'

import axios from 'axios'
import Loader from '../../COMPONENTS/Loader/Loader';

import { motion } from 'framer-motion'


const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  // const [authenticated, setauthenticated] = useState('');
  // const [token, setToken] = useState('');
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  // var URLactual = window.location;
  // console.log(URLactual);
  useEffect(() => {
    if (getToken()) {
      // Si me he logueado y tengo token, que me redireccione a la página Queries
      navigate("/Queries");
    }
}, [navigate]);

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
    setLoading(true);
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
      if(respuesta.data.result === 1){
        setUsuario("");
        setContraseña("");
        // window.localStorage.setItem("loggedQueriesAssistantUser", respuesta.data.data.accesToken);
        setToken(JSON.stringify(respuesta.data.data));
        navigate("/Queries");
      }else{
        setError(true);
        setUsuario("");
        setContraseña("");
      }
    }catch(error){
      console.log(error)
    }
    setLoading(false);
  }

  return (
    <motion.div 
      className="loginContainer" 
      // data-barba="container" 
      // data-barba-namespace="login"
      // initial={{ width: 0 }}
      // animate={{ width: "100%" }}
      // exit={{ x: window.innerWidth, transition: { duration: 0.5} }}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
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
        {loading && <Loader />}
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
    </motion.div>
  )
}

export default Login
