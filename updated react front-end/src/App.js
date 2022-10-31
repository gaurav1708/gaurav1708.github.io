import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Flights from './pages/flights';
import AvalibleFlights from './pages/avalibleFlights';
import MyFlights from './pages/myFlights';
import StaffLogin from './pages/staffLogin';
import PassengerList from './pages/passengerList';
import Profile from './pages/profile';
import AllFlights from './pages/allFlights';

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/flights' element={<Flights/>}/>
        <Route path='/avalibleFlights' element={<AvalibleFlights/>} /> 
        <Route path='/myFlights' element={<MyFlights/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/admin/staffLogin' element={<StaffLogin/>}/> 
        <Route path='/admin/flightList' element={<AllFlights/>}/>

        <Route path='/admin/passengerList' element={<PassengerList/>} />
        {/* /myFlights */}

      </Routes>
    </Router>
    {/* <Login/> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
