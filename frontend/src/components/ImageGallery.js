import React from 'react';

const ImageGallery = ({ images, selectedImage, setSelectedImage }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-white flex items-center justify-center">
        <img
          src={images[selectedImage]}
          alt={`Product view ${selectedImage + 1}`}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=Perfume';
          }}
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-20 h-20 md:w-16 md:h-16 rounded-lg overflow-hidden cursor-pointer border-4 transition-all duration-300 bg-white ${
                selectedImage === index 
                  ? 'border-primary shadow-[0_0_0_2px_rgba(102,126,234,0.3)]' 
                  : 'border-transparent hover:border-primary'
              } hover:scale-110`}
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-contain"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/100x100?text=Perfume';
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

