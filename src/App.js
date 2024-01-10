import { BrowserRouter, Routes, Route  } from "react-router-dom";
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';
import Home from './pages/common/Home';
import Comanyhome from "./pages/company/Companyhome";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/company" element={<Comanyhome/>} />
    </Routes>
</BrowserRouter > 
}

export default App;
