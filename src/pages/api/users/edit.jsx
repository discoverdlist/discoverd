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

  const { userId, description } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/users/${userId}/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({ description }), // description é opcional
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update user");
    }

    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      user: data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message || "Internal server error",
    });
  }
}
