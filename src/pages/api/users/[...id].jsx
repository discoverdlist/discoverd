import axios from 'axios';

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method Not Allowed" })
    }

    const { id } = req.query;
    if (!id || !id[0]) {
        return res.status(400).json({ message: "Bad Request - Missing or invalid id" });
    }

    try {
        const response = await axios.get(`${process.env.API_URL}/users/${id[0]}`, {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        });
        if (response.status === 200) {
            return res.status(200).json(response.data);
        } else {
            return res.status(response.status).json({ message: "Error retrieving data" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
