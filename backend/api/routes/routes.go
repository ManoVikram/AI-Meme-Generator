package routes

import (
	"github.com/ManoVikram/AI-Meme-Generator/backend/api/handlers"
	"github.com/ManoVikram/AI-Meme-Generator/backend/api/services"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine, services *services.Services) {
	// GET method to generate meme image with a caption based on a topic
	server.GET("/api/generate", handlers.GenerateMemeHandler(services))
}
