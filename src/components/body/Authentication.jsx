import React, { Component } from 'react'
import { NavLink, redirect} from 'react-router-dom';
import { getRefreshToken, request, saveAccessToken, saveRefreshToken } from '../../helper/helper';
export default class Authentication extends Component {
  constructor(props){
    const refreshToken = getRefreshToken();
    if(refreshToken)
      window.location.replace("/response"); 

    super(props);
    this.state = {
      isRegistration:false,
      firstname:"",
      lastname:"",
      username:"",
      password:""
    }
  }
  onChangeHandler = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]:value});
  }
  

  onLoginClick = ()=>{
    this.setState({isRegistration:false});
  }
  onRegistrationClick= ()=>{
    this.setState({isRegistration:true});
  }
  onSubmitForm = async (event)=>{
    event.preventDefault();
    if(this.state.isRegistration){
      const res = await request("POST","/register/user",{username:this.state.username,password:this.state.password});
      if(res.headers.status === 200){
          window.location.replace("/");
      }else
        alert("an error occur");
    
    }
    else{
      try {
        const res = await request("POST","/user/login",{username:this.state.username,password:this.state.password})
        console.log(res);
        if(res.status === 200){
          const refreshToken = res.data.refreshToken
          const accessToken = res.data.accessToken
          saveAccessToken(accessToken)
          saveRefreshToken(refreshToken)
          window.location.replace("/response")
        }
        else{
          alert(res.data)
        }
      }catch(e){
       if(e.response.status === 401)
         alert(e.response.data.message);
       
      }

    }
  }
  render() {
    return (
      <div className='m-form mx-auto' >
        <div className="my-3">
        <div className="w-100 text-center">
          <button className="mx-3 btn btn-outline-primary" onClick={this.onLoginClick}>Login</button >
          <button className="btn btn-outline-success" onClick={this.onRegistrationClick}>Registration</button >
        </div>
        <form className="form" method='POST' onSubmit={this.onSubmitForm}>
          
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="firstname" onChange={(e)=>{this.onChangeHandler(e)}}  placeholder='first name' />}
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="lastname"  onChange={(e)=>{this.onChangeHandler(e)}}  placeholder='last name' />}
          <input className='mt-2 form-control' type="login" name="username" onChange={(e)=>{this.onChangeHandler(e)}} placeholder='username' />
          <input className='mt-2 form-control' type="password" name="password" onChange={(e)=>{this.onChangeHandler(e)}} placeholder='password' />
          <input type="submit" className='mt-2 btn btn-primary' value="submit" />
        </form>
        </div>
        
      </div>
    )
  }
}
