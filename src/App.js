import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Filmy from './Filmy';
import Layout from './components/Layout';
import NavBar from './components/Navbar';
import Addfilm from './Addfilm';
import Seanse from './Seanse';
import Editfilm from './Editfilm';
import Errorpage from './Errorpage';
import Addseans from './Addseans';
import Editseans from './Editseans';
import Addticket from './Addticket';
import Statystyki from './Statystyki';


function App(){
  return (
    <React.Fragment>
    <NavBar/>
    <Layout>
    <Router>
      <Routes>
          <Route path="/" element = {<Home/>}/>
          <Route path="/filmy" element={<Filmy/>} />
          <Route path="/Addfilm" element={<Addfilm/>} />
          <Route path="/seanse" element={<Seanse/>} />
          <Route path="/filmy/edytuj/:id" element = {<Editfilm/>}/>
          <Route path="/statystyki" element={<Statystyki/>} />
          <Route path="/filmy/dodajseans/:id" element = {<Addseans/>} />
          <Route path="/seanse/edytuj/:id" element = {<Editseans/>}/>
          <Route path="/seanse/kupbilet/:id" element = {<Addticket/>}/>
          <Route path="*" element = {<Errorpage/>} />
      </Routes>
    </Router>
    </Layout>
    </React.Fragment>
  );
}

export default App;
 