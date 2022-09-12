import './Home.css'

import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const clickLogout = ()=> {
    localStorage.setItem("authenticated", false);
    navigate("/Login");
  }

  return (
    <div className='homeContainer'>
      <header>
        <span>HOME</span>
        <nav>
          <ul>
            <li><button onClick={clickLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>HOME</h1>
      </main>
    </div>
  )
}

export default Home