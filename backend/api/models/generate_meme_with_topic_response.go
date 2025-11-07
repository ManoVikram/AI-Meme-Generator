package models

type GenerateMemeWithTopicResponse struct {
	Image    string `json:"image"`
	Caption  string `json:"caption"`
	MimeType string `json:"mime_type"`
}
