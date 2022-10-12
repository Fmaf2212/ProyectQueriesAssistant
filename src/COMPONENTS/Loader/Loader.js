import React from 'react'

import './Loader.css'

const Loader = () => {
  return (
    <section className='sectionLoader'>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </section>
  )
}

export default Loader
