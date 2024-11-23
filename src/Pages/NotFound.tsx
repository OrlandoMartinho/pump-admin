// ./Pages/NotFound.tsx
import ilustration from '../assets/oops-404-error-with-a-broken-robot-animate (2).svg';
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; 
import { useNavigate } from "react-router-dom";  // Importando o hook useNavigate

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();  // Criando o hook navigate para redirecionamento

  useEffect(() => {
    // Simula o carregamento inicial da página
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos para exibir o loader
    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src={ilustration} // Caminho da imagem
        alt="Página Não Encontrada"
        className="max-w-96 max-h-full"
      />
      <button
        onClick={() => navigate("/")} // Redireciona para a página inicial
        className="mt-0 px-20 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
      >
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default NotFound;
