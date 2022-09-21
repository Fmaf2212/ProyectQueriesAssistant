import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextReveal from '../../COMPONENTS/TextReveal/TextReveal'
import TableFiltrar from '../../COMPONENTS/TableFiltrar/TableFiltrar'
import Boton from '../../COMPONENTS/Boton'

import logout from '../../BASE/img/logout.png'
import Inputs from '../../COMPONENTS/Inputs'

import { motion } from 'framer-motion/dist/framer-motion'

const Home = () => {
  const navigate = useNavigate()

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
    }
  }, [])

  const consultarDataCliente = () => {
    console.log('entré en consultarDataCliente')
  }
  const consultarValidacionMigracion = () => {
    console.log('entré en consultarValidacionMigracion')
  }


  return (
    <motion.div
      className="homeContainer"
      data-barba="container"
      data-barba-namespace="queries"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <header>
        <nav>
          <div className="navigation">
            <a onClick={()=>clickLogout()} className="button" href="#">
              <img src={logout} alt='logout'/>
              <div className="logout">LOGOUT</div>
            </a>
          </div>
        </nav>
      </header>
      <main className="mainQueries">
        <TextReveal />
        <form onSubmit={consultarDataCliente}>
          <section className="sectionInputsFiltrar">
            <div className="input-container">
              <Inputs id='dni' placeholder="Ingrese el DNI" type="text"/>
              <label htmlFor="dni" className="label">
                DNI:
              </label>
            </div>

            <div className="input-container">
              <Inputs id='nombres' placeholder="Ingrese nombres y apellidos" type="text"/>
              <label htmlFor="nombres" className="label">
                NOMBRES - APELLIDOS:
              </label>
            </div>
            <div className="btn">
              <Boton id="Filtrar" />
            </div>
          </section>
          <TableFiltrar data={["Estado","Id Cliente","Última compra > 20ptos","Puntos"]} />      
        </form>
        <form onSubmit={consultarValidacionMigracion}>
          <section className="sectionInputsFiltrar">
            <div className="input-container">
              <Inputs id='dniValidarMigracion' placeholder="Ingrese el DNI" type="text"/>
              <label htmlFor="dniValidarMigracion" className="label">
                DNI:
              </label>
            </div>

            <div className="btn">
              <Boton id="Validar"/>
            </div>
          </section>
          <TableFiltrar data={["Id Cliente","Tipo Socio","Última compra"]} />
        </form>
      </main>
    </motion.div>
  )
}

export default Home
