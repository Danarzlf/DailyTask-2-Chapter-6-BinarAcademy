import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  console.log(props);

  const [isDeleted, setIsDeleted] = useState(false);

  const deleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8000/api/v1/products/${props.id}`, {
        headers,
      });
      setIsDeleted(true);
      console.log("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
    }
  };

  if (isDeleted) {
    return null; // Menghilangkan komponen setelah penghapusan berhasil dilakukan .
  }

  return (
    <>
      <img src={props.image} style={{ width: "50%" }} />
      <ExpenseDate date={props.datee} />

      <div className="">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
        <Link to={`/details/${props.id}`}>
          <button>
            <FaEye />
          </button>
        </Link>
        <button onClick={deleteHandler}>Delete</button>
        <Link to={`/update/${props.id}`}>
          <button>
            <FaEdit />
          </button>
        </Link>
      </div>
    </>
  );
};

export default ExpenseItem;
