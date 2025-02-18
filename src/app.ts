import express from "express";
import { AppDataSource } from "./config/datasource";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express()
app.use(express.json())

AppDataSource.initialize().then(() => {
    console.log("Databse connected");
    app.listen(3000, () => {
        console.log("Server Running")
    });
}).catch((error) => {
    console.log("Connection failed", error)
});
const swaggerOptions = {
    definition: {
      openapi: '3.0.0', // OpenAPI version 3
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'Simple API documentation',
      },
    },
    apis: ['./src/routes/*.ts'], // Your routes file
  };
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoutes, productRoutes);
