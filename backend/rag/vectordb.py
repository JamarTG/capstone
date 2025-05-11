import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle
from chunks import *


def createSyllabusEmbedding(chunks, save_path):
    
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
    
    structured_chunks = []
    for raw_chunk in chunks:
        lines = raw_chunk.strip().split("\n")
        description = lines[0].split(":", 1)[1].strip()
        content = lines[1].split(":", 1)[1].strip()

        structured_chunks.append({
            "full_statement": raw_chunk,  
            "description": description,
            "content": content
        })

    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    texts_to_embed = [f"{c['description']} {c['content']}" for c in structured_chunks]
    embeddings = model.encode(texts_to_embed, normalize_embeddings=True)
    
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings)
    

    if save_path:
        data_to_save = {
            "structured_chunks": structured_chunks,
            "embeddings": embeddings,
            "faiss_index": index  
        }
        
        with open(f"{save_path}.pkl", "wb") as f:
            pickle.dump(data_to_save, f)
    
    return structured_chunks, embeddings, index


def loadSyllabusEmbedding(load_path):
    """
    Loads saved embeddings from disk.
    
    Args:
        load_path: Path prefix where files are saved (without extension)
        
    Returns:
        tuple: (structured_chunks, embeddings, index)
    """

    with open(f"{load_path}_chunks.pkl", "rb") as f:
        structured_chunks = pickle.load(f)

    embeddings = np.load(f"{load_path}_embeddings.npy")

    index = faiss.read_index(f"{load_path}_index.faiss")
    
    return structured_chunks, embeddings, index


def get_similarity_scores(query, embedding_path, k=1):
    """
    Queries the syllabus embeddings and returns similarity scores.
    
    Args:
        query: Search query string
        embedding_path: Path prefix where embedding files are saved (without extension)
        k: Number of results to return
        
    Returns:
        list: Top matching similarity scores
    """
    
    try:
        with open(f"{embedding_path}.pkl", "rb") as f:
            loaded_data = pickle.load(f)
        
        embeddings = loaded_data["embeddings"]
        index = loaded_data["faiss_index"]
        
    except FileNotFoundError:
        print(f"Error: Could not find embedding file at path '{embedding_path}_all_data.pkl'")
        print("Please make sure to run createSyllabusEmbedding() first to create the embeddings.")
        return []
    except KeyError as e:
        print(f"Error: Missing expected key in loaded data - {e}")
        return []


    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    query_embed = model.encode([query], normalize_embeddings=True)

    distances, _ = index.search(query_embed, k=k)
    return [round(float(score), 2) for score in distances[0]]


def get_matching_chunks(query, embedding_path, k=1):
    """
    Queries the syllabus embeddings and returns matching chunks.
    
    Args:
        query: Search query string
        embedding_path: Path prefix where embedding files are saved (without extension)
        k: Number of results to return
        
    Returns:
        list: Top matching chunks (combined description and content)
    """

    try:
        with open(f"{embedding_path}.pkl", "rb") as f:
            loaded_data = pickle.load(f)
        
        structured_chunks = loaded_data["structured_chunks"]
        embeddings = loaded_data["embeddings"]
        index = loaded_data["faiss_index"]
        
    except FileNotFoundError:
        print(f"Error: Could not find embedding file at path '{embedding_path}_all_data.pkl'")
        print("Please make sure to run createSyllabusEmbedding() first to create the embeddings.")
        return []
    except KeyError as e:
        print(f"Error: Missing expected key in loaded data - {e}")
        return []


    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    query_embed = model.encode([query], normalize_embeddings=True)

    distances, indices = index.search(query_embed, k=k)
    
    results = []
    for i, idx in enumerate(indices[0]): # changed this line
        chunk = structured_chunks[idx]

        combined_text = f"Description: {chunk['description']} Content: {chunk['content']}"
        
        if distances[0][i] >= 0.60: #context relevancy check
            results.append(combined_text)


    
    return results

if __name__ == "__main__":
    # First create and save the embeddings (only needs to be done once)
    # Uncomment this line to create embeddings (do this first)
    
    #chunks=sectionEightSyllabus()
    #createSyllabusEmbedding(chunks, save_path="section8_syllabus_embed")
    
    # Then you can query the saved embeddings like this:
    user_query = """
Which of the following is not a type of network?
"""
    
    # Query the embeddings - this will automatically print formatted results
    results = get_matching_chunks(user_query, embedding_path="section2_syllabus_embed", k=1)
    print(results)
    # If you want to programmatically access the results, they're in the 'results' variable
    # For example:
    """
    print("\nRaw results data structure:")
    for i, result in enumerate(results, 1):
        print(f"\nResult {i}:")
        print(f"Score: {result['score']:.3f}")
        print(f"Description: {result['description']}")
        print(f"Content: {result['content']}")

    """