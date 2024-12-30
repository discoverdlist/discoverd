export default async function handler(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_KEY) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (!req.body) {
        return res.status(400).json({ message: "Missing body" });
    }

    try {
        const response = await fetch(process.env.API_URL + "/bots/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": process.env.AUTH_TOKEN
            },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add bot");
        }

        return res.status(200).json({ message: "Bot added successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message || "Internal server error" });
    }
}
