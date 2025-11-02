package models

type GenerateMemeWithTopicRequest struct {
	Topic string `json:"topic" binding:"required"`
}
