import { CloudClient } from "chromadb";
import { pipeline } from "@xenova/transformers";
import dotenv from 'dotenv';

dotenv.config();

const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE
});

export const ResourcesSearching = async (prompt) => {
    const embadding = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

    const embaddedRespose = await embadding(prompt, {
        pooling: "mean",
        normalize: true
    });

    // console.log(embaddedRespose);

    const embaddedVector = Array.from(embaddedRespose.data);

    const collection = await client.getCollection({
        name: "resumeTextCollection",
        embeddingFunction: null
    });

    const total = await collection.count();
    const query = await collection.query({
        queryEmbeddings: [embaddedVector],
        nResult: total,
        include: ['distances', 'documents', 'metadatas']
    });
   
    console.log(JSON.stringify(query, null, 2));

    return JSON.stringify(query, null, 2);

}     