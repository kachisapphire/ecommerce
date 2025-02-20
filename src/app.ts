import express from "express";
import { AppDataSource } from "./config/datasource";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import orderRoutes from "./routes/orderRoutes";
import {AuthService} from "./services/authServices"
import { UserDto } from "dto/userDto";

const app = express()
const authService = new AuthService
app.use(express.json())

AppDataSource.initialize().then(async () => {
    console.log("Databse connected");
    await authService.seedAdmin({
      email: "jarapolice03@gmail.com",
      password: "Kachi5599",
      firstname: "Esther",
      lastname: "Michael"
  });
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
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // JSON Web Token
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Your routes file
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', userRoutes, productRoutes, orderRoutes);
