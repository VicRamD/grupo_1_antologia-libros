import { useState } from 'react'
import './App.css'
import CounterRow from './components/CounterRow'
import BookDetailPanel from './components/BookDetailPanel'
import CategoryPanel from './components/CategoryPanel'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className='logo-div'>
        <img src="/logo_p_horizontal.png" className="logo" alt="Logo Antología Libros" />
        {/*<!--<a href="" target="_blank">
          
  </a>-->*/}
      </div>
      <CounterRow/>
      <BookDetailPanel/>
      <CategoryPanel />
      
      {/*<!-- <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> -->*/}
    </>
  )
}

export default App
