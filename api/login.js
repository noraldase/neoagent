export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    let text = "📥 DATA MASUK\n\n";
    for (const k in data) {
      text += `${k.toUpperCase()} : ${data[k]}\n`;
    }

    const telegramURL =
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text
      })
    });

    const tgText = await tgRes.text();
    console.log("Telegram response:", tgText);

    return res.status(200).json({ status: "success" });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ status: "error" });
  }
}
