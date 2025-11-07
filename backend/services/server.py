import base64
import os
from concurrent import futures

import grpc
from dotenv import load_dotenv
from openai import OpenAI
from proto import service_pb2, service_pb2_grpc


class AIMemeGeneratorService(service_pb2_grpc.AIMemeGeneratorServiceServicer):
    def encode_image_to_base64(self, image_bytes):
        return base64.b64encode(image_bytes).decode('utf-8')

    def generate_image_prompt(self, topic):
        # Step 1 - Initialize OpenAI API client
        client = OpenAI()

        # Step 2 - Feed the topic to the LLM of choice to generate an image prompt
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
                {
                    "role": "assistant",
                    "content": "You are a creative meme prompt generator."
                },
                {
                    "role": "user",
                    "content": f"Generate a creative and funny meme image prompt based on the following topic: '{topic}'. The prompt should be detailed enough for an AI image generator to create an image. Keep it detailed and engaging."
                }
            ]
        )

        # Step 3 - Return the generated image prompt
        return response.output_text

    def create_meme_image(self, prompt):
        # Step 1 - Initialize OpenAI API client
        client = OpenAI()

        # Step 2 - Use the Image API to generate an image based on the prompt
        result = client.images.generate(
            model="gpt-image-1-mini",
            prompt=prompt,
        )

        image_base64 = result.data[0].b64_json
        # image_bytes = base64.b64decode(image_base64)

        # Step 3 - Return the base64 image data
        return image_base64

    def generate_meme_caption(self, image):
        # Step 1 - Initialize OpenAI API client
        client = OpenAI()

        # Step 2 - Convert the bytes image to base64 string
        # image_base64 = self.encode_image_to_base64(image)

        # Step 3 - Generate a caption for the meme image using the LLM of choice
        response = client.responses.create(
            model="gpt-4o-mini",
            input=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "Generate a playful, funny, a little dramatic but not cringe and engaging caption for the meme image provided. No hashtags. No emojis (unless appropriate)."
                        },
                        {
                            "type": "input_image",
                            "image_url": f"data:image/png;base64,{image}"
                        }
                    ]
                }
            ]
        )

        # Step 4 - Return the generated caption
        return response.output_text

    def GenerateMemeWithTopic(self, request, context):
        topic = request.topic

        # Step 1 - Generate image prompt from topic
        prompt = self.generate_image_prompt(topic=topic)

        # Step 2 - Create meme image from prompt
        image_base64 = self.create_meme_image(prompt=prompt)

        # Step 3 - Generate meme caption from image
        caption = self.generate_meme_caption(image=image_base64)

        # Step 4 - Construct and return response
        return service_pb2.GenerateMemeWithTopicResponse(
            image=f"data:image/png;base64,{image_base64}",
            caption=caption,
            mime_type="image/png"
        )

def serve():
    load_dotenv()
    assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY environment variable not set in the environment variables."

    MAX_MESSAGE_LENGTH = 50 * 1024 * 1024  # 50MB

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10), options=[
        ('grpc.max_send_message_length', MAX_MESSAGE_LENGTH),
        ('grpc.max_receive_message_length', MAX_MESSAGE_LENGTH),
    ])
    service_pb2_grpc.add_AIMemeGeneratorServiceServicer_to_server(AIMemeGeneratorService(), server)

    server.add_insecure_port("[::]:50051")
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()