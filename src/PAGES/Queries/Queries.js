import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  initAxiosInterceptors,
  getToken,
} from '../Helpers/auth-helpers.js'

import TextReveal from '../../COMPONENTS/TextReveal/TextReveal'
import TableFiltrar from '../../COMPONENTS/TableFiltrar/TableFiltrar'
import Boton from '../../COMPONENTS/Boton'

import axios from 'axios'

import Inputs from '../../COMPONENTS/Inputs'

import { motion } from 'framer-motion'

import Loader from '../../COMPONENTS/Loader/Loader'
import Logout from '../../COMPONENTS/Logout/Logout'
import Footer from '../../COMPONENTS/Footer/Footer'

initAxiosInterceptors()

const Home = () => {
  const navigate = useNavigate()

  const [dni, setDni] = useState('')
  const [nombres, setNombres] = useState('')

  const [loading, setLoading] = useState(false)

  const dataLocalStorage = getToken()

  useEffect(() => {
    console.log('entré en useEffect')
    const loggedInUser = window.localStorage.getItem(
      'loggedQueriesAssistantUser',
    )

    if (!loggedInUser) {
      console.log('no hay token')
      navigate('/')
    }
  }, [navigate])

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

      if (tbody > 0) {
        // el tbody tiene hijos
        console.log('el tbody tiene hijos')
      } else {
        // el tbody no tiene hijos
        console.log('el tbody no tiene hijos')
        let row, cell
        for (let i = 0; i < respuesta.data.data.length; i++) {
          console.log('entré en for (let i = 0; i < resultadito.length; i++)')
          row = document.createElement('tr')
          tbody.appendChild(row) //crea la cantidad de elementos tr según props.resultado.length
          console.log(respuesta.data.data[i])
          for (let propiedad in respuesta.data.data[i]) {
            console.log(respuesta.data.data[i][propiedad])
            cell = document.createElement('td')
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
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
    >
      <header>
        <nav>
          <Logout />
        </nav>
      </header>
      <main className="mainQueries">
        {
          dataLocalStorage
          ? <TextReveal nombres={JSON.parse(dataLocalStorage).name} />
          : null
        }
        {/* <TextReveal nombres={JSON.parse(dataLocalStorage).name} /> */}
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
            <label htmlFor="ac-1">Estado actual del cliente</label>
            <article className="ac-small">
              <div className="form">
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    <Inputs
                      id="dni"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDni={setDni}
                      setNombres={setNombres}
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
                      setDni={setDni}
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
                    'Última compra',
                    'Puntos',
                  ]}
                />
                {loading && <Loader />}
              </div>
            </article>
          </div>
          <div>
            <input id="ac-2" name="accordion-1" type="radio" />
            <label htmlFor="ac-2">Validación de migración</label>
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
      <Footer />
    </motion.div>
  )
}

export default Home
