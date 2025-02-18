import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de que la ruta sea correcta

const ProductGrid = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productosCollection = collection(db, "product");
        const productosSnapshot = await getDocs(productosCollection);
        const data = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && filters) {
      const filtered = products.filter((product) => {
        const priceInRange =
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
        const categoryMatch =
          filters.categories.length === 0 || filters.categories.includes(product.category);
        return priceInRange && categoryMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, filters]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Productes disponibles
      </Typography>
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={product.imageURL || "https://via.placeholder.com/200"}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" sx={{ marginTop: "10px" }}>
                  €{product.price}
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                  Comprar ara
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;