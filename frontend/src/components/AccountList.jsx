import { useState, useEffect } from "react";
import { myAxios } from "../services/Helper";
import styled from "styled-components";
import { Link } from "react-router-dom";

function AccountList() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    myAxios
      .get("/api/accounts")
      .then((response) => {
        setAccounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

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

  if (!Array.isArray(accounts)) {
    return <div>Error: Accounts data is not valid</div>;
  }

  return (
    <>
      <h2>
        <span>A</span>ccount <span>L</span>ist
      </h2>
      <AccountListStyled>
        <ul>
          {accounts.map((account) => (
            <Link to={`/account/${account.id}`} key={account.id}>
              <li className="user">
                {/* Use Link to navigate to AccountDetails component */}
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
            </Link>
          ))}
        </ul>
      </AccountListStyled>
    </>
  );
}

const AccountListStyled = styled.div`
  width: 100%;
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin: 1rem;
    padding: 1rem;
  }
`;

export default AccountList;
