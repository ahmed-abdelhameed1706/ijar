import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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
        url: "http://localhost:5000/auth/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("../swagger-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
