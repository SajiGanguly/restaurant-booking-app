import Homepage from "./Pages/Homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
