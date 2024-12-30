import axios from 'axios';

export default async function handler(req, res) {
    try {
        // Realiza a requisição para obter o bot block
        const response = await axios.get(process.env.API_URL + '/botblock/' + req.query.id[0], {
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
}
