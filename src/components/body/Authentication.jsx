import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
export default class Authentication extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistration:false,
    }
  }
  onLoginClick = ()=>{
    this.setState({isRegistration:false});
  }
  onRegistrationClick= ()=>{
    this.setState({isRegistration:true});
  }
  formSubmitted = (event)=>{
    event.preventDefault();
    if(this.state.isRegistration){
      //send request to /registration to create a new user
    }else{
      //send Request to /login to fetch the token and store it in the cookie
      // Cookies.set('name', 'value', { expires: 7 });
      // const name = Cookies.get('name');
      // Cookies.remove('name');
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
          
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="first name" id="" placeholder='first name' />}
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="last name" id="" placeholder='last name' />}
          
          <input className='mt-2 form-control' type="text" name="username" id="" placeholder='username' />
          <input className='mt-2 form-control' type="password" name="password" id="" placeholder='password' />
          <input type="submit" className='mt-2 btn btn-primary' value="submit" />
        </form>
        <NavLink to='/response' className='btn btn-danger'>test</NavLink>
        </div>
      </div>
    )
  }
}
