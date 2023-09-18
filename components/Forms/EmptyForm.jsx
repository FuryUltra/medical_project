"use client"
import { useState, useEffect } from 'react';
function Page({ params }) {
    console.log(params);
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8000/liver_cancer/${params.edit_items}`)
          .then((response) => response.json())
          .then((responseData) => {
            setData(responseData);
            console.log(responseData)
          })
          .catch((error) => {
            console.error('Erreur lors de la requête API :', error);
          });
      }, []);
    return (
        <div>
            <h1>{params.edit_items}</h1>
            {data && (
                <div>
                    <p>Nom : {data.name}</p>
                    <p>Date : {data.date}</p>
                    <p>Address : {data.address}</p>
                
                </div>
            )}

            
        </div>
    )
}
export default Page