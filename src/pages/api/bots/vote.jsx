export default async function handler(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (req.headers.authorization !== process.env.NEXT_PUBLIC_API_KEY) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { userId, botId } = req.body;

  if (!userId || !botId) {
    return res.status(400).json({ message: "Missing userId or botId" });
  }

  try {
    const response = await fetch(`${process.env.API_URL}/bots/${botId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_TOKEN,
      },
      body: JSON.stringify({ userId }),
    });

    const text = await response.text();

    if (response.status === 429) {
      // Extrai a mensagem da API: "Você já votou! Tente novamente em Xh Ym."
      const regex = /em (\d+)h (\d+)m/;
      const match = text.match(regex);

      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);

        return res.status(429).json({
          message: "Você já votou recentemente",
          retryAfter: {
            hours,
            minutes,
          },
        });
      }

      // Caso não bata o regex, retorna texto cru
      return res.status(429).json({ message: text });
    }

    if (!response.ok) {
      throw new Error(text || "Failed to vote");
    }

    return res.status(200).json({
      message: "Voto registrado com sucesso!",
      result: text,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Internal server error",
    });
  }
}
