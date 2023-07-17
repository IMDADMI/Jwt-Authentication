import React from 'react'
import Header from './headers/Header'
import LoginHeader from '../components/body/LogingHeader'
import { Outlet } from 'react-router-dom'
export default function Headers() {
  return (
    <>
      <Header/>
      <LoginHeader/>
      <Outlet/>
    </>
  )
}
