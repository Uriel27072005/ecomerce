import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import SidebarFilters from "./components/SidebarFilters"; // Importa SidebarFilters
import { Box, CssBaseline } from "@mui/material";

const Success = () => <h1>Pagament completat!</h1>;
const Cancel = () => <h1>El pagament s'ha cancel·lat.</h1>;

const App = () => {
  // Estado para gestionar los filtros
  const [filters, setFilters] = useState({ priceRange: [0, 1000], categories: [] });

  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Assegura que el Footer sempre quedi al final
        }}
      >
        {/* CssBaseline assegura un estil consistent */}
        <CssBaseline />

        {/* Barra de navegació */}
        <Navbar />

        {/* Configuració de rutes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                {/* Contenedor para los filtros y la cuadrícula de productos */}
                <Box sx={{ display: "flex", padding: "20px" }}>
                  {/* Sidebar con los filtros */}
                  <Box sx={{ width: "25%", marginRight: "20px" }}>
                    <SidebarFilters onFilterChange={setFilters} />
                  </Box>

                  {/* Cuadrícula de productos */}
                  <Box sx={{ flexGrow: 1 }}>
                    <ProductGrid filters={filters} />
                  </Box>
                </Box>
              </>
            }
          />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>

        {/* Peu de pàgina */}
        <Footer />
      </Box>
    </Router>
  );
};

export default App;