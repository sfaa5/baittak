"use client";
import React, { useState } from "react";
import { FaRegImages } from "react-icons/fa";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";
import Modal from "react-modal";

function ImageModel({ img }: { img: { url: string }[] }) {
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
        <div className="relative col-span-2 row-span-2">
          <img
            src={`${img[0]?.url}`}
            alt={`property image 0`}
            className=" w-full h-[500px] object-cover rounded-xl"
            onClick={() => openModal(0)}
          />
         <span className="bg-white-100 text-black absolute bottom-2 right-3 rounded-lg  flex gap-2 items-center p-1 text-sm px-2"><FaRegImages />{img.length} </span> 
        </div>
        {/* Small images */}
        {img.slice(1, 3).map((im, index) => (
          <div key={index} className="h-full">
            <img
              src={`${im?.url}`}
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
        <div className="flex flex-col items-center">
          {/* Navigation controls */}
          <div className="flex justify-between w-full items-center mb-4">
            <button onClick={prevImage}>
              <MdOutlineArrowBackIosNew className="text-2xl cursor-pointer" />
            </button>
            <img
              src={`${img[currentImageIndex].url}`}
              alt={`property image ${currentImageIndex}`}
              className="w-[1000px] h-[600px] object-cover rounded-xl"
            />
            <button onClick={nextImage}>
              <MdOutlineArrowForwardIos className="text-2xl cursor-pointer" />
            </button>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex gap-4 mt-4">
            {img.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail.url}
                alt={`Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  index === currentImageIndex
                    ? "ring-4 ring-primary"
                    : "opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ImageModel;
