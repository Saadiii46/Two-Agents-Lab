
export interface MessageResponse {
    success: string;
    messageData: string;
}

const BASE_URL = "http://localhost:8000";

export async function UserChat(userMessage: string): Promise<MessageResponse> {
    try {
        const response = await fetch(`${BASE_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"message": userMessage})
        })

        const finalResponse = await response.json()

        return {
            success: "ok",
            messageData: finalResponse
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        return {
            success: `error: ${error}`,
            messageData: ""
        }
    }
}