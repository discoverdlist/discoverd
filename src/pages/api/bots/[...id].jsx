import axios from 'axios';

export default async function handler(req, res) {
    const isApiKeyTrue = req.query.apiKey === "true";
    const botId = req.query.id[0];
    const apiUrl = `${process.env.API_URL}/bots/${botId}${isApiKeyTrue ? '?apiKey=true' : ''}`;
    
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        });

        if (response.status === 200) {
            if (req.query.type === 'invite') {
                const inviteUrl = response.data.invite || 
                    `https://discord.com/oauth2/authorize?client_id=${botId}&permissions=8&scope=bot%20applications.commands`;

                return res.redirect(302, inviteUrl);
            }

            return res.status(200).json(response.data);
        }
        
        return res.status(response.status).json({ message: "Error fetching bot data" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}
