import Footer from "../../components/general/footer/Footer";
import "./PickUp.css";
import Header from "../../components/general/header/Header";

function PickUp() {
  return (
    <div id="pickup-container">
      <Header title="Pick up" showBackButton={false} />
      <h1>No dishes ready</h1>
      <Footer />
    </div>
  );
}

export default PickUp;
