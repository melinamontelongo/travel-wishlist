
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Navbar } from './components/Navbar';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
//  Pages
import { Index } from './pages/Index';
import { About } from './pages/About';
import { Start } from './pages/Start';
import { Explore } from './pages/Explore';
import { useEffect } from 'react';

import { backgroundConfig } from './utils/backgroundConfig';

const App = () => {

  const location = useLocation();
  //  Change bg image depending on path
  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundConfig[location.pathname]})`
  }, [location]);

  return (
    <div className="App">
      <Navbar />
      <ToastContainer position="top-center"
        closeOnClick
        theme="dark" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/start" element={<Start />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App;
