
export default async function handler(req, res) {
    const response = await fetch(process.env.API_URL + '/bots/edit/' + req.query.id[0], {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTH_TOKEN
        },
        body: JSON.stringify(req.body)
    }).catch(() => res.status(500).json({ message: "Internal server error" }))
    if (response.status === 200) {
        return res.status(200).json(response.data)
    }
    return res.status(200).json(response.data)
}