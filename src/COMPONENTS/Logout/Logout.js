import './Logout.scss'

import { useNavigate } from 'react-router-dom'

import logout from '../../BASE/img/logout.png'

import { deleteToken } from '../../PAGES/Helpers/auth-helpers'

const Logout = () => { 
  
  const navigate = useNavigate()

  const clickLogout = () => {
    console.log('entré en clickLogout')
    // localStorage.setItem('loggedQueriesAssistantUser', '')
    deleteToken()
    navigate('/')
  }

  return (
    <div className="navigation">
      <button onClick={() => clickLogout()} className="button">
        <img src={logout} alt="logout" />
        <div className="logout">LOGOUT</div>
      </button>
      {/* <a onClick={()=>clickLogout()} className="button" href="#">
              <img src={logout} alt='logout'/>
              <div className="logout">LOGOUT</div>
            </a> */}
    </div>
  )
}

export default Logout
