import axios from 'axios';

export default async function handler(req, res) {
    if (req.query && req.query.search) {
        try {
            const response = await axios.get(process.env.API_URL + '/bots/search?search=' + req.query.search, {
                headers: {
                    'Authorization': process.env.AUTH_TOKEN
                }
            });

            if (response.status === 200 && response.data) {
                return res.status(200).json(response.data);
            } else {
                return res.status(500).json({ message: "Internal server error" });
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal server error", error: e.message });
        }
    } else {
        return res.status(400).json({ message: "Missing 'search' parameter" });
    }
}
