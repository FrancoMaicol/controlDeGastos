import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault();

    if(!presupuesto || presupuesto < 0){
      setMensaje('No es un presupuesto válido')
      return
    }

     setMensaje('')
     setIsValidPresupuesto(true)
     /**La condición "!" significa si es diferente de */
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>

                <input
                    className="nuevo-presupuesto"
                    type="number"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={ e => setPresupuesto(Number(e.target.value))}/**Cuando el usuario digite el valor en "Añade tu presupuesto se ira directamente a la variable "setPresupuesto"*/
                />
            </div>

            <input type="submit" value="Añadir"/>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje> }
        </form> 
    </div>
  )
}/**Por prop "tipo" se le asigna la clase de "error"  */

export default NuevoPresupuesto