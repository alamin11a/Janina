// api/join.js
import CryptoJS from 'crypto-js';

const SECRET_KEY = "alamintest2025!@#";

export default function handler(req, res) {
  const { data } = req.query;
  if (!data) return res.status(400).json({ success: false, error: "No data" });

  try {
    const decrypted = CryptoJS.AES.decrypt(atob(data), SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const payload = JSON.parse(decrypted);

    // আপনার আসল API কল এখানে (যেটা আগে ছিল)
    // উদাহরণ:
    // await fetch(`https://emote-psi.vercel.app/api/join?tc=${payload.tc}&emote_id=${payload.emote_id}&uid1=${payload.uid1}&uid2=${payload.uid2}&uid3=${payload.uid3}`);

    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false, error: "Invalid data" });
  }
}

export const config = { api: { bodyParser: false } };
