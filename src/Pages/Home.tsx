import React, { useState, useEffect } from "react";
import { FaHome, FaUsers, FaBullhorn, FaCog, FaSignOutAlt, FaBell } from "react-icons/fa";
import logo from "../assets/log.svg";
import Loader from "../components/Loader"; // Ajuste o caminho conforme necessário
import { Bar, Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion"; 
import NotificationModal from "../components/NotificationsModal";
import NotificationIcon from "../assets/icons8_google_alerts.svg"
 // Ajuste o caminho conforme necessário

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartData,
} from "chart.js";
import { TooltipItem } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Estado para controlar a visibilidade do modal
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Função para abrir o modal
  const openModal = () => {
    setIsNotificationModalOpen(true);
  };

  interface Notification {
    id: number;
    title: string;
    message: string;
    read: boolean;
    date: Date;
    icon?: string; // Adicionar ícone ou imagem associado à notificação
  }
  

  // Função para fechar o modal
  const closeModal = () => {
    setIsNotificationModalOpen(false);
  };
  const notifications: Notification[] = [
    {
      id: 1,
      icon: NotificationIcon,
      message: "Você tem uma nova mensagem.",
      read: false,
      date: new Date("2024-11-21T10:30:00"),
      title: ""
    },
    {
      id: 2,
      icon: NotificationIcon,
      message: "Seu pedido foi enviado.",
      read: true,
      date: new Date("2024-11-20T15:15:00"),
      title: ""
    },
    {
      id: 3,
      title:"Alguem",
      icon: NotificationIcon,
      message: "Seu pedido foi enviado.",
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 4,
      title:"Alguem",
      icon: NotificationIcon,
      message: "Seu pedido foi enviado.",
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 5,
      title:"Alguem",
      icon: NotificationIcon,
      message: "Seu pedido foi enviado.",
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 6,
      title:"Alguem",
      icon: NotificationIcon,
      message: "Seu pedido foi enviado.",
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 7,
      message: "Seu pedido foi enviado.",
      icon: NotificationIcon,
      title:"Alguem",
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 8,
      message: "Seu pedido foi enviado.",
      title:"Alguem",
      icon: NotificationIcon,
      read: true,
      date: new Date("2024-11-20T15:15:00"), // Exemplo de data
    },
    {
      id: 9,
      message: "Lembre-se de revisar o seu relatório.",
      title:"Alguem",
      icon: NotificationIcon,
      read: false,
      date: new Date("2024-11-22T08:00:00"), // Exemplo de data
    },
    {
      id: 10,
      message: "A atualização do sistema está disponível.",
      title:"Alguem",
      icon: NotificationIcon,
      read: true,
      date: new Date("2024-11-19T17:45:00"), // Exemplo de data
    },
  ];
  
  const markAsRead = (id: number) => {
    // Lógica para marcar a notificação como lida
    console.log(`Marcar notificação ${id} como lida`);
  };

  const deleteNotification = (id: number) => {
    // Lógica para excluir a notificação
    console.log(`Excluir notificação ${id}`);
  };




  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos para exibir o loader
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  // Dados para o gráfico de barras
  const barData: ChartData<"bar"> = {
    labels: [
      "Jan",
      "Feve",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    datasets: [
      {
        label: "Total",
        data: [100, 150, 120, 200, 170, 140, 130, 180, 210, 190, 220, 250],
        backgroundColor: "#4A90E2",
        borderRadius: 10, // Bordas arredondadas
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"bar">) => {
            return `${tooltipItem.raw} Total`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
          autoSkip: false,
          maxRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  // Dados para o gráfico de rosca
  const doughnutData: ChartData<"doughnut"> = {
    labels: ["Usuários", "Afiliados", "Comunicados"],
    datasets: [
      {
        data: [50, 30, 20],
        backgroundColor: ["#FF9933", "#4CAF50", "#2196F3"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: TooltipItem<"doughnut">) => {
            return `${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="flex h-screen">
      {/* Menu de Navegação */}
      <motion.nav
        className="bg-gradient-to-b from-green-400 to-green-500 text-white w-20 md:w-48 flex flex-col items-center py-6 fixed h-full border-r border-gray-300"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <img src={logo} alt="Logo" className="h-16 w-16 md:h-20 md:w-20 border-white" />
        </div>

        {/* Menu de Navegação */}
        <div className="flex flex-col flex-1 gap-6">
          <motion.button
            className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <FaHome className="text-3xl md:text-2xl mr-3" />
            <span className="hidden md:block text-sm">Home</span>
          </motion.button>

          <motion.button
            className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <FaUsers className="text-3xl md:text-2xl mr-3" />
            <span className="hidden md:block text-sm">Afiliados</span>
          </motion.button>

          <motion.button
            className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <FaBullhorn className="text-3xl md:text-2xl mr-3" />
            <span className="hidden md:block text-sm">Comunicados</span>
          </motion.button>

          <motion.button
            className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <FaCog className="text-3xl md:text-2xl mr-3" />
            <span className="hidden md:block text-sm">Configurações</span>
          </motion.button>

          <motion.button
            className="flex items-center justify-start p-3 mt-auto w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <FaSignOutAlt className="text-3xl md:text-2xl mr-2" />
            <span className="hidden md:block text-sm">Sair</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-20 md:ml-48 bg-gray-100">
        {/* Cabeçalho com ícones */}
        <motion.header
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Estado Geral</h1>
          <div className="flex items-center gap-4">
           
           
           
           
            {/* Ícone de Notificações */}
            <button
              className="text-green-500 text-2xl hover:text-green-700"
              onClick={openModal}
            >
              <FaBell />
           </button>
            {/* Ícone de Configurações */}
            <button className="text-green-500 text-2xl hover:text-green-700">
              <FaCog />
            </button>
          </div>
        </motion.header>

         {/* Main Dashboard Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card de Afiliados */}
          <motion.div
            className="bg-white shadow-lg rounded-lg flex flex-col items-center p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }} // Acelerando a animação
          >
            <FaUsers className="text-green-500 text-3xl mb-4" />
            <h2 className="text-xl font-semibold">Afiliados</h2>
            <p className="text-3xl font-bold">50</p>
          </motion.div>

          {/* Card de Comunicados */}
          <motion.div
            className="bg-white shadow-lg rounded-lg flex flex-col items-center p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }} // Acelerando a animação
          >
            <FaBullhorn className="text-green-500 text-3xl mb-4" />
            <h2 className="text-xl font-semibold">Comunicados</h2>
            <p className="text-3xl font-bold">100</p>
          </motion.div>

          {/* Card de Usuários */}
          <motion.div
            className="bg-white shadow-lg rounded-lg flex flex-col items-center p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }} // Acelerando a animação
          >
            <FaUsers className="text-green-500 text-3xl mb-4" />
            <h2 className="text-xl font-semibold">Usuários</h2>
            <p className="text-3xl font-bold">100</p>
          </motion.div>
        </div>

        {/* Card com os Gráficos */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 h-96">
          {/* Card do gráfico de rosca */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }} // Acelerando a animação
          >
            <h2 className="text-xl font-semibold text-center mb-6">Distribuição</h2>
            <div className="flex justify-center items-center w-full flex-grow">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </motion.div>

          {/* Card do gráfico de barras */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.3 }} // Acelerando a animação
          >
            <h2 className="text-xl font-semibold text-center mb-6">Desempenho Anual</h2>
            <div className="flex justify-center items-center w-full flex-grow">
              <div className="overflow-x-scroll w-full">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal de Notificações */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={closeModal}  // Agora está correto
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onDelete={deleteNotification}
      />
    </div>
  );
};

export default Home;
