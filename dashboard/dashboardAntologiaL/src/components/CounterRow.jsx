import CountPanel from "./CountPanel"

function CounterRow() {

  //console.log(window.innerWidth)
  return (
    <>
      <div className="counter-row">
        <CountPanel entity="Libros" endpoint="books" icon="fa-book"/>
        <CountPanel entity="Usuarios" endpoint="users" icon="fa-users"/>
        <CountPanel entity="Géneros" endpoint="genres" icon="fa-book-skull"/>
        <CountPanel entity="Autores/as" endpoint="authors" icon="fa-person-chalkboard"/>
      </div>
      
    </>
  )
}

export default CounterRow