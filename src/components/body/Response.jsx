import React, { useEffect, useState } from 'react'
import { request } from '../../helper/helper';
export default function Response() {
  const [data,setData] = useState([]);                                    
  
  useEffect(() => {
    request('GET','/user',{}).then((response)=>{
      console.log(response.data);
      setData(response.data);
    }).catch(e=>{
      console.log(e.response.status);
    });
  }, []);


  return (
      <div className='container'>
        <h2 className=''>Listing of users : </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
            </tr>
          </thead>
          <tbody>
          {data && data.map(user=>
            <tr key={user.id}>
              <th scope="row">{user.id}</th>
              <td>{user.username}</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
  )
}
