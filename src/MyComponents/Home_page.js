import React from 'react'
import {NavBar} from './NavBar'
import {Home_main} from './Components/Home_main'
import './CSS/Homee.css'

export const Home_page = () => {
  return (
    <div>
        <NavBar title = "HandCraft"/>
        <Home_main/>
    </div>
  )
}
