import { useEffect } from 'react'

const Inputs = ({
  id,
  placeholder,
  type,
  setDni,
  setNombres,
  setDniValidMigra,
  setDniEstadoCompras,
  setTicket,
  setDebeIngresarDatos,
  setDebeIngresarDatos2,
  setDebeIngresarDatos3,
}) => {
  useEffect(() => {
    const dni = document.getElementById(`${id}`)
    // const nombres = document.getElementById('nombres')
    // const dniValidarMigracion = document.getElementById('dniValidarMigracion')
    dni.addEventListener('blur', (event) => {
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.remove('filled')
      }
    })
    dni.addEventListener('click', (event) => {
      if (event.target.value === '') {
        event.target.nextElementSibling.classList.add('filled')
      }
    })
    // nombres.addEventListener('blur', (event) => {
    //   if (event.target.value === '') {
    //     event.target.nextElementSibling.classList.remove('filled')
    //   }
    // })
    // nombres.addEventListener('click', (event) => {
    //   if (event.target.value === '') {
    //     event.target.nextElementSibling.classList.add('filled')
    //   }
    // })
    // dniValidarMigracion.addEventListener('blur', (event) => {
    //   if (event.target.value === '') {
    //     event.target.nextElementSibling.classList.remove('filled')
    //   }
    // })
    // dniValidarMigracion.addEventListener('click', (event) => {
    //   if (event.target.value === '') {
    //     event.target.nextElementSibling.classList.add('filled')
    //   }
    // })
  }, [id])

  const handleChange = (e) => {
    if (setDni !== '' || setNombres !== '' || setDniValidMigra !== '' || setDniEstadoCompras !== '' || setTicket !== '') {
      if (setDni !== undefined) {
        setDni(e.target.value)
      }
      if (setNombres !== undefined) {
        setNombres(e.target.value)
      }
      if (setDniValidMigra !== undefined) {
        setDniValidMigra(e.target.value)
      }
      if (setDniEstadoCompras !== undefined) {
        setDniEstadoCompras(e.target.value)
      }
      if (setTicket !== undefined) {
        setTicket(e.target.value)
      }
      if (setDni !== undefined || setNombres !== undefined) {
        setDebeIngresarDatos(false)
      }
      if (setDniValidMigra !== undefined) {
        setDebeIngresarDatos2(false)
      }
      if (setDniEstadoCompras !== undefined || setTicket !== undefined) {
        setDebeIngresarDatos3(false)
      }

    } else {
      console.log('Ambos campos no tienen datos')
    }
  }

  return (
    <input
      type={type}
      id={id}
      autoComplete="on"
      className="text-input"
      placeholder={placeholder}
      name={id}
      onFocus={(e) => e.target.nextElementSibling.classList.add('filled')}
      onChange={(e) => handleChange(e)}
    />
  )
}

export default Inputs
