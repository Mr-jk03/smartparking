import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';
import Login from './components/LoginRegister/Login/Login';
import Register from './components/LoginRegister/Register/Register';
import Cart from './components/Cart/Cart';
import { useEffect, useState } from 'react';
import Account from './components/Account/Account';
import Ticketdetailsbuyed from './components/Body/BodyCon/Ticketdetailsbuyed/Ticketdetailsbuyed';
import InoutHistory from './components/Body/BodyCon/InoutHistory/InoutHistory';
import ListQR from './components/Body/BodyCon/ListQR/ListQR';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() =>{
    const saveToken = localStorage.getItem('token');
    if(saveToken){
      setIsLoggedIn(true);
      setToken(saveToken);
    }
  }, [])

  const handleLogin = (receivedToken) => {
    setIsLoggedIn(true);
    setToken(receivedToken);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('token');
  };


  return (
    <>
      {isLoggedIn && <Header />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path='/' element={<Body onLogOut = {handleLogOut}/>} />
            <Route path='/detail/:vehicle/:id' element={<Body onLogOut = {handleLogOut}/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/account' element={<Account />}/>
            <Route path='/ticketdetailbuyed' element={<Ticketdetailsbuyed />} />
            <Route path='/inouthistory' element={<InoutHistory />}/>
            <Route path='/listqr' element={<ListQR />}/>
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
