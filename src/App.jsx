import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Layout from "./components/Layout";
import Register from "./pages/public/Register";
import Consola from "./pages/public/Consola";
import Forum from "./pages/public/Forum";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateConsola from "./pages/private/CreateConsola";
import EditConsola from "./pages/private/EditConsola";
import CreateProblema from "./pages/private/CreateProblema";
import ManageProblemas from "./pages/private/ManageProblemas";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={ <Home />} />
          <Route path="/consola/:nombre" element={ <Consola />} />
          <Route path="/forum/:nombre" element={ <ProtectedRoute> <Forum /> </ProtectedRoute> } />
          <Route path="/createConsola" element={ <ProtectedRoute path="/createConsola"> <CreateConsola /> </ProtectedRoute> } />
          <Route path="/editConsola" element={ <ProtectedRoute path="/editConsola"> <EditConsola /> </ProtectedRoute> } />
          <Route path="/createProblema" element={ <ProtectedRoute path="/createProblema"> <CreateProblema /> </ProtectedRoute> } />
          <Route path="/editProblema" element={ <ProtectedRoute path="/editProblema"> <ManageProblemas /> </ProtectedRoute> } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
