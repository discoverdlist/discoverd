import axios from 'axios';

export default async function handler(req, res) {
    if (req.query.apiKey === "true") {
        const response = await axios.get(process.env.API_URL + '/bots/' + req.query.id[0] + '?apiKey=true', {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        }).catch(() => res.status(500).json({ message: "Internal server error" }))
        if (response.status === 200) {
            if (req.query && req.query.type) {
                if (req.query.type === 'invite') {
                    if (response.invite) {
                        return res.redirect(302, response.invite);
                    } else {
                        return res.redirect(302, `https://discord.com/oauth2/authorize?client_id=${req.query.id[0]}&permissions=8&scope=bot%20applications.commands`)
                    }
                }
            }
            return res.status(200).json(response.data)
        }
        return res.status(200).json(response.data)
    } else {
        const response = await axios.get(process.env.API_URL + '/bots/' + req.query.id[0], {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        }).catch(() => res.status(500).json({ message: "Internal server error" }))
        if (response.status === 200) {
            if (req.query && req.query.type) {
                if (req.query.type === 'invite') {
                    if (response.invite) {
                        return res.redirect(302, response.invite);
                    } else {
                        return res.redirect(302, `https://discord.com/oauth2/authorize?client_id=${req.query.id[0]}&permissions=8&scope=bot%20applications.commands`)
                    }
                }
            }
            return res.status(200).json(response.data)
        }
        return res.status(200).json(response.data)
    }
}