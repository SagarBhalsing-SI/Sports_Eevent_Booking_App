
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import EmployeeLogin from './EmployeeLogin';
import HRLogin from './HRLogin';
import SportsSelection from './EmployeeComponent/SportsSelection'; // Import the SportsSelection component
import AddVenue from './AddVenue';
import Dashboard from './Dashboard';
import SportsInventorySelection from './SportsInventorySelection';
import BookingRequests from './BookingRequests';

function App() {
  

  

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/sports-selection" element={<SportsSelection/>} />
          <Route path="/hr-login" element={<HRLogin />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-venue" element={<AddVenue />} />
          <Route path="/sports-inventory" element={<SportsInventorySelection />} />
          <Route path="/booking-requests" element={<BookingRequests />} />
          
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
