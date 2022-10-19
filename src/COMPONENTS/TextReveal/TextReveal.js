import React from 'react'

import './TextReveal.css'

const TextReveal = ({nombres, textSpan3}) => {
  return (
    <div className='divTitle'>
        <h1 className='title'>
          <span className='span1'>Hola {nombres},</span>
          <span className='span2'>acá podrás consultar</span>
          <span className='span3'>{textSpan3}</span>
        </h1>
    </div>
  )
}

export default TextReveal