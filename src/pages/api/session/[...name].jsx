import { getSession } from "next-auth/react"

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    try {
        const session = await getSession({ req })
        if (session) {
            return res.status(200).json(session)
        } else {
            return res.status(401).json({ message: "Unauthorized - No session found" })
        }
    } catch (error) {
        console.error("Error fetching session:", error)
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}
