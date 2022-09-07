import './Login.css'

import { } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState('');
  // validarLogin() {
  //   if(usuario === "Cesar" && contraseña === "123"){

  //   }
  // }

  return (
    <div className="loginContainer">
      <h1>Iniciar Sesión</h1>
      <form>
        <div className="input-group">
          <input
            type="text"
            id="usuario"
            required
            className="input"
            name="usuario"
          />
          <label htmlFor="usuario" className="input-label">
            Contraseña:
          </label>
        </div>
        <div className="input-group">
          <input
            type="password"
            id="contraseña"
            required
            className="input"
            name="contraseña"
          />
          <label htmlFor="contraseña" className="input-label">
            Contraseña:
          </label>
        </div>

        <div className='sendLogin'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <input onClick={()=> validarLogin()} className="inputLogin" type="submit" value="Iniciar Sesión" />
        </div>
      </form>
    </div>
  )
}

export default Login
