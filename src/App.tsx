import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound"; // Importe a página NotFound

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota para a página de login */}
        <Route path="/" element={<Login />} />

        {/* Rota para a página inicial */}
        <Route path="/home" element={<Home />} />

        {/* Rota para a página Not Found */}
        <Route path="*" element={<NotFound />} /> {/* A rota '*' pega qualquer URL que não corresponda a outras rotas */}
      </Routes>
    </Router>
  );
}

export default App;
