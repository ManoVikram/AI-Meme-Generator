import base64
from concurrent import futures
import os
from dotenv import load_dotenv
import grpc
from openai import OpenAI

from proto import service_pb2, service_pb2_grpc

class AIMemeGeneratorService(service_pb2_grpc.AIMemeGeneratorServiceServicer):
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
        image_bytes = base64.b64decode(image_base64)

        # Step 3 - Return the binary image data
        return image_bytes

    def generate_meme_caption(self, image):
        pass

    def GenerateMemeWithTopic(self, request, context):
        topic = request.topic

        # Step 1 - Generate image prompt from topic
        prompt = self.generate_image_prompt(topic=topic)

        # Step 2 - Create meme image from prompt
        image = self.create_meme_image(prompt=prompt)

        # Step 3 - Generate meme caption from image

        # Step 4 - Construct and return response

def serve():
    load_dotenv()
    assert os.getenv("OPENAI_API_KEY"), "OPENAI_API_KEY environment variable not set in the environment variables."

    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    service_pb2_grpc.add_AIMemeGeneratorServiceServicer_to_server(AIMemeGeneratorService(), server)

    server.add_insecure_port("[::]:50051")
    server.start()
    print("Server started on port 50051")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()