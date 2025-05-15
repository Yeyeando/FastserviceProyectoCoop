import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getAllContaints } from "../../services/containsService.js";
import { getAllIngredients } from "../../services/ingredientsService.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Contain {
  idDish: number;
  idIngredient: number;
  quantity: number;
}

interface Ingredient {
  id_ingredient: number;
  name: string;
  contains?: any;
}

const ContainsGraphics: React.FC = () => {
  const [contains, setContains] = useState<Contain[]>([]);
  const [ingredients, setIngredients] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [uniqueIngredients, setUniqueIngredients] = useState<number>(0);
  const [mostUsedIngredient, setMostUsedIngredient] = useState<string>("");
  const [averageQuantity, setAverageQuantity] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const containsData = await getAllContaints();
        const ingredientsData: Ingredient[] = await getAllIngredients();

        const ingredientsMap: Record<number, string> = {};
        ingredientsData.forEach((ingredient) => {
          ingredientsMap[ingredient.id_ingredient] = ingredient.name;
        });

        setContains(containsData);
        setIngredients(ingredientsMap);

        // Calcular valores adicionales
        const ingredientQuantities: Record<string, number> = {};
        let total = 0;

        containsData.forEach(({ idIngredient, quantity }: Contain) => {
          const ingredientName = ingredientsMap[idIngredient] || `Ingredient ${idIngredient}`;
          ingredientQuantities[ingredientName] = (ingredientQuantities[ingredientName] || 0) + quantity;
          total += quantity;
        });        

        setTotalQuantity(total);
        setUniqueIngredients(Object.keys(ingredientQuantities).length);
        setAverageQuantity(total / Object.keys(ingredientQuantities).length || 0);
        
        const mostUsed = Object.entries(ingredientQuantities).reduce((a, b) => (b[1] > a[1] ? b : a), ["", 0]);
        setMostUsedIngredient(mostUsed[0]);
      } catch (err) {
        console.error("Error al obtener la información:", err);
        setError("Error al cargar los datos del gráfico.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando datos del gráfico...</div>;
  if (error) return <div>{error}</div>;

  const ingredientQuantities: Record<string, number> = {};
  contains.forEach(({ idIngredient, quantity }) => {
    const ingredientName = ingredients[idIngredient] || `Ingredient ${idIngredient}`;
    ingredientQuantities[ingredientName] = (ingredientQuantities[ingredientName] || 0) + quantity;
  });

  const labels = Object.keys(ingredientQuantities);
  const quantities = Object.values(ingredientQuantities);

  const data = {
    labels,
    datasets: [
      {
        label: "Total Quantity per Ingredient",
        data: quantities,
        backgroundColor: "rgb(255, 6, 6)",
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Cantidad Total de Ingredientes en Platos" },
    },
    scales: {
      x: { title: { display: true, text: "Ingredient Name" } },
      y: { title: { display: true, text: "Total Quantity" }, beginAtZero: true },
    },
  };

  return (
    <div>
      <h2>Gráfico de Ingredientes en Platos</h2>
      <Bar data={data} options={options} />
      <div>
        <p><strong>Total de Ingredientes Utilizados:</strong> {totalQuantity}</p>
        <p><strong>Número de Ingredientes Únicos:</strong> {uniqueIngredients}</p>
        <p><strong>Ingrediente Más Utilizado:</strong> {mostUsedIngredient}</p>
        <p><strong>Promedio de Cantidad por Ingrediente:</strong> {averageQuantity.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ContainsGraphics;