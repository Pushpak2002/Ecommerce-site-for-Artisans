import './App.css';
import { Home_page } from './MyComponents/Home_page';
import { List } from './MyComponents/List';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/product/:id" element={<List />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
