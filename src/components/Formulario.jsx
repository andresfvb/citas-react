import {useState, useEffect} from "react"
import Error from "./Error"


const Formulario = ({pacientes, setPacientes, paciente, setPaciente,eliminarPaciente}) => {
  const [nombre, setNombre] =useState('')
  const [propietario, setPropietario] =useState('')
  const [email, setEmail] =useState('')
  const [fecha, setFecha] =useState('')
  const [sintomas, setSintomas] =useState('')

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre) 
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = ()=>{
    const random = Math.random().toString(36).substr(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }
  const handleSubmit = (e) =>{
    e.preventDefault()

    //Validation of formulation
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay almenos un campo vacio')
      setError(true)
      return
    }
      setError(false)

      // Objeto PAciente
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas,
      }
      if(paciente.id){
        // Editando registro
        objetoPaciente.id = paciente.id
        const pacientesActualizados = pacientes.map( pacientesState => pacientesState.id === paciente.id ? objetoPaciente : pacientesState)
        setPacientes(pacientesActualizados)
        setPaciente('')
      }else{
        //Nuevo registro
        objetoPaciente.id = generarId()
        setPacientes([...pacientes, objetoPaciente])
      }

      //Reiniciar el form
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')

  }
  const reiniciarForm = () =>{
    setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
      setPaciente('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Añade pacientes y {''}
          <span className="text-indigo-600 font-font-bold ">Administralos</span>
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-5 m-3"
        >
          {error && <Error>Todos los campos son obligatorios</Error>}
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="mascota">Nombre Mascota</label>
            <input
              id="mascota"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              placeholder="Nombre de la mascota"
              value={nombre}
              onChange={ (e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="propietario">Nombre Propietario</label>
            <input
              id="propietario"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="text"
              placeholder="Nombre del Propietario"
              value={propietario}
              onChange={ (e) => setPropietario(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="email">Email</label>
            <input
              id="email"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="email"
              placeholder="Correo electronico"
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">Fecha de Alta</label>
            <input
              id="alta"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              type="date"
              value={fecha}
              onChange={ (e) => setFecha(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 uppercase font-bold" htmlFor="sintomas">Sintomas</label>
            <textarea
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              value={sintomas}
              onChange={ (e) => setSintomas(e.target.value)}
            />
          </div>
          {
            paciente.id ? (
              <div className="felx justify-between">
              <input
                className="bg-green-600 w-2/5 m-5 text-white uppercase font-font-bold p-3 hover:bg-green-700 cursor-pointer transition-colors rounded"
                type="submit"
                value='Actualizar paciente'
              />
              <button
                className="bg-red-600 w-2/5 m-5 text-white uppercase font-font-bold p-3 hover:bg-red-700 cursor-pointer transition-colors rounded"
                onClick={reiniciarForm}
                >Cancelar</button>
              </div>
            )
            : (
              <>
              <input
                className="bg-indigo-600 w-full text-white uppercase font-font-bold p-3 hover:bg-indigo-700 cursor-pointer transition-colors "
                type="submit"
                value='Agregar paciente'
              />
              </>
            )
          }
          
        </form>
    </div>
  )
}

export default Formulario