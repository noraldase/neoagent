import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/api/submit", upload.single("filename"), async (req, res) => {
    const {
        id_pengirim,
        nickname,
        jumlah_bongkaran,
        bank_pencairan,
        nomor_rekening,
        atas_nama
    } = req.body;

    const message = `
📥 SUBMIT DATA BARU

🆔 ID Pengirim: ${id_pengirim}
👤 Nickname: ${nickname}
💰 Jumlah: ${jumlah_bongkaran}

🏦 Bank: ${bank_pencairan}
💳 Rekening: ${nomor_rekening}
👥 Atas Nama: ${atas_nama}
`;

    const telegramURL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

    await fetch(telegramURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: process.env.CHAT_ID,
            text: message
        })
    });

    res.json({ success: true });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
