import { useEffect } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import { useState } from "react";
import Preloader from "./loader/Preloader";
import VerifyOtp from "./components/auth/VerifyOtp";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import NotifactionConfigure from "./components/configure/NotifactionConfigure";
import Register from "./components/auth/Register";
import TransactionList from "./components/Main/transactions/TransactionList";
import RecentTransaction from "./components/Main/RecentTransaction";
import SearchTransactions from "./components/Main/SearchTransactions";
import VerificationSuccess from "./components/auth/VerificationSuccess";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  const { token } = useSelector(
    (state) => state.userDetails
);
  return (
    <div>
      {loading ? (
        <div>
          <Preloader />
        </div>
      ) : (
        <div className="App">
          <Router>
           <Routes>
               {token ? (
                <>
                  <Route path="/main/*" element={<Main />}>
                  <Route index element={<RecentTransaction />} />
                <Route path="recent" element={<RecentTransaction />} />
                <Route path="search" element={<SearchTransactions />} />
                  </Route>
                  <Route path="/*" element={<Navigate to="/main/recent" />} />
                </>
              ) : (
                <Route path="/*" element={<Navigate to="/login" />} />
              )}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify/otp" element={<VerifyOtp />} />
              <Route path="/verify/success" element={<VerificationSuccess />} />
              <Route path="/verify/otp" element={<VerifyOtp />} />
              <Route path="/configure" element={<NotifactionConfigure />} />
              <Route path="/transactios" element={<TransactionList />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
