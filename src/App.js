import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import Login from './components/LoginRegister/Login/Login';
import Register from './components/LoginRegister/Register/Register';
import Cart from './components/Cart/Cart';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true);


  const handleLogin = () =>{
    setIsLoggedIn(true);
  }
  const handleLogOut = () =>{
    setIsLoggedIn(false)
  }

  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Body onLogOut = {handleLogOut}/>} />
            <Route path='/detail/:id' element={<Body onLogOut = {handleLogOut}/>}/>
            <Route path='/cart' element={<Cart />}/>
          </>
        ) : (
          <>
            <Route path='/login' element={<Login onLogin={handleLogin} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {isLoggedIn && <Footer />}
    </>
  );
}

export default App;
