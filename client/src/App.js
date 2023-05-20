import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import Expense from './components/Expenses/Expense';
import ExpenseDetail from './components/Expenses/ExpenseDetail';
import ExpenseFormUpdate from './components/NewExpense/ExpenseFormUpdate';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Expense />} />
        <Route path='/coba' element={<><h2>hai Server </h2></>} />
        <Route path='/details/:id' element={<ExpenseDetail />} />
        <Route path="/update/:id" element={<ExpenseFormUpdate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
