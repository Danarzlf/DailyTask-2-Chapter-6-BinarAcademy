import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  console.log(props.items)
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
  }

  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          id={expense.id}
          title={expense.name}
          amount={expense.price}
          date={expense.createdAt}
        />
      ))}
      {/* {warehouses?.map((warehouse) => (
        <ExpenseItem
          key={warehouse.id}
          title={warehouse.name}
          amount={warehouse.name}
          date={warehouse.createdAt}
        />
      ))} */}
    </ul>
  );
};

export default ExpensesList;
