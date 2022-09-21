import { useState, useEffect } from 'react'

import './TableFiltrar.scss'

const TableFiltrar = (props) => {
  // console.log(props.data)

  const names = []

  props.data.forEach((th, index) => {
    names.push(<th key={index}>{th}</th>)
  })
  // let finalData = props.data1
  // const newArray = finalData.map(numero =>{
  //   return numero
  // })
  // console.log(newArray)
  // useEffect(() => {
  //   setCabecera(props.th);

  //   return () => {
  //     console.log(cabecera)
  //   };
  // }, []);
  // const numbers = props.numbers;
  // const listItems = numbers.map((number) =>
  //   <li key={number.toString()}>
  //     {number}
  //   </li>
  // );
  return (
    <section className="sectionTableResultadosFiltrado">
      <table id="tabla" className="styled-table">
        <thead>
          <tr>
            {
              names
            }
            {/* <th>{props.data1[0]}</th>
            <th>{props.data1[1]}</th>
            <th>{props.data1[2]}</th>
            <th>{props.data1[3]}</th> */}
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>Activo</td>
            <td>C0125</td>
            <td>16/05/2022</td>
            <td>26</td>
          </tr> */}
        </tbody>
      </table>
    </section>
  )
}

export default TableFiltrar
