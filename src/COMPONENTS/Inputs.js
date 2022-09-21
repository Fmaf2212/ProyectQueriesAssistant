import { useEffect } from 'react'


const Inputs = ({id,placeholder,type}) => {
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
        dniValidarMigracion.addEventListener('blur', (event) => {
          if (event.target.value === '') {
            event.target.nextElementSibling.classList.remove('filled')
          }
        })
        dniValidarMigracion.addEventListener('click', (event) => {
          if (event.target.value === '') {
            event.target.nextElementSibling.classList.add('filled')
          }
        })
      }, [])
    
    

  return (
    <input
      // value={dni}
      type={type}
      id={id}
      autoComplete="on"
      className="text-input"
      placeholder={placeholder}
      name={id}
      onFocus={(e) => e.target.nextElementSibling.classList.add('filled')}
    />
  )
}

export default Inputs
