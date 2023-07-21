import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Response() {
  //use useEffect to detect the cookie so that whenever the component re-render or the cookie value has changed callback will be triggered 
  
  
  const [data,setData] = useState([]);                                    
  
  const requestAccessToken = async (refreshToken)=>{
    
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
          console.log('this is the dummy error',error);
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
      <div>
        <h2 className='container'>Listing of users : </h2>
        <ul>
          {data.map(user=><li key={user.id}>{user.username}</li>)}
        </ul>
      </div>
  )
}
