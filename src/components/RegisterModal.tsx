import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface StationData {
  id: string;
  services: string;
  location: string;
  hours: string;
  products: string;
  description: string;
  coordinates: string;
}

interface CadastroModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (station: StationData) => void;
}

const CadastroModal: React.FC<CadastroModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [stationData, setStationData] = useState<StationData>({
    id: '',
    services: '',
    location: '',
    hours: '',
    products: '',
    description: '',
    coordinates: '',
  });

  const [isUsingGps, setIsUsingGps] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onRegister(stationData);
    setStationData({
      id: '',
      services: '',
      location: '',
      hours: '',
      products: '',
      description: '',
      coordinates: '',
    });
    onClose();
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStationData((prev) => ({
            ...prev,
            coordinates: `${latitude}, ${longitude}`,
          }));
          setIsUsingGps(true);
        },
        (error) => {
          // Mensagem personalizada dependendo do erro de geolocalização
          if (error.code === error.PERMISSION_DENIED) {
            alert('Permissão para acessar a localização foi negada.');
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            alert('Não foi possível obter a localização, tente novamente.');
          } else if (error.code === error.TIMEOUT) {
            alert('Tempo de espera para obter a localização expirou.');
          } else {
            alert('Erro desconhecido ao tentar acessar a localização.');
          }
        },
        {
          enableHighAccuracy: true, // Habilita a precisão alta
          timeout: 5000, // Tempo máximo para obter a localização
          maximumAge: 0, // Garante que a localização é a mais recente
        }
      );
    } else {
      alert('Geolocalização não é suportada neste navegador.');
    }
  };

  const handleGpsToggle = () => {
    if (isUsingGps) {
      setIsUsingGps(false);
      setStationData((prev) => ({ ...prev, coordinates: '' }));
    } else {
      getLocation();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-8 w-96 max-h-[80vh] overflow-y-auto shadow-lg" // max-h-[80vh] para definir a altura máxima e overflow-y-auto para scroll
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Register New Station</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-gray-700" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">ID</label>
            <input
              type="text"
              name="id"
              value={stationData.id}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Services</label>
            <input
              type="text"
              name="services"
              value={stationData.services}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={stationData.location}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Hours</label>
            <input
              type="text"
              name="hours"
              value={stationData.hours}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Products</label>
            <input
              type="text"
              name="products"
              value={stationData.products}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={stationData.description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Coordinates</label>
            <div className="flex justify-between items-center">
              <input
                type="text"
                name="coordinates"
                value={stationData.coordinates}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <button
                type="button"
                onClick={handleGpsToggle}
                className="ml-2 text-blue-500"
              >
                {isUsingGps ? 'Edit' : 'Use GPS'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CadastroModal;
