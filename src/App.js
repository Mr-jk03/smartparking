import './App.css';
import { Routes, Route} from 'react-router-dom';
import Header from './components/Headers/Header';
import Footer from './components/Footer/Footer';
import Body from './components/Body/Body';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path='/' element={<Body />}/>
        </Routes>
      <Footer />
    </>
  );
}

export default App;
