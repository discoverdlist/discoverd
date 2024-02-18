import axios from 'axios';

export default async function handler(req, res) {
    const response = await axios.get(process.env.API_URL, {
        headers: {
            'Authorization': process.env.AUTH_TOKEN
        }
    }).catch(() => res.status(500).json({ message: "Internal server error" }))
    if (response.status === 200) {
        response.data.message = "Hello from the API"
        res.status(200).json(response.data)
    }
}