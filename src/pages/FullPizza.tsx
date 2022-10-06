import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://62c1dce62af60be89ecefccf.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Произошла ошибка при загрузке пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>ЗАГРУЗКА..</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h2>{pizza.price} Р</h2>
    </div>
  );
};

export default FullPizza;
