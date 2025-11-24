import { CloudClient } from "chromadb";
import { pipeline } from "@xenova/transformers";

const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY,
    tenant: process.env.CHROMA_TENANT,
    database: process.env.CHROMA_DATABASE
});

export const promptEmbadder = async (prompt) => {
    const embadding = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");

    const embaddedRespose = embadding(prompt, {
        pooling: "mean",
        normalize: true
    });

    const collection = await client.getCollection({
        name: "resumeTextCollection",
        embeddingFunction: null
    });

    collection


}