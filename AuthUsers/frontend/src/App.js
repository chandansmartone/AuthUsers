import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Account from './components/account';
import Login from './components/Login';
import NavBar from './components/NavBar';
function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>

        <Route path="/signup" element={<SignUp/>}/>
        {isUserSignedIn && <Route path='/account' element={<Account />} />}

      </Routes>
    </div>
  );
}

export default App;
