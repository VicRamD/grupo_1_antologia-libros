import { useState, useEffect } from 'react'

function CountPanel(props) {

  const [total, setTotal] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:3030/api/'+ props.endpoint)
        .then(res => res.json())
        .then(response => {
            console.log("==== response =====");
            console.log(response);
            console.log("=== fin response ====");
            setTotal(response.count);
            //console.log(data);
            
        }).catch(err => console.log("Pasa por error"));
    },[]);

  return (
    <>
      <div className="card">
        <p>
          Total de {props.entity}: {total}
        </p>
        <p className="read-the-docs">
        
      </p>
      </div>
      
    </>
  )
}

export default CountPanel