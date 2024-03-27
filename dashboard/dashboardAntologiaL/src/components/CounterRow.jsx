import CountPanel from "./CountPanel"

function CounterRow() {

  //console.log(window.innerWidth)
  return (
    <>
      <div className="counter-row">
        <CountPanel entity="Usuarios" endpoint="users" icon="fa-users"/>
        <CountPanel entity="Libros" endpoint="books" icon="fa-book"/>
        <CountPanel entity="Géneros" endpoint="genres" icon="fa-book-skull"/>
        <CountPanel entity="Autores" endpoint="authors" icon="fa-person-chalkboard"/>
        <CountPanel entity="Editoriales" endpoint="editorials" icon="fa-shop"/>
      </div>
      
    </>
  )
}

export default CounterRow