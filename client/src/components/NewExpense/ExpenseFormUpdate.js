import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExpenseDetail = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const fetchData = () => {
    axios
      .get(`http://localhost:8000/api/v1/products/${params.id}`)
      .then(function (response) {
        const { name, price, stock, image } = response.data.data.product;
        setName(name);
        setPrice(price);
        setStock(stock);
        setImage(image);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedData = {
      name: name,
      price: price,
      stock: stock,
      image: image,
    };

    axios
      .put(`http://localhost:8000/api/v1/products/${params.id}`, updatedData)
      .then(function (response) {
        console.log(response.data.data);
        setIsLoading(false);
        fetchData();
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1>Product Update</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </label>
        <br />
        <div>
          {image && (
            <img src={image} alt="Product" style={{ width: "200px" }} />
          )}
        </div>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseDetail;
