import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ExpenseDetail = () => {
  const [data, setData] = useState({});
  let params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .get(`http://localhost:8000/api/v1/products/${params.id}`, { headers })
      .then(function (response) {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [setData]);

  return (
    <div className="">
      <h1>Product Detail</h1>
      <h1>{data?.product?.name}</h1>
      <p>{data?.product?.price}</p>
      <p>{data?.product?.stock}</p>
      {data?.product?.image && (
        <img
          src={data.product.image}
          alt="Product Image"
          style={{ width: "25%" }}
        />
      )}
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default ExpenseDetail;
