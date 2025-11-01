package main

import (
	"log"
	"os"

	"github.com/ManoVikram/AI-Meme-Generator/backend/api/routes"
	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// Step 1 - Initialize and connect to the Python gRPC server
	connection, err := grpc.NewClient("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect to gRPC server: %v", err)
	}
	defer connection.Close()

	// Step 2 - Initialize and set up the Gin server
	server := gin.Default()

	server.RedirectTrailingSlash = true

	// Step 3 - Register the routes to the Gin server
	routes.RegisterRoutes(server)

	// Step 4 - Start the Gin server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Fatal(server.Run(":" + port))
}
