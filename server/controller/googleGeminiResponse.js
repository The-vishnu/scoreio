import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API);

export const GoogleGeminiRespose = async (req, res) => {
    // const userPrompt = "hey hii can you plz tell me which main points should to be add in our resume";
    try {
        const { prompt } = req.body;
        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" })

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.status(200).send({
            success: true,
            replay: result
        });

        console.log("Gemini Response: ", result);
    } catch (error) {
        console.log("Error in Gemini AI: ", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong while talking to Gemini."
        });
    }
}