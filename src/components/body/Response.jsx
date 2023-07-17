import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Response() {
  //use useEffect to detect the cookie so that whenever the component re-render or the cookie value has changed callback will be triggered 
  
  const [data,setData] = useState({});
  
  const requestAccessToken = async ()=>{
    const refreshToken = Cookies.get('refresh-token')
    const tokenHeader = {"Authorization":"Bearer "+refreshToken}
    const res = await axios.get('locahost:8080/refresh',{},{headers:tokenHeader})
    if(res.data.status !== 401){
      const accesssToken = res.headers['access-token']
      Cookies.set('access-token',accessToken);
    }else{
      //request new access and refresh token
      //just login again
    }
  }
  const getResponse =async ()=>{
    const accessToken = Cookies.get('access-token')
    const tokenHeader = {"Authorization":"Bearer "+accessToken}
    const res = await axios.get('locahost:8080/users',{},{headers:tokenHeader});
    return res;
  }
  useEffect(async () => {
    //
    const result = getResponse();
    if(result.data.status === 401){
      requestAccessToken()
      const res = await getResponse();
      setData(res.data);
    
    }else{
      setData(result.data);
    }

  }, []);

  return (
    <div>Response {data}</div>
  )
}
