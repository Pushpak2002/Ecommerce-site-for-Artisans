import './App.css';
import { Home_page } from './MyComponents/Home_page';
import { List } from './MyComponents/List';
import { NavBar } from './MyComponents/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './MyComponents/Profile';


function App() {
  return (
    <>
    {/* <NavBar title="HandCraft" /> */}
      <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/List/:id" element={<List />} />
        <Route path="/profile/" element={<Profile />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
