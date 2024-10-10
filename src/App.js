// App.js
import './styles.css';
import React, { useState } from "react";
import FriendList from "./components/FriendList";
import ExpenseList from "./components/ExpenseList";
import Settlement from "./components/Settlement";
import ExpenseForm from "./components/ExpenseForm";

function App() {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  // Adding friends dynamically
  const addFriend = (friend) => {
    setFriends([...friends, friend]);
  };

  // Adding expenses
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <h1>Splitwise Clone</h1>
      <FriendList friends={friends} addFriend={addFriend} />
      <ExpenseForm friends={friends} addExpense={addExpense} />
      <ExpenseList expenses={expenses} />
      <Settlement expenses={expenses} friends={friends} />
    </div>
  );
}

export default App;
