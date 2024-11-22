import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { FaCog, FaBell, FaEdit, FaTrash, FaBars } from "react-icons/fa";
import NotificationModal from "../components/NotificationsModal";

const FuelStations = () => {
  const stations = [
    {
      id: "01",
      services: "Cafeteria, Restroom",
      location: "Luanda, Benfica",
      hours: "24h",
      products: "Gasoline, Diesel",
      coordinates: "78,488;44,4848",
      description: "Well-located station offering various essential services.",
      status: "Available",
    },
    {
      id: "02",
      services: "Cafeteria, Restroom",
      location: "Luanda, Talatona",
      hours: "24h",
      products: "Gasoline, Diesel",
      coordinates: "78,488;44,4848",
      description: "Conveniently located with good amenities.",
      status: "Available",
    },
    // Mais estações podem ser adicionadas aqui
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openModal = () => {
    setIsNotificationModalOpen(true);
  };

  const closeModal = () => {
    setIsNotificationModalOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredStations = stations.filter(
    (station) =>
      station.services.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.products.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 ml-20 md:ml-48 bg-gray-100">
        <motion.header
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {/* Ícone do menu hambúrguer */}
          <button
            className="text-2xl text-green-500 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FaBars />
          </button>

          {/* Título do cabeçalho, que é ocultado em dispositivos móveis */}
          <h1 className="text-2xl font-bold hidden md:block">Postos de Combustível</h1>

          {/* Menu de navegação que se torna visível apenas quando o menu hambúrguer é aberto */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex items-center gap-4`}
          >
            {/* Apenas mostra os ícones em dispositivos maiores */}
            <button
              className="text-green-500 text-2xl hover:text-green-700"
              onClick={openModal}
            >
              <FaBell />
            </button>
            <button className="text-green-500 text-2xl hover:text-green-700">
              <FaCog />
            </button>
          </div>
        </motion.header>

        {/* Caixa de pesquisa visível em dispositivos móveis e centralizada */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden w-full`}
        >
          <input
            type="text"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-green-300 w-full"
          />
        </div>

        <div className="overflow-hidden rounded-lg shadow-md bg-white mt-12">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group sticky top-0 bg-green-500 shadow-md">
              <tr className="border border-gray-300 md:border-none block md:table-row">
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Id</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Services</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Location</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Hours</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Products</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Description</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {filteredStations.map((station, index) => (
                <tr
                  key={index}
                  className="border border-gray-300 md:border-none block md:table-row bg-white md:hover:bg-green-100 shadow-sm md:shadow-none md:mb-0 mb-4 rounded md:rounded-none"
                >
                  <td className="p-4 block md:table-cell font-bold md:font-normal">
                    {station.id}
                  </td>
                  <td className="p-4 block md:table-cell">{station.services}</td>
                  <td className="p-4 block md:table-cell">{station.location}</td>
                  <td className="p-4 block md:table-cell">{station.hours}</td>
                  <td className="p-4 block md:table-cell">{station.products}</td>
                  <td className="p-4 block md:table-cell">{station.description}</td>
                  <td className="p-4 block md:table-cell text-center">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={closeModal}
        notifications={[]}
        onMarkAsRead={() => {}}
        onDelete={() => {}}
      />
    </div>
  );
};

export default FuelStations;
