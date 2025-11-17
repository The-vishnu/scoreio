import { Worker, workerData } from "worker_threads";
import fs from "fs";

export const startPdfProcessing = async (req, res) =>{
    const filePath = req.file.path;

    //recive the file
    res.status(201).json({message: "File is reived"});
    console.log("File is recived");
    console.log("file path: ", filePath);

    const worker = new Worker("./workers/pdfWorker.js", {
        workerData: { filePath: filePath }
    });
    
    worker.on('message', (message) => console.log(message));
    worker.on('error', (error) => console.log("error in worker thrade: ", error));
    return res.json({ message: "File uploaded succesfully" });
}
