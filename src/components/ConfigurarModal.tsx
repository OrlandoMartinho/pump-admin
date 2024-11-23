import React, { useState } from 'react';

interface ConfigurarModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId: string;
  services: string[];
  onSave: (updatedServices: string[]) => void;
}

const ConfigurarModal: React.FC<ConfigurarModalProps> = ({ isOpen, onClose, stationId, services, onSave }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(services);

  const toggleService = (service: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleSave = () => {
    onSave(selectedServices);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <h2 className="text-xl font-bold mb-4">Configuração de Serviços</h2>
          <div className="space-y-2">
            {['Cafeteria', 'Restroom', 'Posto de Gasolina', 'Diesel'].map((service) => (
              <div key={service} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="mr-2"
                />
                <span>{service}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-4">
            <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfigurarModal;
