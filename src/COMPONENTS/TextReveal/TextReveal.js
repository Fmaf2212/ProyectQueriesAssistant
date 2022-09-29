import React from 'react'

import './TextReveal.css'

const TextReveal = ({nombres}) => {
  return (
    <div className='divTitle'>
        <h1 className='title'>
          <span className='span1'>Bienvenido {nombres},</span>
          <span className='span2'>acá podrás consultar</span>
          <span className='span3'>la información de los socios.</span>
        </h1>
    </div>
  )
}

export default TextReveal