export default async function handler(req, res) {
    try {
        const response = await fetch(process.env.API_URL + '/bots/edit/' + req.query.id[0], {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.AUTH_TOKEN
            },
            body: JSON.stringify(req.body)
        });

        if (response.status === 200) {
            const responseData = await response.json(); // Parseia a resposta para JSON
            return res.status(200).json(responseData);  // Retorna a resposta ao cliente
        } else {
            return res.status(response.status).json({ message: "Failed to edit bot", status: response.status });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal server error", error: e.message });
    }
}
