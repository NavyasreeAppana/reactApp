// components/ExpenseForm.js
import React, { useState } from "react";

function ExpenseForm({ friends, addExpense }) {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [sharedBy, setSharedBy] = useState([]);

  const handleSharedByChange = (friend) => {
    setSharedBy((prevSharedBy) => {
      if (prevSharedBy.includes(friend)) {
        return prevSharedBy.filter((f) => f !== friend);
      } else {
        return [...prevSharedBy, friend];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { paidBy, amount: parseFloat(amount), sharedBy };
    addExpense(expense);
    setPaidBy("");
    setAmount("");
    setSharedBy([]);
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Who paid?</label>
          <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
            <option value="">Select Friend</option>
            {friends.map((friend, index) => (
              <option key={index} value={friend}>
                {friend}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Shared By:</label>
          {friends.map((friend, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`friend-${index}`}
                value={friend}
                checked={sharedBy.includes(friend)}
                onChange={() => handleSharedByChange(friend)}
              />
              <label htmlFor={`friend-${index}`}>{friend}</label>
            </div>
          ))}
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
