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
              <Route
                path="/"
                element={token ? <Navigate to="/main" /> : <Login />}
              />
              <Route
                path="/main"
                element={token ? <Main /> : <Navigate to="/" />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
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
