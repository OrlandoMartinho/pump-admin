import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { FaCog, FaBell, FaPlus, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import NotificationModal from "../components/NotificationsModal";
import CadastroModal from '../components/RegisterModal';
import ConfigurarModal from '../components/ConfigurarModal';

const FuelStations = () => {
  const [stations, setStations] = useState([
    {
      id: "01",
      services: ["Cafeteria", "Restroom"],
      location: "Luanda, Benfica",
      hours: "24h",
      products: "Gasoline, Diesel",
      coordinates: "78,488;44,4848",
      description: "Well-located station offering various essential services.",
      status: "Available",
    },
    {
      id: "02",
      services: ["Cafeteria", "Restroom"],
      location: "Luanda, Talatona",
      hours: "24h",
      products: "Gasoline, Diesel",
      coordinates: "78,488;44,4848",
      description: "Conveniently located with good amenities.",
      status: "Available",
    },
  ]);

  const [isCadastroModalOpen, setIsCadastroModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isConfigurarModalOpen, setIsConfigurarModalOpen] = useState(false);
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  const openConfigurarModal = (stationId: string, services: string[]) => {
    setSelectedStationId(stationId);
    setIsConfigurarModalOpen(true);
  };

  const closeConfigurarModal = () => {
    setIsConfigurarModalOpen(false);
    setSelectedStationId(null);
  };

  const handleSaveServices = (updatedServices: string[]) => {
    setStations((prevStations) =>
      prevStations.map((station) =>
        station.id === selectedStationId ? { ...station, services: updatedServices } : station
      )
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredStations = stations.filter(
    (station) =>
      station.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
      <div className="flex-1 p-6 ml-20 md:ml-48 bg-gray-100 relative">
        <motion.header
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold">Postos de Combustíveis</h1>
          <div className="flex items-center gap-4">
            <button
              className="text-green-500 text-2xl hover:text-green-700"
              onClick={() => setIsNotificationModalOpen(true)}
            >
              <FaBell />
            </button>
            <button
              className="text-green-500 text-2xl hover:text-green-700"
              onClick={() => setIsConfigurarModalOpen(true)}
            >
              <FaCog />
            </button>
          </div>
        </motion.header>

        {/* Área para Barra de Pesquisa e Botões */}
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <motion.button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 h-10"
              onClick={() => setIsCadastroModalOpen(true)}
            >
              <FaPlus />
              <span className="hidden md:block">Registrar</span>
            </motion.button>

            <motion.button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2 h-10"
              onClick={() => setIsConfigurarModalOpen(true)}
            >
              <FaCog />
              <span className="hidden md:block">Configurar</span>
            </motion.button>
          </div>

          {/* Barra de Pesquisa */}
          <motion.div
            className="flex items-center bg-white border border-gray-300 rounded px-2 w-72"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 focus:outline-none focus:ring focus:ring-green-300 w-full"
            />
          </motion.div>
        </motion.div>

        {/* Tabela de Postos */}
        <motion.div
          className="overflow-hidden rounded-sm shadow-md bg-white mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group sticky top-0 bg-green-500 shadow-md">
              <tr className="border border-gray-300 md:border-none block md:table-row">
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">ID</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Serviços</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Localização</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Horários</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Produtos</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Descrição</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Coordenadas</th>
                <th className="bg-green-500 text-white p-4 text-left block md:table-cell">Ações</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {filteredStations.map((station, index) => (
                <motion.tr
                  key={index}
                  className="border border-gray-300 md:border-none block md:table-row bg-white md:hover:bg-green-100 shadow-sm md:shadow-none md:mb-0 mb-4 rounded-sm md:rounded-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.3 }}
                >
                  <td className="p-4 block md:table-cell font-bold md:font-normal">
                    {station.id}
                  </td>
                  <td className="p-4 block md:table-cell">{station.services.join(", ")}</td>
                  <td className="p-4 block md:table-cell">{station.location}</td>
                  <td className="p-4 block md:table-cell">{station.hours}</td>
                  <td className="p-4 block md:table-cell">{station.products}</td>
                  <td className="p-4 block md:table-cell">{station.description}</td>
                  <td className="p-4 block md:table-cell">{station.coordinates}</td>
                  <td className="p-4 block md:table-cell text-center">
                    <button className="text-black mr-2">
                      <FaEdit />
                    </button>
                    <button className="text-black">
                      <FaTrash />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={[]}
        onMarkAsRead={() => {}}
        onDelete={() => {}}
      />

      <CadastroModal
        isOpen={isCadastroModalOpen}
        onClose={() => setIsCadastroModalOpen(false)}
        onRegister={() => {}}
      />

      <ConfigurarModal
        isOpen={isConfigurarModalOpen}
        onClose={closeConfigurarModal}
        stationId={selectedStationId || ""}
        services={stations.find(station => station.id === selectedStationId)?.services || []}
        onSave={handleSaveServices}
      />
    </div>
  );
};

export default FuelStations;
