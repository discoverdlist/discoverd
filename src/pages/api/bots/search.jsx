import axios from 'axios';

export default async function handler(req, res) {
    if (req.query && req.query.search) {
        const response = await axios.get(process.env.API_URL + '/bots/search?search=' + req.query.search, {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        }).catch((e) => res.status(500).json({ message: "Internal server error", error: e }))
        if (response.status === 200) {
            res.status(200).json(response.data)
        }
    }
}