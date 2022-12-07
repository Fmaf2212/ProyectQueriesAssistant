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
  const [dniValidMigra, setDniValidMigra] = useState('')
  const [dniEstadoCompras, setDniEstadoCompras] = useState('')
  const [ticket, setTicket] = useState('')
  const [msgError, setMsgError] = useState('')

  const [loading, setLoading] = useState(false)

  const [debeIngresarDatos, setDebeIngresarDatos] = useState(false)
  const [debeIngresarDatos2, setDebeIngresarDatos2] = useState(false)
  const [debeIngresarDatos3, setDebeIngresarDatos3] = useState(false)

  const dataLocalStorage = getToken()

  const obj = [
    {
      idSocio: `${(dataLocalStorage && JSON.parse(dataLocalStorage).idClient==='C101532') ? JSON.parse(dataLocalStorage).idClient : null}`,
      lstTabla: ['bloque01']
    },
    {
      idSocio: `${(dataLocalStorage && (JSON.parse(dataLocalStorage).idClient==='C016532' || JSON.parse(dataLocalStorage).idClient==='C013564')) ? JSON.parse(dataLocalStorage).idClient : null}`,
      lstTabla: ['bloque02']
    },
    {
      idSocio: `${(dataLocalStorage && JSON.parse(dataLocalStorage).idClient==='C007239') ? JSON.parse(dataLocalStorage).idClient : null}`,
      lstTabla: ['bloqueAdmi']
    }
  ]

  useEffect(() => {
    console.log('entré en useEffect')
    const loggedInUser = window.localStorage.getItem(
      'loggedQueriesAssistantUser',
    )

    if (!loggedInUser) {
      console.log('no hay token')
      navigate('/')
    }


    if(!!dataLocalStorage){
      obj.forEach(element => {
        console.log(element);
      });
      
      const existeUsuario = obj.findIndex(usu  => usu.idSocio === JSON.parse(dataLocalStorage).idClient);
      const objUsuSeleccionado = obj[existeUsuario];
      (objUsuSeleccionado.lstTabla).forEach(element => {
        console.log(element)
        document.getElementById(element).style.display="block";
      });
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

    if (dni !== '' || nombres !== '') {
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
            let myObject = respuesta.data.data[i]
            // Para cuando se necesite eliminar algunos campos del objeto.
            // var {puntosPeriodo, idPeriodo, ...myUpdateObject} = myObject;
            // for (let propiedad in myUpdateObject) {
            //   console.log(myUpdateObject[propiedad])
            //   cell = document.createElement('td')
            //   cell.textContent = `${myUpdateObject[propiedad]}`
            //   row.appendChild(cell)
            // }
            // Para cuando no se necesite eliminar campos del objeto.
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
    } else {
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
        .removeChild(document.getElementById('tbodyValidar'))
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
    setMsgError('')
    setDebeIngresarDatos2(false)


    if (dniValidMigra !== '') {
      let url = 'https://api.mundosantanatura.com/api/Room/ListValidationStatus'
      try {
        const respuesta = await axios({
          method: 'post',
          url: url,
          headers: {
            Authorization: `Bearer ${JSON.parse(dataLocalStorage).accesToken}`,
          },
          data: {
            idCliente: '',
            documento: dniValidMigra,
          },
        })

        if (tbody > 0) {
          // el tbody tiene hijos
          console.log('el tbody tiene hijos')
        } else {     
          setMsgError(respuesta.data.message)
          // el tbody no tiene hijos
          console.log('el tbody no tiene hijos')
          let row, cell
          for (let i = 0; i < respuesta.data.data.length; i++) {
            console.log('entré en for (let i = 0; i < resultadito.length; i++)')
            row = document.createElement('tr')
            tbody.appendChild(row) //crea la cantidad de elementos tr según props.resultado.length
            console.log(respuesta.data.data[i])
            let myObject = respuesta.data.data[i]
            //Para cuando se necesite eliminar algunos campos del objeto.
            var {ticket, ...myUpdateObject} = myObject;
            for (let propiedad in myUpdateObject) {
              console.log(myUpdateObject[propiedad])
              cell = document.createElement('td')
              cell.textContent = `${myUpdateObject[propiedad]}`
              row.appendChild(cell)
            }
          }         
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setDebeIngresarDatos2(true)
      console.log('debeIngresarDatos es true')
    }

    setLoading(false)
  }

  const consultarEstadoCompras = async (e) => {
    e.preventDefault()

    if (document.getElementById('tbodyEstadoCompras')) {
      document
        .getElementById('idTableEstadoCompras')
        .removeChild(document.getElementById('tbodyEstadoCompras'))
    } else {
      console.log('no existe tbodyEstadoCompras')
    }
    let tabla = document.getElementById('idTableEstadoCompras')
    let tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'tbodyEstadoCompras')
    tabla.appendChild(tbody)
    let tablaTbody = document.getElementById('tbodyEstadoCompras')

    if (tablaTbody.childElementCount > 0) {
      tablaTbody.parentNode.removeChild(tablaTbody)
    }

    setLoading(true)
    setMsgError('')
    setDebeIngresarDatos3(false)

    if (dniEstadoCompras !== '' || ticket !== '') {
      let url = 'https://api.mundosantanatura.com/api/Room/ListStatePurchases'
      try {
        const respuesta = await axios({
          method: 'post',
          url: url,
          headers: {
            Authorization: `Bearer ${JSON.parse(dataLocalStorage).accesToken}`,
          },
          data: {
            ticket: ticket,
            documento: dniEstadoCompras,
            idCliente: JSON.parse(dataLocalStorage).idClient
          },
        })

        setMsgError(respuesta.data.message)
        if (tbody > 0) {
          // el tbody tiene hijos
          console.log('el tbody tiene hijos')
        } else {
          console.log(respuesta)
          // el tbody no tiene hijos
          console.log('el tbody no tiene hijos')
          let row, cell
          for (let i = 0; i < respuesta.data.data.length; i++) {
            console.log('entré en for (let i = 0; i < resultadito.length; i++)')
            row = document.createElement('tr')
            tbody.appendChild(row) //crea la cantidad de elementos tr según props.resultado.length
            console.log(respuesta.data.data[i])
            let myObject = respuesta.data.data[i]
            //Para cuando se necesite eliminar algunos campos del objeto.
            var {idCliente, ...myUpdateObject} = myObject;
            for (let propiedad in myUpdateObject) {
              console.log(myUpdateObject[propiedad])
              cell = document.createElement('td')
              cell.textContent = `${myUpdateObject[propiedad]}`
              row.appendChild(cell)
            }
          }
        }
        
      } catch (error) {
        let row, cell;
        row = document.createElement('tr')
        tbody.appendChild(row)
        cell = document.createElement('td')
        cell.setAttribute("colspan", "100")
        cell.textContent = 'No se ha encontrado registro del cliente o ticket.';
        row.appendChild(cell)
      }
    } else {
      setDebeIngresarDatos3(true)
      console.log('debeIngresarDatos es true')
    }
    setLoading(false)
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

      
      {/* {!!dataLocalStorage &&
      JSON.parse(dataLocalStorage).name === 'WILLMEYRY' ? (<p>Bloque</p>) : null} */}

      <main className="mainQueries" id='bloque01' style={{display: 'none'}}>
        <TextReveal textSpan3='la información de los socios.' nombres={(dataLocalStorage) ? JSON.parse(dataLocalStorage).name : null} />
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
              <form className="form" onSubmit={consultarDataCliente}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
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
                    {debeIngresarDatos && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
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
                    <Boton 
                      id="Filtrar"
                      value="Filtrar"
                    />
                  </div>
                </section>
              </form>
              <TableQueries
                idTabla="idTableFiltrar"
                data={[
                  'Estado',
                  'Id Cliente',
                  'Última compra',
                  'Puntos',
                  'Puntos Periodo',
                  'Id Periodo',
                ]}
              />
              {loading && <Loader />}
            </article>
          </div>
          <div>
            <input id="ac-2" name="accordion-1" type="radio" />
            <label htmlFor="ac-2">Validación de migración</label>
            <article className="ac-small">
              <form className="form" onSubmit={consultarValidacionMigracion}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos2 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="dniValidarMigracion"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDniValidMigra={setDniValidMigra}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                      setDebeIngresarDatos={setDebeIngresarDatos}
                      setDebeIngresarDatos2={setDebeIngresarDatos2}
                    />
                    <label htmlFor="dniValidarMigracion" className="label">
                      DNI:
                    </label>
                  </div>

                  <div className="btn">
                    <Boton 
                      id="Validar"
                      value="Validar"
                    />
                  </div>
                </section>
              </form>
              <TableQueries
                idTabla="idTableValidar"
                data={['Tipo Cliente', 'Última compra', 'Estado de Compra', 'Id Cliente']}
              />
              {loading && <Loader />}
              {(!!msgError) ? 
              (
                <div style={{display:"flex", justifyContent:"center",marginTop:"20px"}}>
                  <span>{msgError}</span>
                </div>
              )
              : null }
            </article>
          </div>
        </section>
      </main>

      <main className="mainQueries" id='bloque02' style={{display: 'none'}}>
        <TextReveal textSpan3='el estado de las compras.' nombres={(dataLocalStorage) ? JSON.parse(dataLocalStorage).name : null} />
        <section className="ac-container">
          <div>
            <input id="ac-3" name="accordion-1" type="radio" />
            <label htmlFor="ac-3">Estado de Compras</label>
            <article className="ac-small">
              <form className="form" onSubmit={consultarEstadoCompras}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos3 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="dniEstadoCompras"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDniEstadoCompras={setDniEstadoCompras}
                      setDebeIngresarDatos3={setDebeIngresarDatos3}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                    />
                    <label htmlFor="dniEstadoCompras" className="label">
                      DNI:
                    </label>
                  </div>
                  <div className="input-container">
                    {debeIngresarDatos3 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="ticketEstadoCompras"
                      placeholder="Ingrese el ticket"
                      type="text"
                      setTicket={setTicket}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                      setDebeIngresarDatos3={setDebeIngresarDatos3}
                    />
                    <label htmlFor="ticketEstadoCompras" className="label">
                      Ticket:
                    </label>
                  </div>
                  <div className="btn">
                    <Boton
                      id="ValidarEstadoCompras"
                      value="Validar"
                      // funcion={consultarEstadoCompras}
                    />
                  </div>
                </section>
              </form>

              <TableQueries
                idTabla="idTableEstadoCompras"
                data={[
                  'Idop',
                  'Fecha de Creación',
                  'Estado Compra',
                  'Estado P.E.',
                  'Fecha de Pago',
                  'Ticket',
                ]}
              />
              {loading && <Loader />}
              {/* {(!!msgError) ? 
              (
                <div style={{display:"flex", justifyContent:"center",marginTop:"20px"}}>
                  <span>{msgError}</span>
                </div>
              )
              : null } */}
            </article>
          </div>
        </section>
      </main>

      <main className="mainQueries" id='bloqueAdmi' style={{display: 'none'}}>
        <TextReveal textSpan3='la información de los socios.' nombres={(dataLocalStorage) ? JSON.parse(dataLocalStorage).name : null} />
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
              <form className="form" onSubmit={consultarDataCliente}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
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
                    {debeIngresarDatos && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
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
                    <Boton 
                      id="Filtrar"
                      value="Filtrar"
                    />
                  </div>
                </section>
              </form>
              <TableQueries
                idTabla="idTableFiltrar"
                data={[
                  'Estado',
                  'Id Cliente',
                  'Última compra',
                  'Puntos',
                  'Puntos Periodo',
                  'Id Periodo',
                ]}
              />
              {loading && <Loader />}
            </article>
          </div>
          <div>
            <input id="ac-2" name="accordion-1" type="radio" />
            <label htmlFor="ac-2">Validación de migración</label>
            <article className="ac-small">
              <form className="form" onSubmit={consultarValidacionMigracion}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos2 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="dniValidarMigracion"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDniValidMigra={setDniValidMigra}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                      setDebeIngresarDatos={setDebeIngresarDatos}
                      setDebeIngresarDatos2={setDebeIngresarDatos2}
                    />
                    <label htmlFor="dniValidarMigracion" className="label">
                      DNI:
                    </label>
                  </div>

                  <div className="btn">
                    <Boton 
                      id="Validar"
                      value="Validar"
                    />
                  </div>
                </section>
              </form>
              <TableQueries
                idTabla="idTableValidar"
                data={['Tipo Cliente', 'Última compra', 'Estado de Compra', 'Id Cliente']}
              />
              {loading && <Loader />}
            </article>
          </div>
          <div>
            <input id="ac-3" name="accordion-1" type="radio" />
            <label htmlFor="ac-3">Estado de Compras</label>
            <article className="ac-small">
              <form className="form" onSubmit={consultarEstadoCompras}>
                <section className="sectionInputsFiltrar">
                  <div className="input-container">
                    {debeIngresarDatos3 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="dniEstadoCompras"
                      placeholder="Ingrese el DNI"
                      type="text"
                      setDniEstadoCompras={setDniEstadoCompras}
                      setDebeIngresarDatos3={setDebeIngresarDatos3}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                    />
                    <label htmlFor="dniEstadoCompras" className="label">
                      DNI:
                    </label>
                  </div>
                  <div className="input-container">
                    {debeIngresarDatos3 && (
                      <span className="tooltiptext">Ingrese el dato</span>
                    )}
                    <Inputs
                      id="ticketEstadoCompras"
                      placeholder="Ingrese el ticket"
                      type="text"
                      setTicket={setTicket}
                      // setNombres={setNombres}
                      // setDni2={setDni2}
                      setDebeIngresarDatos3={setDebeIngresarDatos3}
                    />
                    <label htmlFor="ticketEstadoCompras" className="label">
                      Ticket:
                    </label>
                  </div>
                  <div className="btn">
                    <Boton
                      id="ValidarEstadoCompras"
                      value="Validar"
                      // funcion={consultarEstadoCompras}
                    />
                  </div>
                </section>
              </form>

              <TableQueries
                idTabla="idTableEstadoCompras"
                data={[
                  'Idop',
                  'Fecha de Creación',
                  'Estado Compra',
                  'Estado P.E.',
                  'Fecha del Pago',
                  'Ticket',
                ]}
              />
              {loading && <Loader />}
            </article>
          </div>
        </section>
      </main>


      {/* {JSON.parse(dataLocalStorage).name === 'RAQUEL' ? (

      ) : null} */}
      <Footer />
    </motion.div>
  )
}

export default Home
