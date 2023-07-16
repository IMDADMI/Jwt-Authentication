import React from 'react'
import react from '../../assets/react.svg'
import jwt from '../../assets/pic_logo.svg'
import './header.css'
export default function Header() {
  return (
    <div className='bg-dark text-light p-3 text-center'>
        <img src={react} alt="" className='logos react'/>
        <img src={jwt} alt="" className='logos'/>
        <h1>Front end Authentication using JWT</h1>
    </div>
  )
}
