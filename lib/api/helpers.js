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
    const imageBuffer = Buffer.from(responseData.image).toString('base64')

    // Step 3 - replace the value for the 'image' key in the response JSON with the base64 string
    responseData.image = `data:${responseData.mime_type};base64,${imageBuffer}`

    // Step 4 - return the response JSON
    return responseData
}