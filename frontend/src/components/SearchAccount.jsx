import { useState } from "react";
import { myAxios } from "../services/Helper";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SearchUser({ onUserFound }) {
  const [accountId, setAccountId] = useState("");
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [error, setError] = useState(""); // State for error message
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setAccountId(value);
    setIsInputFilled(value.trim().length > 0);
    setError(""); // Reset error message when input changes
  };

  const handleSearch = () => {
    myAxios
      .get(`/api/accounts/${accountId}`)
      .then((response) => {
        onUserFound(response.data);
        navigate(`/account/${accountId}`);
      })
      .catch((error) => {
        console.error("Error searching user:", error);
        setError("Account not found. Please enter a valid account ID."); // Set error message
      });
  };

  return (
    <>
      <h1>
        <span>S</span>earch <span>A</span>ccount
      </h1>
      <SearchUserStyled>
        <div className="input-container">
          <input
            type="number"
            value={accountId}
            onChange={handleInputChange}
            placeholder="Enter Account ID"
            required
          />
          {error && <span className="error">{error}</span>}
        </div>
        <button onClick={handleSearch} disabled={!isInputFilled}>
          Search
        </button>
      </SearchUserStyled>
    </>
  );
}

const SearchUserStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  gap: 1rem;

  .input-container {
    position: relative;
  }

  input {
    padding: 0.5rem 1rem;
    border: none;
    border-left: 3px solid var(--btn-color);
    border-radius: 10px 0 0 10px;
    font-size: 1rem;
    background-color: #202020;

    &:focus {
      outline: none;
    }
  }

  .error {
    color: red;
    font-size: 0.8rem;
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--btn-color);
    background: transparent;
    font-size: 1.2rem;
    border-radius: 0 10px 10px 0;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    color: white;

    &:hover {
      background-color: var(--btn-color);
    }
  }
`;

export default SearchUser;
