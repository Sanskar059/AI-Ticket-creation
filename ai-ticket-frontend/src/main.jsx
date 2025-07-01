import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./components/CheckAuth.jsx";
import Tickets from "./pages/tickets.jsx";
import TicketDetailsPage from "./pages/ticket.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/Home.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

// Home page component with navbar
const HomePage = () => (
  <div>
    <Navbar />
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to AI Ticket System</h1>
      <p className="text-lg mb-4">Manage your tickets efficiently with AI assistance.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Create Tickets</h2>
            <p>Submit new support tickets and get AI-powered assistance.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Track Progress</h2>
            <p>Monitor the status and progress of your submitted tickets.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">AI Support</h2>
            <p>Get intelligent responses and solutions for your issues.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/tickets"
            element={
              <CheckAuth protected={true}>
                <div>
                  <Navbar />
                  <Tickets />
                </div>
              </CheckAuth>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <CheckAuth protected={true}>
                <div>
                  <Navbar />
                  <TicketDetailsPage />
                </div>
              </CheckAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <CheckAuth protected={true}>
                <div>
                  <Navbar />
                  <Admin />
                </div>
              </CheckAuth>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              <CheckAuth protected={false}>
                <Login />
              </CheckAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <CheckAuth protected={false}>
                <Signup />
              </CheckAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);