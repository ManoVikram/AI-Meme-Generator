from concurrent import futures
import os
from dotenv import load_dotenv
import grpc

from proto import service_pb2, service_pb2_grpc

class AIMemeGeneratorService(service_pb2_grpc.AIMemeGeneratorServiceServicer):
    def SendTopic(self, request, context):
        pass

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