
export interface MessageResponse {
    success: string;
    messageData: string;
}

const BASE_URL = "http://localhost:8000";

// Local knowledge base fallback — used when backend is not running.....
// Once backend is up with API keys, the real API response is used automatically......
const knowledgeBase = [
    {
        keywords: ["hello", "hi", "hey", "greet"],
        response: "Hello! Welcome to Two Agents Lab. I'm here to help you learn about our AI solutions. Feel free to ask about our services, pricing, or how we can help your business!"
    },
    {
        keywords: ["about", "who", "what is", "agency", "company", "you"],
        response: "Two Agents Lab is a full-service AI consulting firm that helps businesses automate workflows, build custom AI applications, and integrate large language models into existing products. We specialize in AI strategy, implementation, and ongoing optimization."
    },
    {
        keywords: ["service", "offer", "do", "chatbot", "gpt", "rag", "vision", "build"],
        response: "Our services include AI chatbot development, custom GPT solutions, workflow automation, AI-powered knowledge bases, retrieval-augmented generation (RAG) systems, computer vision, and predictive analytics. We work with startups, e-commerce brands, SaaS companies, healthcare providers, and enterprise organizations."
    },
    {
        keywords: ["case", "result", "project", "delivered", "success", "portfolio"],
        response: "We have successfully delivered over 150 AI projects worldwide, reducing operational costs by up to 40% and improving customer response times by 85%. Our team consists of AI engineers, machine learning specialists, prompt engineers, and product consultants."
    },
    {
        keywords: ["price", "pricing", "cost", "engagement", "model", "retainer", "plan"],
        response: "We offer flexible engagement models including one-time development projects, monthly retainers, dedicated AI teams, and technical advisory services. We provide free discovery calls to understand business goals and recommend the best AI solutions."
    },
    {
        keywords: ["testimonial", "review", "client", "why", "choose"],
        response: "Clients choose us because of our transparent communication, rapid development cycles, and focus on measurable business outcomes. Testimonials highlight increased lead generation, automated customer support, and streamlined internal operations."
    },
    {
        keywords: ["contact", "schedule", "call", "reach", "talk", "meet", "muhammad", "mehwish", "developer", "founder", "creator", "name", "team", "who made", "built by"],
        response: "Two Agents Lab was founded by Muhammad Saad and Mehwish Fatima. They are the developers and architects behind our AI solutions. Feel free to reach out to schedule an AI strategy session!"
    },
    {
        keywords: ["autonomous", "agent", "ai agent"],
        response: "We build autonomous AI agents that can handle complex workflows end-to-end — from customer support to data processing. Our agents leverage LangGraph and LLMs to reason, use tools, and take actions with minimal human intervention."
    },
    {
        keywords: ["speed", "fast", "process", "quick", "pricing"],
        response: "Our development process is fast and iterative. We typically deliver MVPs within 2-4 weeks and full production systems within 6-8 weeks. We use Groq for ultra-fast LLM inference and optimized RAG pipelines for real-time responses."
    },
    {
        keywords: ["integration", "sample", "example", "code", "demo", "show"],
        response: "We provide seamless API integrations with your existing tech stack. Our solutions come with comprehensive documentation, sample code, and dedicated support to ensure smooth deployment and adoption."
    },
];

function localFallback(userMessage: string): string {
    const lower = userMessage.toLowerCase();
    let bestMatch = knowledgeBase[0];
    let bestScore = 0;

    for (const entry of knowledgeBase) {
        const score = entry.keywords.filter(kw => lower.includes(kw)).length;
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    if (bestScore === 0) {
        return "Thanks for your question! I can help you with information about our services, pricing, case studies, and team. Feel free to ask about anything related to Two Agents Lab!";
    }

    return bestMatch.response;
}

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
        // Backend not available ..... fall back to local responses.
     
        console.log(`Backend unavailable, using local fallback: ${error}`)
        return {
            success: "ok",
            messageData: localFallback(userMessage)
        }
    }
}