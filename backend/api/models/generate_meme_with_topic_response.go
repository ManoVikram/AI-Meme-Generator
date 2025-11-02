package models

type GenerateMemeWithTopicResponse struct {
	Image    []byte `json:"image"`
	Caption  string `json:"caption"`
	MimeType string `json:"mime_type"`
}
