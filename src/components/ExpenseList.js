// components/ExpenseList.js
import React from "react";

function ExpenseList({ expenses }) {
  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.paidBy} paid ${expense.amount} shared by{" "}
            {expense.sharedBy.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
