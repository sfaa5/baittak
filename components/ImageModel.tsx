"use client";
import React, { useState, useEffect } from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import Modal from "react-modal";

function ImageModel({ img }: { img: string[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);



  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % img.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + img.length) % img.length);
  };

  return (
    <div>
      <div className="sm:grid grid-cols-3 grid-rows-2 gap-4 xl:gap-4 hidden">
        {/* Big image */}
        <div className="col-span-2 row-span-2 ">
          <img
            src={`http://localhost:5001${img[0]}`}
            alt={`property image 0`}
            className="w-full h-[500px] object-cover rounded-xl"
            onClick={() => openModal(0)}
          />
        </div>
        {/* Small images */}
        {img.slice(1, 3).map((im, index) => (
          <div key={index} className="h-full">
            <img
              src={`http://localhost:5001${im}`}
              alt={`property image ${index + 1}`}
              className="w-full h-[240px] object-cover rounded-xl"
              onClick={() => openModal(index + 1)}
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="flex justify-between items-center">
          <button onClick={prevImage}><MdOutlineArrowForwardIos /></button>
          <img
            src={`http://localhost:5001${img[currentImageIndex]}`}
            alt={`property image ${currentImageIndex}`}
            className=" w-[1000px] h-auto object-cover rounded-xl"
          />
          <button onClick={nextImage}><MdOutlineArrowBackIosNew /></button>
        </div>

      </Modal>
    </div>
  );
}

export default ImageModel;