import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  deleteToken,
  initAxiosInterceptors,
  getToken,
} from '../Helpers/auth-helpers.js'

import TextReveal from '../../COMPONENTS/TextReveal/TextReveal'
import TableFiltrar from '../../COMPONENTS/TableFiltrar/TableFiltrar'
import Boton from '../../COMPONENTS/Boton'

import axios from 'axios'

import logout from '../../BASE/img/logout.png'
import Inputs from '../../COMPONENTS/Inputs'

import { motion } from 'framer-motion'

import Loader from '../../COMPONENTS/Loader/Loader'

initAxiosInterceptors()

const Home = () => {
  const navigate = useNavigate()
  // const [result, setResult] = useState();
  // const token = "	32c5250c-51e0-439b-8a9c-8e869666495d";

  const [dni, setDni] = useState('')
  const [nombres, setNombres] = useState('')

  const [loading, setLoading] = useState(false)

  const dataLocalStorage = getToken()

  // const [resultadito, setResultadito] = useState([]);

  const clickLogout = () => {
    console.log('entré en clickLogout')
    // localStorage.setItem('loggedQueriesAssistantUser', '')
    deleteToken()
    navigate('/')
  }

  useEffect(() => {
    console.log('entré en useEffect')
    const loggedInUser = window.localStorage.getItem(
      'loggedQueriesAssistantUser',
    )
    // console.log(Object.values(loggedInUser));
    // console.log(JSON.parse(loggedInUser).accesToken);
    if (!loggedInUser) {
      console.log('no hay token')
      navigate('/')
    }
  }, [navigate])

  // useEffect(()=>{
  //   fetch('https://api.santanaturaws.com/api/Room/ListClientState', {
  //     method: "POST",
  //     headers: {"Authorization": `Bearer ${token}`}
  //   })
  //   .then(res => res.json())
  //   .then(json => setResult(json));
  // },[]);
  const consultarDataCliente = async (e) => {
    e.preventDefault()
    // setResultadito([])
    if (document.getElementById('tbody')) {
      document
        .getElementById('tabla')
        .removeChild(document.getElementById('tbody'))
    } else {
      console.log('no existe tbody')
    }
    let tabla = document.getElementById('tabla')
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'tbody')
    tabla.appendChild(tbody)
    // let tablaTbody = document.querySelector('#tabla > tbody')
    let tablaTbody = document.getElementById('tbody')
    console.log(tablaTbody.childElementCount)
    if (tablaTbody.childElementCount > 0) {
      console.log(
        'entré en document.getElementById("tbody").childElementCount > 0',
      )
      tablaTbody.parentNode.removeChild(tablaTbody)
    }
    console.log('entré en consultarDataCliente')
    console.log(`ingresé al usuario ${nombres} con dni ${dni}`)
    setLoading(true)
    let url = 'https://api.santanaturaws.com/api/Room/ListClientState'
    try {
      const respuesta = await axios({
        method: 'post',
        url: url,
        headers: {
          Authorization: `Bearer ${JSON.parse(dataLocalStorage).accesToken}`,
        },
        data: {
          nombres: nombres,
          documento: dni,
        },
      })
      // --------------------------
      // setResultadito(respuesta.data.data)
      // let tabla = document.getElementById('tabla')
      // let tbody = document.createElement('tbody')
      // // let tablaTbody = document.querySelector('#tabla > tbody')
      // console.log(tbody.childElementCount)
      // tabla.appendChild(tbody)

      if (tbody > 0) {
        // el tbody tiene hijos
        console.log('el tbody tiene hijos')

        // tablaTbody.parentNode.removeChild(tbody);
      } else {
        // el tbody no tiene hijos
        console.log('el tbody no tiene hijos')
        // tabla.appendChild(tbody)
        let row, cell
        for (let i = 0; i < respuesta.data.data.length; i++) {
          console.log('entré en for (let i = 0; i < resultadito.length; i++)')
          row = document.createElement('tr')
          tbody.appendChild(row) //crea la cantidad de elementos tr según props.resultado.length
          console.log(respuesta.data.data[i])
          // for (let j = 0; j < props.resultado[i].length; j++) {
          //   cell = document.createElement("td");
          //   row.appendChild(cell);
          // }
          for (let propiedad in respuesta.data.data[i]) {
            console.log(respuesta.data.data[i][propiedad])
            cell = document.createElement('td')
            // cell.textContent(`${props.resultado[i][propiedad]}`);
            cell.textContent = `${respuesta.data.data[i][propiedad]}`
            row.appendChild(cell)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  // const consultarValidacionMigracion = () => {
  //   console.log('entré en consultarValidacionMigracion')
  // }

  return (
    <motion.div
      className="homeContainer"
      // data-barba="container"
      // data-barba-namespace="queries"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header>
        <nav>
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
        </nav>
      </header>
      <main className="mainQueries">
        <TextReveal nombres={JSON.parse(dataLocalStorage).name} />
        {/* <>
        {JSON.stringify(result)}
        </> */}
        <section className="ac-container">
          <div>
            <input
              id="ac-1"
              name="accordion-1"
              type="radio"
              defaultChecked=""
            />
            <label htmlFor="ac-1">About us</label>
            <article className="ac-small">
              <div className="form">
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    <Inputs
                      id="dni"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDni={setDni}
                      //  setResultadito={setResultadito}
                    />
                    <label htmlFor="dni" className="label">
                      DNI:
                    </label>
                  </div>

                  <div className="input-container">
                    <Inputs
                      id="nombres"
                      placeholder="Ingrese nombres y apellidos"
                      type="text"
                      setNombres={setNombres}
                    />
                    <label htmlFor="nombres" className="label">
                      NOMBRES - APELLIDOS:
                    </label>
                  </div>
                  <div className="btn">
                    <Boton id="Filtrar" funcion={consultarDataCliente} />
                  </div>
                </section>
                <TableFiltrar
                  data={[
                    'Estado',
                    'Id Cliente',
                    'Última compra > 20ptos',
                    'Puntos',
                  ]}
                />
                {loading && <Loader />}
              </div>
            </article>
          </div>
          <div>
            <input id="ac-2" name="accordion-1" type="radio" />
            <label htmlFor="ac-2">How we work</label>
            <article className="ac-medium">
              <div className="form">
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    <Inputs
                      id="dniValidarMigracion"
                      placeholder="Ingrese el DNI"
                      type="text"
                    />
                    <label htmlFor="dniValidarMigracion" className="label">
                      DNI:
                    </label>
                  </div>

                  <div className="btn">
                    <Boton id="Validar" />
                  </div>
                </section>
                {/* <TableFiltrar 
            data={["Id Cliente","Tipo Socio","Última compra"]} 
            resultado={''}
          /> */}
              </div>
            </article>
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default Home
