import React, { Component } from 'react'
import './welcome.css'
import axios from 'axios'
export default class 
 extends Component {
  render() {
    const sendRequest = async ()=>{
    const username = "aokiz"
    const password = "testPass@34@#$"
    const body = {username,password}
    const headers = {Authorization:'Bearer eytokenTest','content-type':'application/json'}
    const credentials = {firstname:"admi",lastname:"ziko",username,password}
  
    try{
      const response = await axios.post('http://127.0.0.1:8080/test/postUser',credentials)
      // const res2 = await axios.post("http://127.0.0.1:8080/test/postUser",credentials)
      console.log(response);
      console.log(response.headers['content-length']);
    }catch(ex){
      console.error("somthing went wrong ",ex.message);
    }
    // console.log("the post response is  :"+res2);
    }
    return (
    <div className='m-4 sizing'>
      <button className='btn btn-danger' onClick={sendRequest}>send request</button>
      <p className='font-weight-bold'>Welcome</p>
      <p className='font-weight-light'>Login to see protected content</p>
    </div>
    )
  }
}
