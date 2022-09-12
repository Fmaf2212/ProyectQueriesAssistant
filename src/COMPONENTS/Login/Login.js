import './Login.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [authenticated, setauthenticated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    console.log(loggedInUser);
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  const users = [{ usu: "Cesar", contra: "123" }];

  const validarLogin = (e) => {    
    e.preventDefault();
    if (!authenticated) {      
      console.log('hola');
    }
    else{
      const account = users.find((user) => user.usu === usuario);
      if (account && account.contra === contraseña) {
        localStorage.setItem("authenticated", true);
        navigate("/Home");
      }
      else {
        setError(true);
      }
    }
  }

  return (
    <div className="loginContainer">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={validarLogin}>
        <div className="input-group">
          <input
            type="text"
            id="usuario"
            required
            className="input"
            name="usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
          <label htmlFor="usuario" className="input-label">
            Usuario:
          </label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="contraseña"
            required
            className="input"
            name="contraseña"
            onChange={(e) => setContraseña(e.target.value)}
          />
          <label htmlFor="contraseña" className="input-label">
            Contraseña:
          </label>
        </div>
        {
          error
            ? <span className='spanError'>Correo electrónico o contraseña incorrecta. Por favor, vuelve a intentarlo nuevamente.</span>
            : null
        }
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
