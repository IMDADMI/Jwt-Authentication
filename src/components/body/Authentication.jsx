import React, { Component } from 'react'

export default class Authentication extends Component {
  constructor(props){
    super(props);
    this.state = {
      isRegistration:false,
    }
  }
  onLoginClick(){
    
  }
  onRegistrationClick(){

  }
  render() {
    return (
      <div className='m-form mx-auto' >
        <div className="my-3">
        <div className="w-100 text-center">
          <button className="mx-3 btn btn-outline-primary" onClick={this.onLoginClick}>Login</button >
          <button className="btn btn-outline-success" onClick={this.onRegistrationClick}>Registration</button >
        </div>
        <form className="form" method='POST'>
          
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="first name" id="" placeholder='first name' />}
          {this.state.isRegistration && <input className='mt-2 form-control' type="text" name="last name" id="" placeholder='last name' />}
          
          <input className='mt-2 form-control' type="text" name="username" id="" placeholder='username' />
          <input className='mt-2 form-control' type="password" name="password" id="" placeholder='password' />
          <input type="submit" className='mt-2 btn btn-primary' value="submit" />
        </form>
        </div>
      </div>
    )
  }
}
