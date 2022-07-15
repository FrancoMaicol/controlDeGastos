import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
      gastos, 
      setGastoEditar, 
      eliminarGasto,
      filtro,
      gastosFiltrados
}) => {

  return (
    <div className="listado-gastos contenedor">
         {/* </>   En esta condición hace referencía a que si se selecciona una categoría solo la mostrara  */}
          { filtro ? (
             <>
                 <h2>{gastosFiltrados.length ? 'Gastos' : 'No hay Gastos aún'}</h2>

                  {gastosFiltrados.map( gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                        eliminarGasto={eliminarGasto}
                    />
                ))}
              </>  
              ) : (
                  <>
                  <h2>{gastos.length ? 'Gastos' : 'No hay Gastos aún'}</h2>
                      {gastos.map( gasto => (
                        <Gasto 
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))}
                  </>    
              )         
            }  {/*  De lo contrario muestra todas las categoriías */}
    </div>/**".map()" se va a ejecutar al menos una vez por cada elemento que haya y si no hay ningun elemento no se ejecuta */
  )
}

export default ListadoGastos