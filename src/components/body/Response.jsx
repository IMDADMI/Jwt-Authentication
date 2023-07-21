import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
export default function Response() {
  //use useEffect to detect the cookie so that whenever the component re-render or the cookie value has changed callback will be triggered 
  
  
  const [data,setData] = useState([]);                                    
  
  const requestAccessToken = async ()=>{
    
    console.log('requesting access token');
    const refreshToken = Cookies.get('refresh-token')
    console.log('the refresh token is : ,',refreshToken);
    const tokenHeader = {"Authorization":"Bearer "+refreshToken}
    // console.log('token header is : ',tokenHeader);

    const res = await axios.get('locahost:8080/refresh',{headers:tokenHeader})
    // console.log('requesting access token result is : ',res);
    if(res.data.status !== 403){
      const accessToken = res.headers['access-token']
      // console.log('the requested access token is : ',accessToken);
      Cookies.remove('access-token');
      Cookies.set('access-token',accessToken);
    }else{
      //request new access and refresh token
      //just login again
    }
  }
  const getResponse = async ()=>{
    const accessToken = Cookies.get('access-token')
    // console.log('the access token is : ',accessToken);
    const tokenHeader = {Authorization:`Bearer ${accessToken}`}
    // console.log('token header is : ',tokenHeader);
    // const res = await axios.get('http://localhost:8080/users',{headers:tokenHeader});
    try{
      const res = await axios.get('http://localhost:8080/user/list',{ headers: {"Authorization" : `Bearer ${accessToken}`}});
      if(res.data)
        setData(res.data);
      return res;
      
    }catch(e){
        return null;
    }
    // const res = await axios.get('http://localhost:8080/user',{ headers: {"Authorization" : `Bearer ${accessToken}`} });
    // const res2 = await axios.get('http://localhost:8080/user/test',{ headers: {"Authorization" : `Bearer ${accessToken}`} });
  }
  useEffect(() => {
    console.log('render');
    const result = getResponse();
    if(result.status === 403){
      console.log('status 403');
      requestAccessToken()
      getResponse();
      // console.log(result.data);
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
