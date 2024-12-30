import axios from 'axios';

const fetchBots = async (filter = '') => {
    try {
        const url = filter 
            ? `${process.env.API_URL}/bots?filter=${filter}`
            : `${process.env.API_URL}/bots`;

        const response = await axios.get(url, {
            headers: {
                'Authorization': process.env.AUTH_TOKEN
            }
        });

        if (response.status === 200 && response.data) {
            return { success: true, data: response.data };
        } else {
            return { success: false, message: 'No data found or API error' };
        }
    } catch (error) {
        return { success: false, message: 'Internal server error', error };
    }
};

export default async function handler(req, res) {
    const { filter } = req.query;

    const { success, data, message, error } = await fetchBots(filter);

    if (success) {
        return res.status(200).json(data);
    } else {
        return res.status(500).json({ message, error });
    }
}
