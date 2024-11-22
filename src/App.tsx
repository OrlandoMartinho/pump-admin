import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/" element={<Login />} />

        {/* Rota para a página inicial */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
