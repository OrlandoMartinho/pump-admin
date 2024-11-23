import { FaEnvelope, FaLock, FaUser } from "react-icons/fa"; // Ícones do react-icons
import ilustration from "../assets/fuel-station-animate .svg";
import { useState, useEffect } from "react";
import Loader from "../components/Loader"; 
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // Simula o carregamento inicial da página
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 3 segundos para exibir o loader
    return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado esquerdo: Imagem e texto (escondido no mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-green-500 flex-col items-center justify-center text-white px-6 py-10 animate-slide-left delay-200">
        <img
          src={ilustration}
          alt="Fuel Station"
          className="w-3/4 md:w-2/3 mb-8 animate-slide-down delay-300"
        />
        <p className="text-center text-sm md:text-lg animate-slide-up delay-400">
          Bem-vindo ao Painel Administrativo. Acesse com suas credenciais para
          gerenciar dados, monitorar atividades e garantir a eficiência e
          segurança do sistema. Sua liderança é essencial para o sucesso da
          nossa missão.
        </p>
      </div>

      {/* Lado direito: Formulário de login */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-8 animate-slide-down delay-100">
          <div className="bg-green-500 text-white p-4 rounded-full">
            <FaUser className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-semibold text-green-500 mt-4">Log in</h2>
        </div>

        <form className="w-full max-w-sm space-y-6" onSubmit={handleLogin}>
          {/* Campo de E-mail */}
          <div className="animate-slide-up delay-200">
            <label htmlFor="email" className="block text-gray-700">
              E-mail
            </label>
            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full border border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite seu e-mail"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <FaEnvelope className="text-green-500" />
              </div>
            </div>
          </div>

          {/* Campo de Senha */}
          <div className="animate-slide-down delay-300">
            <label htmlFor="password" className="block text-gray-700">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                type="password"
                id="password"
                className="w-full border border-green-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite sua senha"
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <FaLock className="text-green-500" />
              </div>
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="text-right animate-slide-up delay-400">
            <a href="#" className="text-sm text-green-500 hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão de Login */}
          <div className="animate-slide-up delay-500">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
              onClick={() => navigate('/')}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
