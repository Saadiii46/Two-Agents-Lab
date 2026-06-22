from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from langchain_cohere import CohereEmbeddings
from langchain_qdrant import QdrantVectorStore
from dotenv import load_dotenv
from langchain_core.documents import Document
import logging
import os

logger = logging.getLogger(__name__)

load_dotenv()

QDRANT_CLUSTER_ENDPOINT = os.getenv("QDRANT_CLUSTER_ENDPOINT", "")
QDRANT_API_KEY = os.getenv("QDRANT_API_KEY", "")
COHERE_API_KEY = os.getenv("COHERE_API_KEY", "")

docs = [
Document(page_content="The automobile requires a massive financial investment.", metadata={"topic": "cars"}),
Document(page_content="A tiny feline was slumbering peacefully on the rug.", metadata={"topic": "animals"}),
Document(page_content="Heavy precipitation is expected to flood the city streets tomorrow.", metadata={"topic": "weather"}),
]

class RAGClient:
    def __init__(self, embeddings_model="embed-english-v3.0"):
        self._client = QdrantClient(
            url=QDRANT_CLUSTER_ENDPOINT,
            api_key=QDRANT_API_KEY,
            cloud_inference=True
        )
        self._embeddings = CohereEmbeddings(model=embeddings_model)
        self._create_collection()
        self.vector_store = QdrantVectorStore(
                client=self._client,
                collection_name="two_agents_lab_knowledge",
                embedding=self._embeddings
            )  
  
        
    def _create_collection(self):
        try:
            if not self._client.collection_exists("two_agents_lab_knowledge"):
                self._client.create_collection(
                    collection_name="two_agents_lab_knowledge",
                    vectors_config=VectorParams(size=1024, distance=Distance.COSINE)
                )  
            
        except Exception as e:
            logger.error(f"Failed to create collection in Qdrant: {e}")
            raise
     
            
    def add_document(self, document: list[Document] | None = None):
        try:
            self.vector_store.add_documents(document)
        
        except Exception as e:
            logger.error(f"Failed to save document in Qdrant collection: {e}")
    
        
    def search(self, user_query: str):
        try:
            print(f"User Query: {user_query}")
            
            results = self.vector_store.similarity_search(
                user_query,
                k=2
            )
            
            return results
            
        except Exception as e:
            logger.error(f"Failed to search: {e}")
            return []
           
            
if __name__ == "__main__":
    qdrant = RAGClient()
    
    # qdrant.add_document(docs)
    
    results = qdrant.search("Is it going to rain heavily?")
    
    for doc in results:
        print(doc.page_content)
        print(doc.metadata)