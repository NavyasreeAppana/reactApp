// components/Settlement.js
import React from "react";

function Settlement({ expenses, friends }) {
  // Calculate balances for each friend
  const calculateSettlement = () => {
    let balances = {};
    friends.forEach((friend) => (balances[friend] = 0));

    // Calculate the balance for each person based on expenses
    expenses.forEach((expense) => {
      const amountPerPerson = expense.amount / expense.sharedBy.length;
      expense.sharedBy.forEach((friend) => {
        if (friend !== expense.paidBy) {
          balances[friend] -= amountPerPerson; // This person needs to pay
          balances[expense.paidBy] += amountPerPerson; // Paid by person receives money
        }
      });
    });

    return balances;
  };

  const settleDebts = (balances) => {
    let transactions = [];
    let peopleOwe = [];
    let peopleReceive = [];

    // Split friends into two groups: those who need to pay and those who will receive
    for (let friend in balances) {
      if (balances[friend] < 0) {
        peopleOwe.push({ name: friend, amount: Math.abs(balances[friend]) });
      } else if (balances[friend] > 0) {
        peopleReceive.push({ name: friend, amount: balances[friend] });
      }
    }

    // Match people who need to pay to those who will receive
    while (peopleOwe.length && peopleReceive.length) {
      let owingPerson = peopleOwe[0];
      let receivingPerson = peopleReceive[0];

      let minAmount = Math.min(owingPerson.amount, receivingPerson.amount);
      transactions.push(
        `${owingPerson.name} needs to pay ${receivingPerson.name} $${minAmount.toFixed(
          2
        )}`
      );

      owingPerson.amount -= minAmount;
      receivingPerson.amount -= minAmount;

      if (owingPerson.amount === 0) {
        peopleOwe.shift(); // Remove from the list when fully paid
      }
      if (receivingPerson.amount === 0) {
        peopleReceive.shift(); // Remove from the receiving list when fully paid
      }
    }

    return transactions;
  };

  // Calculate balances and transactions
  const balances = calculateSettlement();
  const transactions = settleDebts(balances);

  return (
    <div>
      <h2>Settlement</h2>
      <ul>
        {transactions.length === 0 ? (
          <li>All expenses are settled.</li>
        ) : (
          transactions.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Settlement;
