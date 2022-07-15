import {useState, useEffect} from 'react'

const Filtros = ({filtro, setFiltro}) => {

  return (
    <div className="filtros sombra contenedor">
        <form >
            <div className="campo">
                <label>Filtrar Gastos</label>
                <select
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                > 
                 {/* Para acceder a los eventos de seleccione o que escuche un cambio tenemos que agregar el "target.value" */}
                    <option value="">-- Todas las categorías --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros