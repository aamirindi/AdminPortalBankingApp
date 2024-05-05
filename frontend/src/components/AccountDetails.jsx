import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { myAxios } from "../services/Helper";
import styled from "styled-components";

function AccountDetails() {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    myAxios
      .get(`/api/accounts/${accountId}`)
      .then((response) => {
        setAccount(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [accountId]);

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      myAxios
        .delete(`/api/accounts/${accountId}`)
        .then(() => {
          navigate("/");
          console.log("Account deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        Loading...
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!account) {
    return <div>No account found</div>;
  }

  return (
    <>
      <h2>
        <span>A</span>ccount <span>D</span>etails
      </h2>
      <AccountDetailsStyled>
        <li className="user">
          <div>
            <p>Account ID:</p>
            {account.id}
          </div>
          <div>
            <p>Account Holder:</p>
            {account.accountHolderName}
          </div>
          <div>
            <p>Balance:</p>
            {account.balance}
          </div>
        </li>
        <div className="buttons">
          <button>
            <Link to={`/account/${accountId}/deposit`}>Deposit</Link>
          </button>
          <button>
            <Link to={`/account/${accountId}/withdrawal`}>Withdrawal</Link>
          </button>
          <button className="delete" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </AccountDetailsStyled>
    </>
  );
}

const AccountDetailsStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  .buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .delete {
    border: 1px solid crimson;

    &:hover {
      background-color: crimson;
    }
  }
  button {
    padding: 0.6rem 1rem;
    border: 1px solid var(--btn-color);
    background: transparent;
    font-size: 1rem;
    border-radius: 5px;
    transition: all 0.4s ease-in-out;
    cursor: pointer;
    color: white;
    margin-top: 20px;

    &:hover {
      background-color: var(--btn-color);
    }
  }
`;

export default AccountDetails;
