import { workerData, parentPort } from "worker_threads";
import { Buffer } from "buffer";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CloudClient } from "chromadb";
import { pipeline } from "@xenova/transformers";
import fs from "fs";
import { text } from "stream/consumers";

const { filePath } = workerData;
const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE
});

function cleanResumeText(text) {
    return text
        .replace(/ï /g, "")   // weird utf-8
        .replace(/Linkdin/gi, "LinkedIn")
        .replace(/Stak/gi, "Stack")
        .replace(/20\s?2\s?3/g, "2023")
        .replace(/20\s?2\s?5/g, "2025")
        .replace(/8.4\s?0\/10/g, "8.40/10")
        .replace(/\s+,/g, ",") // remove space before comma
        .replace(/ ,/g, ",")
        .replace(/ \./g, ".")
        .replace(/\. \./g, ".")
        .replace(/Purpose:/g, "\nPurpose:")
        .replace(/Ticket Price Calculator/g, "\nTicket Price Calculator")
        .replace(/Transaction Management/g, "\nTransaction Management")
        .replace(/Education/g, "\nEducation")
        .trim();
}

async function processsPdf(prams) {

    try {
        console.log("Job: ", filePath);

        const loadingTask = getDocument(filePath);
        const pdf = await loadingTask.promise;

        let fullText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str).join(" ");
            fullText += strings + "\n";
        }
        let cleanedText = cleanResumeText(fullText);

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 250,
            chunkOverlap: 0
        });

        const texts = await textSplitter.splitText(cleanedText);

        const embadding = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
        const responce = await embadding(texts, {
            pooling: "mean",
            normalize: true
        });

        const vector = responce.tolist();

        const collection = await client.getOrCreateCollection({
            name: "resumeTextCollection"
        });

        collection.add({
            ids: ['1'],
            document: ['cat'],
            embeddings: [[1, 2, 4, 6]]
        });
        

        console.log("embaddigs: ", vector);
        console.log("finle chunks: ", texts)

        parentPort.postMessage("PDF parse and spliting is done successfully!!!");
    } catch (error) {
        console.log("error in pdf parsing...", error);
    }

    // fs.unlinkSync(filePath);
}

processsPdf();
