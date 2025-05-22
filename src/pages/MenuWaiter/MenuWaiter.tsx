import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/general/header/Header";
import HorizontalCard from "../../components/general/horizontalcard/HorizontalCard";
import Grid from "../../components/menu-grid/Grid";
import Footer from "../../components/general/footer/Footer";
import Menu from "../../components/general/jsons/tables/tables.json";
import "./MenuWaiter.css";

function MenuWaiter() {
  const navigate = useNavigate();
  const { table } = useParams();
  const menuId = Menu.tables.find((tables) => tables.id === parseInt(table!));

  return (
    <div id="menuWaiter-container">
      <Header title="Menu" backRoute="/Home" />
      <Grid>
        {menuId &&
          menuId.menu.map((item, index) => (
            <HorizontalCard
              key={item.title}
              title={item.title}
              image={item.url}
              onClick={() => navigate(`/DishesWaiter/${table}/${index + 1}`)}
            />
          ))}
      </Grid>
      <Footer />
    </div>
  );
}

export default MenuWaiter;
