
import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export default function PrivateRoute({ children }) {
//     const { token } = useSelector(
//         (state) => state.userDetails
//     );
//     return token ? children : <Navigate to="/" />
// };

import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
      const { token } = useSelector(
        (state) => state.userDetails
    );
  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;