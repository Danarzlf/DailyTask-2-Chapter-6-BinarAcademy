import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
        <button onClick={handleShow}>Delete</button>
        <Link to={`/update/${props.id}`}>
          <button>
            <FaEdit />
          </button>
        </Link>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="assets/images/dlt.jpg"
            alt="background"
            className="img-fluid mt-2 mb-3 mx-auto d-block"
            style={{ width: "30%" }}
          />

          <p className="text-center">
            Are you sure you want to delete this product?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={deleteHandler}
            className="delete-button"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseItem;
