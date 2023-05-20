import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  const searchChangeHandler = (event) => {
    props.onSearch(event);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by tahun</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="All">All</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
      <div className="expenses-filter__control">
        <label>Search by name</label>
        <input
          type="text"
          value={props.searchTerm}
          onChange={searchChangeHandler}
        />
      </div>
    </div>
  );
};

export default ExpensesFilter;
