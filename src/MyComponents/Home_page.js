import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {List} from './List'
import {NavBar} from './NavBar'
import {Home_main} from './Components/Home_main'
import './CSS/Homee.css'

export const Home_page = () => {
  return (
    <div>
      <NavBar title="HandCraft" />
      <Home_main />
    </div>
  );
};