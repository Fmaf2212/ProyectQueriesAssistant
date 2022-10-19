// import icon from '../BASE/img/icon.svg'

const boton = ({id, funcion, value}) => {
    // console.log(id)
    function alPasarPuntero(e) {
        const filtrar = document.getElementById(`${id}`)
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        let ripple = document.createElement('span')
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`
        filtrar.appendChild(ripple)
        setTimeout(function () {
          ripple.remove()
        }, 600)
      }
  return (
    <input
      // onMouseEnter={(e) => alPasarPuntero(e)}
      id={id}
      className="inputFiltrar"
      type="submit"
      value={value}
      // onClick={(e) => funcion(e)}
    />
    //   {/* <img src={icon} alt="icon" /> */}
    //   {/* {id}  */}
    // {/* </input> */}
  )
}

export default boton
