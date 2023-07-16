import React, { Component } from 'react'

export default class LogingHeader extends Component {
  render() {
    return (
    <div className='w-25 mx-auto '>
        <div className="my-3 text-center">
          <button className="mx-3 btn btn-primary">Login</button >
          <button className="btn btn-dark">Logout</button >
        </div>
      </div>
    )
  }
}
