import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ijar API Documentation",
      version: "1.0.0",
      description: "API Documentation for Ijar",
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./routes/swagger/*.yml"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
