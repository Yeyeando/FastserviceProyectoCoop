import { useNavigate } from "react-router-dom";
import "./waiter-buttons.css";
const WaiterButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  const openHelp = () => {
    window.open("/help/Realizarcomanda.html", "_blank");
  };
  return (
    <div className="button-container">
      <button className="nav-button" onClick={() => handleNavigation("/")}>
        Take order
      </button>
      <button className="nav-button" onClick={() => openHelp()}>
        help
      </button>
      <button
        className="nav-button"
        onClick={() => handleNavigation("/PickUp")}
      >
        Pick up
      </button>
    </div>
  );
};
export default WaiterButtons;
