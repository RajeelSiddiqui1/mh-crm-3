import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Department from "./pages/Department";
import User from "./pages/User";
import { AnimatePresence } from "framer-motion";
import './App.css'

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/users" element={<User />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App;
