import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBell, FaTimes, FaEllipsisV } from "react-icons/fa";

interface Notification {
  id: number;
  title: string;
  message: string;
  read: boolean;
  date: Date;
  icon?: string; // Adicionar ícone ou imagem associado à notificação
}

type NotificationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onDelete,
}) => {
  if (!isOpen) return null;

  const [showOptions, setShowOptions] = useState<number | null>(null);

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.read) onMarkAsRead(notification.id);
    });
  };

  const handleToggleOptions = (id: number) => {
    // Alterna a exibição do menu de opções, mas garante que só um esteja aberto
    setShowOptions((prev) => (prev === id ? null : id));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50">
      <motion.div
        className="bg-white rounded-lg shadow-lg w-96 p-6 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <FaBell size={20} className="text-gray-700" />
            <h2 className="text-lg font-bold">Notificações</h2>
            <span className="bg-purple-600 text-white text-xs font-semibold rounded-full px-2 py-0.5">
              {notifications.filter((n) => !n.read).length}
            </span>
          </div>
          <button
            className="absolute top-8 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Lista de Notificações */}
        <div className="max-h-96 overflow-y-auto mb-4 overflow-x-hidden">
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`flex items-center p-3 rounded-lg ${
                    notification.read ? "bg-gray-100" : "bg-purple-50"
                  }`}
                >
                  {/* Ícone ou Imagem */}
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {notification.icon ? (
                      <img
                        src={notification.icon}
                        alt="Ícone da Notificação"
                        className="w-5 h-auto object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xl font-bold">
                        {notification.title.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Conteúdo da Notificação */}
                  <div className="ml-4 flex-grow">
                    <h3
                      className={`font-bold text-sm ${
                        notification.read ? "text-gray-500" : "text-black"
                      }`}
                    >
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-600 break-words">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.date.toLocaleString()}
                    </span>
                  </div>

                  {/* Opções */}
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleToggleOptions(notification.id)}
                    >
                      <FaEllipsisV size={16} />
                    </button>
                    {showOptions === notification.id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-28 z-10">
                        {!notification.read && (
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-blue-50"
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            Marcar como lida
                          </button>
                        )}
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          onClick={() => onDelete(notification.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">Você não tem novas notificações.</p>
          )}
        </div>

        {/* Rodapé */}
        <div className="mt-4 flex justify-end">
          <button
            className="text-blue-500 hover:text-blue-700 text-sm"
            onClick={handleMarkAllAsRead}
          >
            Marcar todas como lidas
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationModal;
