import { useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { myAxios } from "../services/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawalForm = () => {
  const { accountId } = useParams();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    myAxios
      .put(`/api/accounts/${accountId}/withdraw`, {
        amount: parseFloat(amount),
      })
      .then((response) => {
        const updatedBalance = response.data.balance;
        toast.success(
          `Withdrawal of ${amount} successful! New balance: ${updatedBalance}`,
          {
            position: "top-right",
            autoClose: 5000,
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
        console.log("Withdrawal successful!");
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
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <h2>Withdrawal Form</h2>
      <FormStyled onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter withdrawal amount"
          required
        />
        <button type="submit">Withdraw</button>
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

export default WithdrawalForm;
