import React from "react";
import imagesData from "../../general/jsons/tables/tables.json";
import "./gallery.css";
import { useNavigate } from "react-router-dom";

interface galleryProps {
  nextRoute?: string;
}
const ImageGallery: React.FC<galleryProps> = ({ nextRoute = "/" }) => {
  const navigate = useNavigate();

  const handleNext = (table: number) => () => {
    if (nextRoute) {
      navigate(nextRoute + `/${table}`);
    }
  };
  return (
    <div className="grid-container">
      {imagesData.tables.map((tables) => (
        <div
          className="grid-item"
          key={tables.id}
          onClick={handleNext(tables.id)}
        >
          <div className="image-container">
            <img src={tables.url} alt={tables.alt} className="img-fluid" />
            <div className="overlay">
              <span className="image-id">{tables.id}</span>
            </div>
          </div>
        </div>
      ))}
      </div>
  );
};

export default ImageGallery;
