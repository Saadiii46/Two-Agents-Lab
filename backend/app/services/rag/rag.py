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
    Document(
        page_content="""
        AI Nexus Agency is a full-service artificial intelligence consulting firm that helps businesses
        automate workflows, build custom AI applications, and integrate large language models into
        existing products. We specialize in AI strategy, implementation, and ongoing optimization.
        """,
        metadata={"topic": "about-us"}
    ),

    Document(
        page_content="""
        Our services include AI chatbot development, custom GPT solutions, workflow automation,
        AI-powered knowledge bases, retrieval-augmented generation (RAG) systems, computer vision,
        and predictive analytics. We work with startups, e-commerce brands, SaaS companies,
        healthcare providers, and enterprise organizations.
        """,
        metadata={"topic": "services"}
    ),

    Document(
        page_content="""
        We have successfully delivered over 150 AI projects worldwide, reducing operational costs
        by up to 40% and improving customer response times by 85%. Our team consists of AI engineers,
        machine learning specialists, prompt engineers, and product consultants dedicated to creating
        scalable intelligent systems.
        """,
        metadata={"topic": "case-studies"}
    ),

    Document(
        page_content="""
        AI Nexus Agency offers flexible engagement models including one-time development projects,
        monthly retainers, dedicated AI teams, and technical advisory services. We provide free
        discovery calls to understand business goals and recommend the best AI solutions.
        """,
        metadata={"topic": "pricing"}
    ),

    Document(
        page_content="""
        Clients choose AI Nexus Agency because of our transparent communication, rapid development
        cycles, and focus on measurable business outcomes. Testimonials highlight increased lead
        generation, automated customer support, and streamlined internal operations after partnering
        with our team.
        """,
        metadata={"topic": "testimonials"}
    ),

    Document(
        page_content="""
        Contact our team to schedule an AI strategy session. Whether you need a custom chatbot,
        an AI-powered SaaS feature, document intelligence, or process automation, we can help you
        design, build, and deploy production-ready solutions tailored to your business needs.
        """,
        metadata={"topic": "contact"}
    ),
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
    
        
    def search(self, user_query: str) -> list[Document]:
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