import { useEffect } from 'react'

const Inputs = ({ id, placeholder, type, setDni, setNombres, setDebeIngresarDatos }) => {
  useEffect(() => {
    const dni = document.getElementById(`${id}`)
    const nombres = document.getElementById('nombres')
    const dniValidarMigracion = document.getElementById('dniValidarMigracion')
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
    console.log(setDni)
    console.log(setNombres)

    if(setDni !== '' || setNombres !== ''){
      console.log('entré en el if de handleChange')
      if(setDni !== undefined){
        console.log('entré en setDni')
        setDni(e.target.value);
      }
      if(setNombres !== undefined){
        console.log('entré en setNombres')
        setNombres(e.target.value);
      }
      setDebeIngresarDatos(false)
    }
    else{
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
