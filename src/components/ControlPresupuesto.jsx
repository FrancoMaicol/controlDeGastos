import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from '@rhazegh/react-circular-progressbar'
import { } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
    gastos,
    setGastos, 
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto
    }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0 )

        const totalDisponible = presupuesto - totalGastado
        //Calcular el porcentaje gastado 
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto )* 100).toFixed(2)/**"toFixed" ayuda a solo poner dos dijitos en la consola cuando es un número con decimales*/

        setPorcentaje(nuevoPorcentaje)
        
        setDisponible(totalDisponible)
        setGastado(totalGastado)
    },[gastos])/**Cada que "gastos" cambie el "useEffect se activa"
    * Si se tiene un arreglo con objetos el método mas recomendable es utilizar ".reduce()" ya que puede acomular una gran cantidad de datos en una sola variable 
    *El primer valor en ".reduce()" toma el acomulado y el segundo itera en cada uno de los objetos */

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

     const handleResetearApp = () => {
        const resetear = confirm('¿Deseas resetear presupuesto y gastos?')

        if(resetear) {
            localStorage.clear()
            window.location.reload()
        }
        // if(resetear) {
        //     setGastos([])
        //     setPresupuesto(0)
        //     setIsValidPresupuesto(false)
        // }
     }/**Con esta función creamos una alerta para decirle que si desea resetear, si es asi los componentes los reinicia y los manda al "PLANIFICADOR DE GASTOS"*/

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                 styles= {buildStyles({
                    pathTransitionDuration: 4,
                    pathColor: porcentaje > 100 ? '#DC2626' : '#0589E4',
                    trailColor: '#EFF1F3',
                    textColor:  porcentaje > 100 ? '#DC2626' : '#0589E4'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />            
        </div>
        
        <div className="contenido-presupuesto">
            <button 
                className="reset-app"
                type="button"
                onClick={handleResetearApp}
            >
                Resetear app
            </button>
        
            <p>
                <span>Presupuesto:</span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''} `}>
                <span>Disponible:</span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado:</span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>    
  )
}

export default ControlPresupuesto