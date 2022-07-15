import React from 'react'

const Mensaje = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo}`}>{children}</div>
  )
} /**Con `` se pueden agregar clases
* Se crea un componente llamado "tipo" donde se pueden almacenar diferentes valores 
*Y finalmente "children" se le pasan todos los datos a el*/

export default Mensaje