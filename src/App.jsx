import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/headers/Header';
import Welcome from './components/body/Welcome';
import LogingHeader from './components/body/LogingHeader.JSX';
import Authentication from './components/body/Authentication';
function App() {

  return (
    <>
      <Header/>
      <LogingHeader/>
      {/* <Welcome/> */}
    <Authentication/>
    </>
  )
}

export default App
