import React, { Component } from 'react'
import './welcome.css'
import axios from 'axios'
import Cookies from 'js-cookie';
export default class 
 extends Component {
  render() {
    const sendRequest = async ()=>{
    Cookies.set('user','ADMI',60);
    setTimeout(() => {
      console.log(Cookies.get('user'));
      Cookies.remove('user');
    }, 6000);
    const username = "aokiz"
    const password = "testPass@34@#$"
    const headers = {Authorization:'Bearer eytokenTest','content-type':'application/json'}
    const credentials = {username,password}
  
    try{
      const res2 = await axios.get('http://localhost:8080/user/list',{ headers: {"Authorization" : `Bearer`}});
      // const response = await axios.post("http://localhost:8080/boom",credentials)
      // const res2 = await axios.post("http://127.0.0.1:8080/test/postUser",credentials)
      // console.log(response);
      // console.log(response.headers['content-length']);
    }catch(ex){
      console.error("somthing went wrong ",ex.message);
    }
    // console.log("the post response is  :"+res2);
    }
    return (
    <div className='m-4 sizing'>
      {/* <button className='btn btn-danger' onClick={sendRequest}>send request</button> */}
      <p className='font-weight-bold'>Welcome</p>
      <p className='font-weight-light'>Login to see protected content</p>
    </div>
    )
  }
}
