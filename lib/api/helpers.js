"use server";

const API_BASE_URL = process.env.API_BASE_URL;

export async function generateMeme(topic) {
    // Step 1 - Call the API endpoint with the topic to generate meme image
    const response = await fetch(`${API_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
    })

    // Step 2 - Convert the raw bytes to base64 string
    const responseData = await response.json()

    // Step 3 - return the response JSON
    return responseData
}