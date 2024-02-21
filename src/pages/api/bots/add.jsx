export default async function handler(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" })
    }
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }
    if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_KEY) {
        return res.status(403).json({ message: "Forbidden" })
    }
    if (!req.body) {
        return res.status(400).json({ message: "Missing body" })
    }
    const data = await fetch(process.env.API_URL + "/bots/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.AUTH_TOKEN
        },
        body: JSON.stringify(req.body)
    }).catch((e) => {
        return res.status(e.status).json(e.message)
    })
    return res.status(200).json({ message: "Bot added successfully" })
}