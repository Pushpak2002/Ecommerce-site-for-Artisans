import './App.css';
import { Home_page } from './MyComponents/Home_page';
// import { List } from './MyComponents/List';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './MyComponents/Profile';
import {Cart} from './MyComponents/Cart';
import {Product_List} from './MyComponents/Product_List';



function App() {
  return (
    <>
    {/* <NavBar title="HandCraft" /> */}
      <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/Product_List/" element={<Product_List />} /> 
        {/* <Route path="/List/:id" element={<List />} /> */}
        <Route path="/profile/" element={<Profile />} />
        <Route path="/Cart/" element={<Cart />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
