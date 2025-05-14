import Header from "../../components/general/header/Header";
import Tables from "../../components/main-waiter/gallery/Gallery";
import Footer from "../../components/general/footer/Footer";
import "./MainWaiter.css";

function MainWaiter() {
  return (
    <section id="mainWaiter-container">
      <Header title="Select a table" showBackButton={false} />
      <Tables nextRoute={"/MenuWaiter"} />
      <Footer />
    </section>
  );
}

export default MainWaiter;
