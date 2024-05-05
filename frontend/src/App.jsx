import "./App.css";
import AccountDetails from "./components/AccountDetails";
import AccountList from "./components/AccountList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Sidebar from "./components/Sidebar";
import SearchUser from "./components/SearchAccount";
import DepositForm from "./components/DepositForm";
import WithdrawalForm from "./components/WithdrawalForm";

function App() {
  const handleUserCreated = (userData) => {
    console.log("New user created:", userData);
  };

  const handleUserFound = (userData) => {
    // console.log("User found:", userData);
  };

  const handleDeposit = (accountId, amount) => {
    console.log(`Deposit ${amount} to account ${accountId}`);
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<AccountList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route
            path="/account/:accountId"
            element={<AccountDetails onDeposit={handleDeposit} />}
          />
          <Route
            path="/account/:accountId/deposit"
            element={<DepositForm onDeposit={handleDeposit} />}
          />
          <Route
            path="/account/:accountId/withdrawal"
            element={<WithdrawalForm />}
          />
          <Route
            path="/search"
            element={<SearchUser onUserFound={handleUserFound} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
