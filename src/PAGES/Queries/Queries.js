import './Queries.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { deleteToken, getToken, initAxiosInterceptors } from '../Helpers/auth-helpers.js'

import TextReveal from '../../COMPONENTS/TextReveal/TextReveal'
import TableFiltrar from '../../COMPONENTS/TableFiltrar/TableFiltrar'
import Boton from '../../COMPONENTS/Boton'

import axios from 'axios'

import logout from '../../BASE/img/logout.png'
import Inputs from '../../COMPONENTS/Inputs'

import { motion } from 'framer-motion'

import Loader from '../../COMPONENTS/Loader/Loader';

initAxiosInterceptors();


const Home = () => {
  const navigate = useNavigate()
  const [result, setResult] = useState();
  const token = "	32c5250c-51e0-439b-8a9c-8e869666495d";

  const [dni, setDni] = useState('');
  const [nombres, setNombres] = useState('');

  const [loading, setLoading] = useState(false);

  const clickLogout = () => {
    // localStorage.setItem('loggedQueriesAssistantUser', '')
    deleteToken();
    navigate('/');
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

  
  // useEffect(()=>{
  //   fetch('https://api.santanaturaws.com/api/Room/ListClientState', {
  //     method: "POST",
  //     headers: {"Authorization": `Bearer ${token}`}
  //   })
  //   .then(res => res.json())
  //   .then(json => setResult(json));
  // },[]);

  const consultarDataCliente = async(e) => {
    e.preventDefault();
    console.log('entré en consultarDataCliente')
    setLoading(true);
    let url = "https://api.santanaturaws.com/api/Room/ListClientState";
    try{
      const respuesta = await axios({
        method: 'post',
        url: url,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          nombres: nombres,
          documento: dni
        }
      });
      console.log(respuesta)
    }catch(error){
      console.log(error)
    }
    setLoading(false);
  }

  const consultarValidacionMigracion = () => {
    console.log('entré en consultarValidacionMigracion')
  }


  return (
    <motion.div
      className="homeContainer"
      // data-barba="container"
      // data-barba-namespace="queries"
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
        <>
        {JSON.stringify(result)}
        </>
        <div>
          <section className="sectionInputsFiltrar">
            <div className="input-container">
              <Inputs
               id='dni' 
               placeholder="Ingrese el DNI" 
               type="text"
               onChange={(e) => setDni(e.target.value)}
              />
              <label htmlFor="dni" className="label">
                DNI:
              </label>
            </div>

            <div className="input-container">
              <Inputs
               id='nombres'
               placeholder="Ingrese nombres y apellidos" 
               type="text"
               onChange={(e) => setNombres(e.target.value)}
              />
              <label htmlFor="nombres" className="label">
                NOMBRES - APELLIDOS:
              </label>
            </div>
            <div className="btn">
              <Boton id="Filtrar" funcion={consultarDataCliente}/>
            </div>
          </section>
          <TableFiltrar data={["Estado","Id Cliente","Última compra > 20ptos","Puntos"]} />      
          {loading && <Loader />}
        </div>
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
