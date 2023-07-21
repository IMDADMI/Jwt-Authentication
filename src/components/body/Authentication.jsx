import React, { Component } from 'react'
import { NavLink, redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
export default class Authentication extends Component {
  constructor(props){
    const refreshToken = Cookies.get('refresh-token');
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
  

  onLoginClick = ()=>{
    this.setState({isRegistration:false});
  }
  onRegistrationClick= ()=>{
    this.setState({isRegistration:true});
  }
  formSubmitted = async (event)=>{
    event.preventDefault();
    if(this.state.isRegistration){
      const credentials = {username:this.state.username,password:this.state.password}
      const res = await axios.post("http://localhost:8080/register/user",credentials);
      if(res.status === 200)
        window.location.replace("/");
    }else{
      try{
        const credentials = {username:this.state.username,password:this.state.password}
        const res = await axios.post("http://localhost:8080/user/login",credentials); 
        const refreshToken = res.data.refreshToken;
        const accessToken = res.data.accessToken;
        Cookies.set('access-token', accessToken, { expires: 60*5});//5min
        Cookies.set('refresh-token', refreshToken, { expires: 30*(60*60*24)});//30days

        window.location.replace("/response");
      }catch(e){
        if(e.response.status === 403){
          alert('invalid credentials');
          this.setState({username:'',password:''});
        }
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
        <form className="form" method='POST' onSubmit={this.formSubmitted}>
          
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="first name" value={this.state.firstname} onChange={(e)=>{this.setState({firstname:e.target.value})}} id="" placeholder='first name' />}
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="last name"  value={this.state.lastname} onChange={(e)=>{this.setState({lastname:e.target.value})}} id="" placeholder='last name' />}
          
          <input className='mt-2 form-control' type="text" name="username"  value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} id="" placeholder='username' />
          <input className='mt-2 form-control' type="password" name="password"  value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} id="" placeholder='password' />
          <input type="submit" className='mt-2 btn btn-primary' value="submit" />
        </form>
        {/* <NavLink to='/response' className='btn btn-danger'>test</NavLink> */}
        </div>
      </div>
    )
  }
}
