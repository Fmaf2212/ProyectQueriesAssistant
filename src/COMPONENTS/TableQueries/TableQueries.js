// import { useState, useEffect } from 'react'

import './TableQueries.scss'

const TableQueries = (props) => {

  const names = []

  // Completar el header de la tabla
  props.data.forEach((th, index) => {
    names.push(<th key={index}>{th}</th>)
  })
  
  return (
    <section className="sectionTableResultadosFiltrado">
      <table id={props.idTabla} className="styled-table">
        <thead>
          <tr>
            {names}
          </tr>
        </thead>
      </table>
    </section>
  )
}

export default TableQueries
