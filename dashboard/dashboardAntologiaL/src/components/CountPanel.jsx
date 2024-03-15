import { useState, useEffect } from 'react'
import './countPanel.css'

function CountPanel(props) {
  const [total, setTotal] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3030/api/'+ props.endpoint)
        .then(res => res.json())
        .then(response => {
            //console.log("==== response =====");            
            //console.log(response);
            //console.log("=== fin response ====");
            setTotal(response.count);
            
            
        }).catch(err => console.log("Pasa por error"));
    },[]);

  return (
    <>
      <div className="total card-left-border">
        <p><i className={"fa-solid " + props.icon}></i> Total de {props.entity}: {total}</p>
      </div>
      
    </>
  )
}

export default CountPanel