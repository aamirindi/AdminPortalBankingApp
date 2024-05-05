import { useState } from "react";
import { myAxios } from "../services/Helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [newUser, setNewUser] = useState({
    accountHolderName: "",
    balance: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    myAxios
      .post("/api/accounts", newUser)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error creating new user:", error);
      });
  };

  return (
    <>
      <h1>
        <span>C</span>
        reate <span>N</span>ew <span>U</span>ser
      </h1>
      <CreateUserStyled>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Account Holder Name:</label>
            <input
              type="text"
              name="accountHolderName"
              value={newUser.accountHolderName}
              onChange={handleInputChange}
              required
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label>Balance:</label>
            <input
              type="number"
              name="balance"
              value={newUser.balance}
              onChange={handleInputChange}
              required
              placeholder="Balance"
            />
          </div>
          <button type="submit">Create User</button>
        </form>
      </CreateUserStyled>
    </>
  );
}

const CreateUserStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid var(--btn-color);
    border-radius: 5px;
    backdrop-filter: blur(5px);

    div {
      width: 100%;
      display: flex;
      margin-right: 10px;
      justify-content: space-between;

      input {
        border: none;
        border-left: 3px solid var(--btn-color);
        background-color: #202020;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        height: fit-content;

        &:focus {
          outline: none;
        }
      }
    }
    button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--btn-color);
      background: transparent;
      font-size: 1.2rem;
      margin-top: 2rem;
      border-radius: 3px;
      transition: all 0.4s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: var(--btn-color);
      }
    }
  }
`;
export default CreateUser;
