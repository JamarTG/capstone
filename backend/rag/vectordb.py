import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle
from chunks import *

def embedSyllabusSection1(save_path=None):
    chunks=sectionOneSyllabus()
    
    # Create embeddings - using all relevant information
    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    texts_to_embed = [c for c in chunks]
    embeddings = model.encode(texts_to_embed, normalize_embeddings=True)
    
    # Create FAISS index
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings)

    # Save to disk if requested
    if save_path:
        # Save structured chunks
        with open(f"{save_path}_chunks.pkl", "wb") as f:
            pickle.dump(chunks, f)
        
        # Save embeddings
        np.save(f"{save_path}_embeddings.npy", embeddings)
        
        # Save FAISS index
        faiss.write_index(index, f"{save_path}_index.faiss")
    
    return chunks, embeddings, index


def querySectionOne(query, chunks, index):
    """
    Queries syllabus embeddings using raw query string and precomputed components.
    
    Args:
        query: Raw query string to search for
        structured_chunks: List of chunk dictionaries from sectionOneSyllabus()
        index: FAISS index (IndexFlatIP) with preloaded embeddings
        k: Number of results to return
        
    Returns:
        list: Tuples of (score, chunk_dict) ordered by relevance (high to low)
    """
    # Initialize model (same one used for embedding)
    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    
    # Encode query (with same normalization as original embeddings)
    query_embed = model.encode([query], normalize_embeddings=True)
    
    # Search index (using inner product for cosine similarity)
    distances, indices = index.search(query_embed, k=1)
    
    # Return (score, chunk) tuples for top-k results
    return [(float(score), chunks[idx]) 
            for idx, score in zip(indices[0], distances[0])]

def createSyllabusEmbedding(chunks, save_path=None):
    pass
    """
    Converts syllabus chunks into structured format and creates embeddings.
    Stores the entire original statement along with parsed components.
    Optionally saves to disk.
    
    Args:
        chunks: List of raw syllabus text chunks
        save_path: (optional) Path to save embeddings (without extension)
        
    Returns:
        tuple: (structured_chunks, embeddings, index)
    """
    # Convert raw chunks into structured format
    structured_chunks = []
    for raw_chunk in chunks:
        lines = raw_chunk.strip().split("\n")
        section = lines[0].split(":")[1].strip()
        objective = lines[1].split(":")[1].strip()
        description = lines[2].split(":", 1)[1].strip()
        content = lines[3].split(":", 1)[1].strip()

        structured_chunks.append({
            "full_statement": raw_chunk,  # Store the complete original text
            "section": section,
            "objective": objective,
            "description": description,
            "content": content
        })

    # Create embeddings - using all relevant information
    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    texts_to_embed = [f"{c['section']} {c['objective']} {c['description']} {c['content']}" for c in structured_chunks]
    embeddings = model.encode(texts_to_embed, normalize_embeddings=True)
    
    # Create FAISS index
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings)
    
    # Save to disk if requested
    if save_path:
        # Save structured chunks
        with open(f"{save_path}_chunks.pkl", "wb") as f:
            pickle.dump(structured_chunks, f)
        
        # Save embeddings
        np.save(f"{save_path}_embeddings.npy", embeddings)
        
        # Save FAISS index
        faiss.write_index(index, f"{save_path}_index.faiss")
    
    return structured_chunks, embeddings, index

def loadSyllabusEmbedding(load_path):
    """
    Loads saved embeddings from disk.
    
    Args:
        load_path: Path prefix where files are saved (without extension)
        
    Returns:
        tuple: (structured_chunks, embeddings, index)
    """
    # Load structured chunks
    with open(f"{load_path}_chunks.pkl", "rb") as f:
        structured_chunks = pickle.load(f)
    
    # Load embeddings
    embeddings = np.load(f"{load_path}_embeddings.npy")
    
    # Load FAISS index
    index = faiss.read_index(f"{load_path}_index.faiss")
    
    return structured_chunks, embeddings, index

def querySyllabusEmbedding(query, embedding_path="syllabus_embeddings", k=3):
    """
    Queries the syllabus embeddings from saved files and prints formatted results.
    
    Args:
        query: Search query string
        embedding_path: Path prefix where embedding files are saved (without extension)
        k: Number of results to return
        
    Returns:
        list: Top matching results with scores
    """
    # Load the saved embeddings
    try:
        structured_chunks, _, index = loadSyllabusEmbedding(embedding_path)
    except FileNotFoundError:
        print(f"Error: Could not find embedding files at path '{embedding_path}'")
        print("Please make sure to run createSyllabusEmbedding() first to create the embeddings.")
        return []

    # Encode query
    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    query_embed = model.encode([query], normalize_embeddings=True)
    
    # Search index
    distances, indices = index.search(query_embed, k=k)
    
    results = []
    for i, (idx, score) in enumerate(zip(indices[0], distances[0]), 1):
        chunk = structured_chunks[idx]
        results.append({
            "rank": i,
            "score": float(score),
            "section": chunk["section"],
            "objective": chunk["objective"],
            "description": chunk["description"],
            "content": chunk["content"]
        })
    
    return results

# Example usage:
if __name__ == "__main__":
    # First create and save the embeddings (only needs to be done once)
    # Uncomment this line to create embeddings (do this first)
    chunks=syllabusChunks()
    createSyllabusEmbedding(chunks, save_path="syllabus_embeddings")
    
    # Then you can query the saved embeddings like this:
    user_query = 'Computer Fundamentals and Information Processing'
    
    # Query the embeddings - this will automatically print formatted results
    results = querySyllabusEmbedding(user_query, embedding_path="syllabus_embeddings", k=15)
    
    # If you want to programmatically access the results, they're in the 'results' variable
    # For example:
    print("\nRaw results data structure:")
    for i, result in enumerate(results, 1):
        print(f"\nResult {i}:")
        print(f"Score: {result['score']:.3f}")
        print(f"Section: {result['section']}")
        print(f"Objective: {result['objective']}")
        print(f"Description: {result['description']}")
        print(f"Content: {result['content']}")