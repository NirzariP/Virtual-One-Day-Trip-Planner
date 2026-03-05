import React, { createContext, useState } from 'react';

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [selectedImageNames, setSelectedImageNames] = useState([]);

  const addSelectedImageName = (name) => {
    setSelectedImageNames([...selectedImageNames, name]);
  };

  const removeSelectedImageName = (name) => {
    const updatedNames = selectedImageNames.filter((imageName) => imageName !== name);
    setSelectedImageNames(updatedNames);
  };

  return (
    <ImageContext.Provider value={{ selectedImageNames, addSelectedImageName, removeSelectedImageName }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };
