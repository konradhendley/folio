import React, { useState } from 'react';
import Header from '../components/Header';

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e, redirect = false) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken'); // Fetch the token from localStorage

    try {
      const response = await fetch('https://fb8a21npal.execute-api.us-east-1.amazonaws.com/dev/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          amount: parseFloat(amount),
          category,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }

      setSuccess(true);
      setError('');
      if (redirect) {
        // Redirect back to the previous page
        window.history.back();
      } else {
        // Clear the form for the next expense
        setDescription('');
        setAmount('');
        setCategory('');
        setDate('');
      }
    } catch (err) {
      setError(err.message);
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div>
      <Header />
      <div className="expense-form">
        {/* "X" Cancel Icon */}
        <button
          className="cancel-icon"
          onClick={handleCancel}
        >
          &times;
        </button>
        <h2>Add New Expense</h2>
        {success && <p className="success">Expense saved successfully!</p>}
        {error && <p className="error">{error}</p>}
        <form>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Expense description"
            required
          />
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Expense amount"
            required
          />
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Expense category"
            required
          />
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="button-group">
            <button type="button" onClick={(e) => handleSubmit(e, true)}>
              Save and Go Back
            </button>
            <button type="button" onClick={(e) => handleSubmit(e, false)}>
              Save and Add Another
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;