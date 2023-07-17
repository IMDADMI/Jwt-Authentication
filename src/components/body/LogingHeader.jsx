import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class LogingHeader extends Component {
  render() {
    return (
    <div className='w-25 mx-auto '>
        <div className="my-3 text-center">
          <NavLink to='authentication' className="mx-3 btn btn-primary">Login</NavLink>
          <NavLink to='/' className="btn btn-dark">Logout</NavLink >
        </div>
      </div>
    )
  }
}
