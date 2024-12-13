import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const App = () => {
  const [cashIn, setCashIn] = useState(10000);
  const [cashOut, setCashOut] = useState(0);
  const [transactions, setTransactions] = useState([
    { type: "cash IN", date: "20.11.2024", category: "Salary", amount: 10000 },
  ]);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("cash IN");

  const categories = {
    "cash IN": ["Salary", "Business", "Investment", "Loan"],
    "cash OUT": [
      "Groceries",
      "Fuel",
      "Food/Drink",
      "Car/Bike",
      "Taxi",
      "Clothes",
      "Shopping",
      "Entertainment",
      "Electricity",
    ],
  };

  const handleTransaction = () => {
    if (!amount || !category) {
      alert("Please enter a valid amount and select a category.");
      return;
    }

    const newTransaction = {
      type,
      date: new Date().toLocaleDateString(),
      category,
      amount: Number(amount),
    };

    setTransactions([...transactions, newTransaction]);

    if (type === "cash IN") {
      setCashIn(cashIn + Number(amount));
    } else if (type === "cash OUT") {
      setCashOut(cashOut + Number(amount));
    }

    setAmount("");
    setCategory("");
  };

  const handleDelete = (index) => {
    const transactionToDelete = transactions[index];

    if (transactionToDelete.type === "cash IN") {
      setCashIn(cashIn - transactionToDelete.amount);
    } else if (transactionToDelete.type === "cash OUT") {
      setCashOut(cashOut - transactionToDelete.amount);
    }

    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
  };

  const balance = cashIn - cashOut;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-black flex items-center justify-center">
  <div
    className="w-full max-w-4xl bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg p-4 flex flex-col gap-4"
    style={{ height: "95vh" }}
  >
    {/* Header */}
    <div className="text-center">
      <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
      <p className="text-sm text-gray-400">
        Manage your cash inflow and outflow efficiently.
      </p>
    </div>

    {/* Cash Summary */}
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-green-800 bg-opacity-70 p-2 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-green-400">Cash IN</p>
        <p className="text-lg font-bold text-white">${cashIn}</p>
      </div>
      <div className="bg-red-800 bg-opacity-70 p-2 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-red-400">Cash OUT</p>
        <p className="text-lg font-bold text-white">${cashOut}</p>
      </div>
      <div className="bg-blue-800 bg-opacity-70 p-2 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow">
        <p className="text-sm font-semibold text-blue-400">Balance</p>
        <p className="text-lg font-bold text-white">${balance}</p>
      </div>
    </div>

    {/* Add Transaction Form */}
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-4 rounded-lg shadow-lg">
      <h2 className="text-sm font-bold text-gray-300">Add Transaction</h2>
      <div className="flex flex-wrap gap-2 mt-2 items-center">
        {/* Amount Input */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered flex-1 text-sm bg-gray-700 text-white placeholder-gray-400"
        />

        {/* Cash IN / OUT Select */}
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setCategory("");
          }}
          className="select select-bordered flex-1 text-sm bg-gray-700 text-white"
        >
          <option value="cash IN">Cash IN</option>
          <option value="cash OUT">Cash OUT</option>
        </select>
      </div>
      {/* Category Select */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select select-bordered w-full mt-2 text-sm bg-gray-700 text-white"
      >
        <option value="">Category</option>
        {categories[type].map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button
        onClick={handleTransaction}
        className="btn btn-primary w-full mt-2 flex items-center justify-center gap-2 text-sm bg-blue-600 text-white hover:bg-blue-700"
      >
        <FaPlus /> Add
      </button>
    </div>

    {/* Transaction History */}
    <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-4 rounded-lg shadow-lg flex-1 overflow-auto">
      <h2 className="text-sm font-bold text-gray-300 mb-2">History</h2>
      <div className="bg-gray-900 bg-opacity-60 p-3 rounded-lg shadow-inner max-h-[60%] overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No transactions yet.
          </p>
        ) : (
          transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
            >
              <div>
                <p className="text-xs font-semibold text-gray-300">
                  {transaction.type}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.date} - {transaction.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p
                  className={`text-sm font-bold ${
                    transaction.type === "cash IN"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  ${transaction.amount}
                </p>
                <button
                  onClick={() => handleDelete(index)}
                  className="btn btn-xs bg-red-700 text-white hover:bg-red-800 flex items-center gap-1 text-xs"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</div>

  
  );
};

export default App;
