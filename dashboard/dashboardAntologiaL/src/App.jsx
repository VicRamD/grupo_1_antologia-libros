import { useState } from 'react'
import './App.css'
import CounterRow from './components/CounterRow'
//import BookDetailPanel from './components/BookDetailPanel'
import CategoryPanel from './components/CategoryPanel'
//import ProductsPanel from './components/ProductsPanel'
import PanelRow from './components/PanelRow'

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
      <PanelRow />
      <CategoryPanel />
    </>
  )
}

export default App
