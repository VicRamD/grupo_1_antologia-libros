import ProductsPanel from "./ProductsPanel"
import BookDetailPanel from "./BookDetailPanel"
import './panelRow.css'

function PanelRow() {
  
    return (
      <>
        <div className="panel-row">
            <BookDetailPanel/>
            <ProductsPanel />
        </div>
        
      </>
    )
  }
  
  export default PanelRow
  