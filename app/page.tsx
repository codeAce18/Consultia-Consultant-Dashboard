'use client';

import Image from "next/image";

import { useState } from 'react';
import Modal from './components/Modal';
import SideBar from './components/SideBar';

export default function Home() {

  
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  return (
    
    <div className="relative">
      <SideBar />
      {showModal && <Modal onClose={handleCloseModal} />}

    </div>
  );
}
