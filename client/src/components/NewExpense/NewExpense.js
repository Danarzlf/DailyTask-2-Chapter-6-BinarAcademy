import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';
import { Button } from 'react-bootstrap';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };
  const logoutHandler = () => {
    // Hapus token atau informasi login lainnya dari localStorage
    localStorage.removeItem("token");
    // Lakukan tindakan lain yang diperlukan setelah logout, seperti mengarahkan pengguna ke halaman login
    window.location.href = "/login";
  };


  return (
    <div className='new-expense'>
      {!isEditing && (
        
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
      <button onClick={logoutHandler}>Logout</button> {/* Tombol Logout */}
    </div>
    
  );
};

export default NewExpense;
