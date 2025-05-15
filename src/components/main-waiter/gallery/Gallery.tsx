import React, { useEffect, useState } from "react";
import { getAllTables } from "../../../services/tablesService";
import "./gallery.css";
import { useNavigate } from "react-router-dom";

interface galleryProps {
  nextRoute?: string;
} 
const ImageGallery: React.FC<galleryProps> = ({ nextRoute = "/" }) => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getAllTables();
        setTables(data);
        setLoading(false);
      } catch (err) {
        setError("Error cargando las mesas");
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const handleNext = (tableId: number) => () => {
    if (nextRoute) {
      navigate(`${nextRoute}/${tableId}`);
    }
  };

  if (loading) return <h1>Cargando mesas...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
      <div className="tables-container">
        <div className="grid-container">
          {tables.map((table) => (
            <div
              className="grid-item"
              key={table.id}
              onClick={handleNext(table.id)}
            >
              <div className="image-container">
                <img
                  src={"/img/chair.svg"}
                  alt={`Mesa ${table.number}`}
                  className="img-fluid"
                />
                <div className="overlay">
                  <span className="image-id">{table.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ImageGallery;
