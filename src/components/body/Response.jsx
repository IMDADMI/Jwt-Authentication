import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Response() {
  //use useEffect to detect the cookie so that whenever the component re-render or the cookie value has changed callback will be triggered 
  
  
  const [data,setData] = useState([]);                                    
  
  const requestAccessToken = async (refreshToken)=>{
    console.log(refreshToken);
    // const refreshToken = Cookies.get('refresh-token')
    if(refreshToken){
      try{
        const res = await axios.get('http://localhost:8080/token/refresh',{headers: {"Authorization" : `Bearer ${refreshToken}`}})
        const accessToken = res.data['access-token']
        Cookies.remove('access-token');
        Cookies.set('access-token',accessToken);
        return getResponse(null,accessToken);
      }catch(error){
        console.log('error thrown while requesting access token');
        return null;
      }
  
    }else{
      return null;
    }
    
   
  }
  const getResponse = async (refreshToken,accessToken) => {
    
    if(accessToken===null)
        accessToken = Cookies.get('access-token')
    
    if(accessToken){
      try{
        const res = await axios.get('http://localhost:8080/user/list',{ headers: {"Authorization" : `Bearer ${accessToken}`}});
        if(res.data)
          setData(res.data);
        return res;
      }catch(error){

          return null;
      }
    }else
      return requestAccessToken(refreshToken);
    
   
  }
  useEffect(() => {
    const refreshToken = Cookies.get('refresh-token')
    if(refreshToken){
      if(!getResponse(refreshToken,null))
        console.log('null returned');
    }else{
      // alert('you are not authorized please login');
      window.location.replace('/authentication');
    }
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
          {data.map(user=>
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
