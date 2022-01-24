import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import AddContact from "./pages/AddContact";
import ContactDetailPage from "./pages/ContactDetailPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./private/PrivateRoute";
import { useAppSelector } from "./store";

function App() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="App">
      {user && <Header />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute userData={user}>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute userData={user}>
              <AddContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <PrivateRoute userData={user}>
              <AddContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/:contactId"
          element={
            <PrivateRoute userData={user}>
              <ContactDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
