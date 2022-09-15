import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [dni, setDni] = useState('')
  const [nombres, setNombres] = useState('')

  const clickLogout = () => {
    localStorage.setItem('loggedQueriesAssistantUser', '')
    navigate('/')
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem(
      'loggedQueriesAssistantUser',
    )
    if (!loggedInUser) {
      console.log('no hay token')
      navigate('/')
      // history.push("/Queries");
      // navigate("/Queries", { replace: true });
    }
  }, [])

  const consultarDataCliente = () => {
    console.log('entré en consultarDataCliente')
  }

  useEffect(() => {
    const dni = document.getElementById('dni')
    const nombres = document.getElementById('nombres')
    dni.addEventListener('blur', (event) => {
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.remove('filled')
      } 
    })
    dni.addEventListener('click', (event) => {
      console.log('entré en click')
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.add('filled')
      } 
    })
    nombres.addEventListener('blur', (event) => {
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.remove('filled')
      } 
    })
    nombres.addEventListener('click', (event) => {
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.add('filled')
      } 
    })

  }, [])
  return (
    <div
      className="homeContainer"
      data-barba="container"
      data-barba-namespace="queries"
    >
      <header>
        <span>HOME</span>
        <nav>
          <ul>
            {}
            <li>
              <button onClick={clickLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>
          <span style={"--delay: .5s"}>HOLA</span>
          <span style={"--delay: .8s"}>CESAR</span>
        </h1>
        <form onSubmit={consultarDataCliente}>
          <section className="sectionInputsFiltrar">
            <div className="input-container">
              <input
                // value={dni}
                type="text"
                id="dni"
                autoComplete='on'
                className="text-input"
                placeholder="Ingrese el DNI"
                name="dni"
                onChange={(e) => {
                  setDni(e.target.value)
                }}
              />
              <label htmlFor="dni" className="label">
                DNI:
              </label>
            </div>
            <div className="input-container">
              <input
                type="text"
                id="nombres"
                autoComplete="off"
                placeholder="Ingrese nombres y apellidos"
                className="text-input"
                name="nombres"
                onChange={(e) => setNombres(e.target.value)}
              />
              <label htmlFor="nombres" className="label">
                NOMBRES - APELLIDOS:
              </label>
            </div>
            <div>
              <input className="inputFiltrar" type="submit" value="Filtrar" />
            </div>
          </section>
          <div></div>
        </form>
      </main>
    </div>
  )
}

export default Home
