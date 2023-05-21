import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ExpenseFormUpdate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null); // Menambahkan state imageFile
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // Menambahkan state previewImage

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
        setPreviewImage(image); // Mengatur previewImage saat melakukan fetch data
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setPreviewImage(URL.createObjectURL(file)); // Mengatur previewImage saat memilih gambar baru
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updatedData = {
      name: name,
      price: price,
      stock: stock,
    };

    // Membuat objek FormData dan menambahkan data gambar
    const formData = new FormData();
    formData.append("image", imageFile);

    // Menambahkan data lainnya ke dalam FormData
    Object.keys(updatedData).forEach((key) => {
      formData.append(key, updatedData[key]);
    });

    axios
      .put(`http://localhost:8000/api/v1/products/${params.id}`, formData)
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
          Image File:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        <div>
          {previewImage && (
            <img src={previewImage} alt="Product" style={{ width: "200px" }} />
          )}
        </div>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseFormUpdate;
