import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/headers/Header';
import Welcome from './components/body/Welcome';
import LogingHeader from './components/body/LogingHeader.JSX';
function App() {

  return (
    <>
      <Header/>
      <LogingHeader/>
      <Welcome/>
    </>
  )
}

export default App
