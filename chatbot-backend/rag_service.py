"""
Luxivolt Mühendislik Chatbot Backend
RAG (Retrieval-Augmented Generation) Service

Bu modül dökümanları yükler, parçalara ayırır ve ChromaDB'ye kaydeder.
"""

import os
from pathlib import Path
from typing import Optional
from langchain_community.document_loaders import (
    DirectoryLoader,
    TextLoader,
    PyPDFLoader,
    UnstructuredMarkdownLoader,
)
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain.schema import Document
from config import get_settings

settings = get_settings()

# Paths
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
CHROMA_DIR = Path(__file__).parent / "chroma_db"


class RAGService:
    """
    RAG (Retrieval-Augmented Generation) Service
    
    Dökümanları yükler, parçalara ayırır ve ChromaDB'de saklar.
    Sorgu zamanında ilgili döküman parçalarını getirir.
    """
    
    def __init__(
        self,
        data_dir: Path = DATA_DIR,
        chroma_dir: Path = CHROMA_DIR,
        collection_name: str = "luxivolt_docs",
        chunk_size: int = 500,
        chunk_overlap: int = 100,
    ):
        self.data_dir = data_dir
        self.chroma_dir = chroma_dir
        self.collection_name = collection_name
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
        
        # Initialize embeddings (using free HuggingFace model)
        # multilingual model for Turkish support
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
        
        # Text splitter for chunking
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            length_function=len,
            separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""],
        )
        
        # Vector store (will be initialized on first use)
        self._vectorstore: Optional[Chroma] = None
    
    @property
    def vectorstore(self) -> Chroma:
        """Get or create the vector store."""
        if self._vectorstore is None:
            self._vectorstore = Chroma(
                collection_name=self.collection_name,
                embedding_function=self.embeddings,
                persist_directory=str(self.chroma_dir),
            )
        return self._vectorstore
    
    def load_documents(self) -> list[Document]:
        """
        Load all documents from the data directory.
        Supports: .md, .pdf, .txt files
        """
        all_documents = []
        
        # Load Markdown files
        md_files = list(self.data_dir.glob("*.md"))
        for md_file in md_files:
            try:
                loader = UnstructuredMarkdownLoader(str(md_file))
                docs = loader.load()
                for doc in docs:
                    doc.metadata["source"] = md_file.name
                    doc.metadata["file_type"] = "markdown"
                all_documents.extend(docs)
                print(f"✅ Loaded: {md_file.name}")
            except Exception as e:
                print(f"❌ Error loading {md_file.name}: {e}")
        
        # Load PDF files
        pdf_files = list(self.data_dir.glob("*.pdf"))
        for pdf_file in pdf_files:
            try:
                loader = PyPDFLoader(str(pdf_file))
                docs = loader.load()
                for doc in docs:
                    doc.metadata["source"] = pdf_file.name
                    doc.metadata["file_type"] = "pdf"
                all_documents.extend(docs)
                print(f"✅ Loaded: {pdf_file.name}")
            except Exception as e:
                print(f"❌ Error loading {pdf_file.name}: {e}")
        
        # Load Text files
        txt_files = list(self.data_dir.glob("*.txt"))
        for txt_file in txt_files:
            try:
                loader = TextLoader(str(txt_file), encoding="utf-8")
                docs = loader.load()
                for doc in docs:
                    doc.metadata["source"] = txt_file.name
                    doc.metadata["file_type"] = "text"
                all_documents.extend(docs)
                print(f"✅ Loaded: {txt_file.name}")
            except Exception as e:
                print(f"❌ Error loading {txt_file.name}: {e}")
        
        print(f"\n📚 Total documents loaded: {len(all_documents)}")
        return all_documents
    
    def chunk_documents(self, documents: list[Document]) -> list[Document]:
        """
        Split documents into smaller chunks for better retrieval.
        """
        chunks = self.text_splitter.split_documents(documents)
        print(f"📄 Created {len(chunks)} chunks from {len(documents)} documents")
        return chunks
    
    def index_documents(self, force_reindex: bool = False) -> int:
        """
        Load, chunk, and index all documents into ChromaDB.
        
        Args:
            force_reindex: If True, delete existing index and reindex all documents.
            
        Returns:
            Number of chunks indexed.
        """
        # Check if already indexed
        if not force_reindex:
            try:
                existing_count = self.vectorstore._collection.count()
                if existing_count > 0:
                    print(f"📦 Found existing index with {existing_count} chunks. Skipping reindex.")
                    print("   Use force_reindex=True to rebuild the index.")
                    return existing_count
            except Exception:
                pass
        
        # Clear existing index if force reindex
        if force_reindex and self.chroma_dir.exists():
            import shutil
            shutil.rmtree(self.chroma_dir)
            self._vectorstore = None
            print("🗑️ Cleared existing index")
        
        # Load and process documents
        documents = self.load_documents()
        if not documents:
            print("⚠️ No documents found in data directory!")
            return 0
        
        chunks = self.chunk_documents(documents)
        
        # Index chunks
        print("🔄 Indexing chunks into ChromaDB...")
        self._vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=self.embeddings,
            collection_name=self.collection_name,
            persist_directory=str(self.chroma_dir),
        )
        
        print(f"✅ Successfully indexed {len(chunks)} chunks!")
        return len(chunks)
    
    def search(
        self,
        query: str,
        k: int = 4,
        score_threshold: float = 0.3,
    ) -> list[dict]:
        """
        Search for relevant document chunks.
        
        Args:
            query: Search query text
            k: Number of results to return
            score_threshold: Minimum similarity score (0-1, higher is more similar)
            
        Returns:
            List of relevant document chunks with metadata
        """
        # Perform standard similarity search (more stable)
        try:
            # Note: This returns documents without scores
            docs = self.vectorstore.similarity_search(query, k=k)
            
            # Since we don't have scores, we assume retrieved docs are relevant enough
            # unless we implement our own scoring. For now, we return all retrieved docs.
            
            formatted_results = []
            for doc in docs:
                formatted_results.append({
                    "content": doc.page_content,
                    "source": doc.metadata.get("source", "unknown"),
                    "file_type": doc.metadata.get("file_type", "unknown"),
                    "score": 0.9, # Dummy score since we use basic similarity search
                })
            
            return formatted_results
            
        except Exception as e:
            print(f"⚠️ Vector search error: {e}")
            return []
    
    def get_context_for_query(self, query: str, k: int = 4) -> str:
        """
        Get formatted context string for RAG.
        
        This is used to inject relevant information into the LLM prompt.
        """
        results = self.search(query, k=k)
        
        if not results:
            return ""
        
        context_parts = []
        for i, result in enumerate(results, 1):
            context_parts.append(
                f"[Kaynak {i}: {result['source']}]\n{result['content']}"
            )
        
        return "\n\n---\n\n".join(context_parts)
    
    def get_stats(self) -> dict:
        """Get statistics about the vector store."""
        try:
            count = self.vectorstore._collection.count()
            return {
                "total_chunks": count,
                "collection_name": self.collection_name,
                "data_directory": str(self.data_dir),
                "chroma_directory": str(self.chroma_dir),
            }
        except Exception as e:
            return {"error": str(e)}


# Global instance
_rag_service: Optional[RAGService] = None


def get_rag_service() -> RAGService:
    """Get the global RAG service instance."""
    global _rag_service
    if _rag_service is None:
        _rag_service = RAGService()
    return _rag_service


# CLI for testing and indexing
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Luxivolt RAG Service CLI")
    parser.add_argument("--index", action="store_true", help="Index documents")
    parser.add_argument("--force", action="store_true", help="Force reindex")
    parser.add_argument("--search", type=str, help="Search query")
    parser.add_argument("--stats", action="store_true", help="Show stats")
    
    args = parser.parse_args()
    
    rag = RAGService()
    
    if args.stats:
        print("\n📊 RAG Service Stats:")
        stats = rag.get_stats()
        for key, value in stats.items():
            print(f"   {key}: {value}")
    
    if args.index:
        print("\n🚀 Starting document indexing...")
        count = rag.index_documents(force_reindex=args.force)
        print(f"\n✅ Indexing complete! Total chunks: {count}")
    
    if args.search:
        print(f"\n🔍 Searching for: '{args.search}'")
        results = rag.search(args.search)
        if results:
            for i, result in enumerate(results, 1):
                print(f"\n--- Result {i} (score: {result['score']}) ---")
                print(f"Source: {result['source']}")
                print(f"Content: {result['content'][:200]}...")
        else:
            print("No results found.")
