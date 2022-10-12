import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { initAxiosInterceptors, getToken } from '../Helpers/auth-helpers.js'

import TextReveal from '../../COMPONENTS/TextReveal/TextReveal'
import TableQueries from '../../COMPONENTS/TableQueries/TableQueries'
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
  // const [dni2, setDni2] = useState('')

  const [loading, setLoading] = useState(false)

  const [debeIngresarDatos, setDebeIngresarDatos] = useState(false);

  const dataLocalStorage = getToken()
  console.log(dataLocalStorage)

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

    if (document.getElementById('tbody')) {
      document
        .getElementById('idTableFiltrar')
        .removeChild(document.getElementById('tbody'))
    } else {
      console.log('no existe tbody')
    }
    let tabla = document.getElementById('idTableFiltrar')
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'tbody')
    tabla.appendChild(tbody)
    let tablaTbody = document.getElementById('tbody')

    if (tablaTbody.childElementCount > 0) {
      tablaTbody.parentNode.removeChild(tablaTbody)
    }

    setLoading(true)
    setDebeIngresarDatos(false)

    if(dni !== '' || nombres !== ''){

      let url = 'https://api.mundosantanatura.com/api/Room/ListClientState'
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
            let myObject = respuesta.data.data[i];
            // var {puntosPeriodo, idPeriodo, ...myUpdateObject} = myObject;
            for (let propiedad in myObject) {
              console.log(myObject[propiedad])
              cell = document.createElement('td')
              cell.textContent = `${myObject[propiedad]}`
              row.appendChild(cell)
            }
          }
        }
      } catch (error) {
        console.log(error)
      }

    } else{
      setDebeIngresarDatos(true)
      console.log('debeIngresarDatos es true')
    }
    setLoading(false)
  }

  const consultarValidacionMigracion = async (e) => {
    e.preventDefault()

    //Si existe el tbody al dar click al boton Validar, remover el tbody.
    if (document.getElementById('tbodyValidar')) {
      document
        .getElementById('idTableValidar')
        .removeChild(document.getElementById('tbody'))
    } else {
      console.log('no existe tbody')
    }

    let tabla = document.getElementById('idTableValidar')
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'tbodyValidar')
    tabla.appendChild(tbody)

    let tablaTbody = document.getElementById('tbodyValidar')
    if (tablaTbody.childElementCount > 0) {
      tablaTbody.parentNode.removeChild(tablaTbody)
    }

    setLoading(true)

    let url = 'http://localhost:3001/tabla'
    try {
      const respuesta = await axios({
        method: 'get',
        url: url,
        // headers: {
        //   Authorization: `Bearer ${JSON.parse(dataLocalStorage).accesToken}`,
        // },
        // data: {
        //   nombres: nombres,
        //   documento: dni,
        // },
      })

      if (tbody > 0) {
        // el tbody tiene hijos
        console.log('el tbody tiene hijos')
      } else {
        // el tbody no tiene hijos
        console.log('el tbody no tiene hijos')
        let row, cell
        for (let i = 0; i < respuesta.data.data.length; i++) {
          row = document.createElement('tr')
          tbody.appendChild(row) //crea la cantidad de elementos tr según props.resultado.length
          for (let propiedad in respuesta.data.data[i]) {
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

  const consultarEstadoCompras = async (e) => {
    console.log('first')
  }

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

      {!!dataLocalStorage &&
      JSON.parse(dataLocalStorage).name === 'RONALD ANTONIO' ? (
        <main className="mainQueries">
          <TextReveal nombres={JSON.parse(dataLocalStorage).name} />
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
                <form className="form" onSubmit={(consultarDataCliente)}>
                  <section className="sectionInputsFiltrar">
                    <div className="input-container">
                      {debeIngresarDatos && <span class="tooltiptext">Ingrese el dato</span>}
                      <Inputs
                        id="dni"
                        placeholder="Ingrese el DNI"
                        type="text"
                        setDni={setDni}
                        setDebeIngresarDatos={setDebeIngresarDatos}
                        //  setResultadito={setResultadito}
                      />
                      <label htmlFor="dni" className="label">
                        DNI:
                      </label>
                    </div>
                    <div className="input-container">
                      {debeIngresarDatos && <span class="tooltiptext">Ingrese el dato</span>}
                      <Inputs
                        id="nombres"
                        placeholder="Ingrese nombres y apellidos"
                        type="text"
                        setNombres={setNombres}
                        setDebeIngresarDatos={setDebeIngresarDatos}
                      />
                      <label htmlFor="nombres" className="label">
                        NOMBRES - APELLIDOS:
                      </label>
                    </div>
                    <div className="btn">
                      <Boton id="Filtrar" />
                    </div>
                  </section>
                </form>
                <TableQueries
                  idTabla="idTableFiltrar"
                  data={['Estado', 'Id Cliente', 'Última compra', 'Puntos', 'Puntos Periodo', 'Id Periodo']}
                />
                {loading && <Loader />}
              </article>
            </div>
            <div>
              <input id="ac-2" name="accordion-1" type="radio" />
              <label htmlFor="ac-2">Validación de migración</label>
              <article className="ac-medium">
                <form className="form" onSubmit={(consultarValidacionMigracion)}>
                  <section className="sectionInputsFiltrar">
                    <div className="input-container">
                      <Inputs
                        id="dniValidarMigracion"
                        placeholder="Ingrese el DNI"
                        type="text"
                        setDni={setDni}
                        setNombres={setNombres}
                        // setDni2={setDni2}
                      />
                      <label htmlFor="dniValidarMigracion" className="label">
                        DNI:
                      </label>
                    </div>

                    <div className="btn">
                      <Boton
                        id="Validar"
                      />
                    </div>
                  </section>
                </form>
                <TableQueries
                  idTabla="idTableValidar"
                  data={['Id Cliente', 'Tipo Socio', 'Última compra']}
                />
                {loading && <Loader />}
              </article>
            </div>
          </section>
        </main>
      ) : null}

      {/* <TextReveal nombres={JSON.parse(dataLocalStorage).name} /> */}
      {/* <>
        {JSON.stringify(result)}
        </> */}

      {!!dataLocalStorage &&
      JSON.parse(dataLocalStorage).name === 'RAQUEL' ? (
        <main className="mainQueries">
          <TextReveal nombres={JSON.parse(dataLocalStorage).name} />
          <section className="ac-container">
            <div>
              <input id="ac-3" name="accordion-1" type="radio" />
              <label htmlFor="ac-3">Estado de Compras</label>
              <article className="ac-medium">
                <form className="form" onSubmit={(consultarEstadoCompras)}>
                  <section className="sectionInputsFiltrar">
                    <div className="input-container">
                      <Inputs
                        id="dniEstadoCompras"
                        placeholder="Ingrese el DNI"
                        type="text"
                        // setDni={setDni}
                        // setNombres={setNombres}
                        // setDni2={setDni2}
                      />
                      <label htmlFor="dniEstadoCompras" className="label">
                        DNI:
                      </label>
                    </div>
                    <div className="btn">
                      <Boton
                        id="ValidarEstadoCompras"
                        // funcion={consultarEstadoCompras}
                      />
                    </div>
                  </section>
                </form>
                
                <TableQueries
                  idTabla="idTableEstadoCompras"
                  data={[
                    'Ticket',
                    'Idop',
                    'Fecha',
                    'Estado Compra',
                    'Estado P.E.',
                  ]}
                />
                {loading && <Loader />}
              </article>
            </div>
          </section>
        </main>
      ) : null}

      {/* {JSON.parse(dataLocalStorage).name === 'RAQUEL' ? (

      ) : null} */}
      <Footer />
    </motion.div>
  )
}

export default Home
