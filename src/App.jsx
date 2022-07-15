import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos')
    ? JSON.parse(localStorage.getItem('gastos'))
    : []
 );/**
     * "JSON.parse()" sirve para convertir un string a un objeto
     */
  
  const [presupuesto, setPresupuesto] = useState(
      Number(localStorage.getItem('presupuesto')) ?? 0
  )/**
   * ".getItem()" devuelve el valor cuyo nombre para por el parametro agregado "presupuesto", lo agrega al localStorage
   */
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})  /**Cada gasto es un objeto por eso se agrega en el useState los "{}" */
  const [filtro, setFiltro] = useState('') 
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  
    
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])  
  },[gastos])/**
   * localStorage no puede almacenar arreglos por lo que se necesita de "JSON.stringify" para convertilo a un string 
   */

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
        setModal(true)

        setTimeout(() => {
          setAnimarModal(true)
        }, 500);
    }
  },[gastoEditar])/**
   * Con este useEffect ayuda a la función Modal a agregar los compoentes y cuando se cierra el Modal y quieres agregar un nuevo gasto el Modal esta vacio 
   */

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  },[presupuesto])
/**
 * Con ".setItem()" almacenamos la información en el localStorage, en el primer parámetro se ingresa el nombre del elemento y en segundo parámetro se ingresa el valor.
 */

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if( presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  },[])/**
   * Con este useEffect podemos ver que si tenemos un presupuesto mayor a cero la pagina se queda en planificador de gastos y no se regresa al añadir presupuesto
   */

  useEffect(() =>{ 
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro )

      setGastosFiltrados(gastosFiltrados)
    }  
    
  },[filtro])

  const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})/**Al agregar "setGastoEditar como objeto vacio al presionar el icono de handleNuevoGasto resetea el formulario" */

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
  }

  const guardarGasto = gasto => {

    if(gasto.id){
      //Actualizar
        const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )
        setGastos(gastosActualizados)
        setGastoEditar({})//Con esto resetea el State
    /**EJEMPLO DE COMO FUNCIONA ESTE if
     * Si tenemos 3 registros
     * 1
     * 2
     * 3
     * identifica algún registro(ejemplo: 3) que queramos editar el componente "gasto" toma ese registro(ejemplo: 3) y ya no es 3 si no que ahora es "gasto" mientras que los que no cumplen con la condición retorna esos valores sin modificarlos */    
    }else{ 
      //Nuevo gasto
      gasto.id=generarId();
      gasto.fecha=Date.now();
      setGastos([...gastos, gasto])
    }
  
    setAnimarModal(false)
        
        setTimeout(() => {
            setModal(false)    
        }, 500);
  }/**Con esta función cuando apretamos el boton "añadir gasto" se cierra el Modal */

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )

    setGastos(gastosActualizados)
  }/**El método "filter()" crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada */

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      
      {isValidPresupuesto && (
        <>
            <main>
                <Filtros
                  filtro={filtro}
                  setFiltro={setFiltro}
                />
                <ListadoGastos
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                />
            </main>
            <div className="nuevo-gasto">
              <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
        </>
        
      )}

      {modal && <Modal 
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}

    </div>
  )
}/**"&&" se puede utilizar para que se cumpla solo la condición */

export default App
