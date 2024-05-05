import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { myAxios } from "../services/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DepositForm = ({ onDeposit }) => {
  const { accountId } = useParams();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    myAxios
      .put(`/api/accounts/${accountId}/deposit`, { amount: parseFloat(amount) })
      .then((response) => {
        const updatedBalance = response.data.balance;
        toast.success(
          `Deposit of ${amount} successful! New balance: ${updatedBalance}`,
          {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        setTimeout(() => {
          navigate(`/account/${accountId}`);
        }, 2000);
        console.log("Deposit added!");
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
        }
      });

    setAmount("");
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2>Deposit Form</h2>
      <FormStyled onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter deposit amount"
          required
        />
        <button type="submit">Deposit</button>
      </FormStyled>
    </>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  label {
    font-weight: 400;
    margin-right: 10px;
    font-size: 1.2rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 300px;
    border: none;
    border-left: 3px solid var(--btn-color);
    background-color: #202020;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: #fff;
    border: 1px solid var(--btn-color);
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.4s ease-in-out;

    &:hover {
      background-color: var(--btn-color);
    }
  }
`;

export default DepositForm;
