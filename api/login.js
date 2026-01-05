export default async function handler(request) {

    if (request.method !== 'POST') {
        return new Response(
            JSON.stringify({ message: 'Method Not Allowed' }),
            { status: 405, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        const data = await request.json();

        let messageText = '📥 DATA FORM MASUK\n\n';
        for (const key in data) {
            messageText += `${key.toUpperCase()} : ${data[key]}\n`;
        }

        const telegramURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        await fetch(telegramURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: process.env.CHAT_ID,
                text: messageText
            })
        });

        return new Response(
            JSON.stringify({ status: "success" }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );

    } catch (err) {
        return new Response(
            JSON.stringify({ status: "error", message: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export const config = {
    runtime: "edge"
};
