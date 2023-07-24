import { Button } from 'bootstrap'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import {destroyTokens} from '../../helper/helper'
export default class LogingHeader extends Component {
  removeTokens = ()=>{
    destroyTokens();
    window.location.replace("/"); 
  } 
  render() {
   
    return (
    <div className='w-25 mx-auto '>
        <div className="my-3 text-center">
          <NavLink to='authentication' className="mx-3 btn btn-primary">Login</NavLink>
          <button className="btn btn-dark" onClick={this.removeTokens}>Logout</button>
        </div>
      </div>
    )
  }
}
