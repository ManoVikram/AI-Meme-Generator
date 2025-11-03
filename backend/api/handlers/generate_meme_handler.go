package handlers

import (
	"fmt"
	"net/http"

	"github.com/ManoVikram/AI-Meme-Generator/backend/api/models"
	"github.com/ManoVikram/AI-Meme-Generator/backend/api/services"
	"github.com/gin-gonic/gin"

	pb "github.com/ManoVikram/AI-Meme-Generator/backend/api/proto"
)

func GenerateMemeHandler(services *services.Services) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Step 1 - Parse the request
		var request models.GenerateMemeWithTopicRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
			return
		}

		// Step 2 - Convert the request to the protobuf format (gRPC request)
		grpcRequest := &pb.GenerateMemeWithTopicRequest{
			Topic: request.Topic,
		}

		// Step 3 - Call the AI service to generate meme
		grpcResponse, err := services.AIClient.GenerateMemeWithTopic(c.Request.Context(), grpcRequest)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to generate meme %v", err)})
			return
		}

		// Step 4 - Convert the gRPC response to the API response format
		response := models.GenerateMemeWithTopicResponse{
			Image:    grpcResponse.Image,
			Caption:  grpcResponse.Caption,
			MimeType: grpcResponse.MimeType,
		}

		// Step 5 - Return the response
		c.JSON(http.StatusOK, response)
	}
}
