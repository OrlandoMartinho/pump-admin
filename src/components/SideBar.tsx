import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaUsers, FaBullhorn, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/log.svg';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <motion.nav
      className="bg-gradient-to-b from-green-400 to-green-500 text-white w-20 md:w-48 flex flex-col items-center py-6 fixed h-full border-r border-gray-300"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 15 }}
    >
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <img src={logo} alt="Logo" className="h-16 w-16 md:h-20 md:w-20 border-white" />
      </div>
      <div className="flex flex-col flex-1 gap-6">
        <motion.button
          className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
          onClick={() => navigate('/')}
        >
          <FaHome className="text-3xl md:text-2xl mr-3" />
          <span className="hidden md:block text-sm">Home</span>
        </motion.button>
        <motion.button
          className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
          onClick={() => navigate('/affiliates')}
        >
          <FaUsers className="text-3xl md:text-2xl mr-3" />
          <span className="hidden md:block text-sm">Affiliates</span>
        </motion.button>
        <motion.button
          className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
          onClick={() => navigate('/announcements')}
        >
          <FaBullhorn className="text-3xl md:text-2xl mr-3" />
          <span className="hidden md:block text-sm">Announcements</span>
        </motion.button>
        <motion.button
          className="flex items-center justify-start p-3 w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
          onClick={() => navigate('/settings')}
        >
          <FaCog className="text-3xl md:text-2xl mr-3" />
          <span className="hidden md:block text-sm">Settings</span>
        </motion.button>
        <motion.button
          className="flex items-center justify-start p-3 mt-auto w-full rounded-lg hover:bg-white hover:text-green-600 transition-all ease-in-out duration-200"
          onClick={() => navigate('/logout')}
        >
          <FaSignOutAlt className="text-3xl md:text-2xl mr-3" />
          <span className="hidden md:block text-sm">Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Sidebar;
