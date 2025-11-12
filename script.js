const API_BASE = "https://emote-psi.vercel.app/api/join";
const PNG_BASE = "https://cdn.jsdelivr.net/gh/ShahGCreator/icon@main/PNG";
const grid = document.getElementById('grid');
const notif = document.getElementById('notif');
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');

// ডেটা লোড
let config = { password: "1234", title: "XLAHR Emote Bot", description: "টিম কোড ও UID দিন। ক্লিক করে ইমোট সেন্ড করুন।", teamCode: "demo", uid1: "1", uid2: "2", uid3: "3" };
fetch('data.json')
    .then(res => res.json())
    .then(data => config = data)
    .catch(() => {});  // ডিফল্ট ব্যবহার

document.title = config.title;
document.getElementById('headerTitle').textContent = config.title;
document.getElementById('headerDesc').textContent = config.description;
document.getElementById('teamCode').value = config.teamCode;
document.getElementById('uid1').value = config.uid1;
document.getElementById('uid2').value = config.uid2;
document.getElementById('uid3').value = config.uid3;

// লগইন চেক
function checkLogin() {
    const input = document.getElementById('passInput').value;
    if (input === config.password) {
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
        loadEmotes();
    } else {
        document.getElementById('loginError').textContent = 'ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।';
        document.getElementById('passInput').value = '';
    }
}

// Enter কী দিয়ে লগইন
document.getElementById('passInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkLogin();
});

// Emote লিস্ট
const emotes = [
  {"id":909051014,"name":"puffy ride"},
  {"id":909050009,"name":"(circle)"},
  // ... (সব লিস্ট আগের মতো, এখানে সংক্ষিপ্ত)
  {"id":909042008,"name":"(evo Woodpecker)"}
];

// PNG URL
function getPngUrl(emoteId) {
    return `${PNG_BASE}/${emoteId}.png`;
}

// API-তে সেন্ড
async function sendEmote(emoteId) {
    const tc = document.getElementById('teamCode').value || config.teamCode;
    const u1 = document.getElementById('uid1').value || config.uid1;
    const u2 = document.getElementById('uid2').value || config.uid2;
    const u3 = document.getElementById('uid3').value || config.uid3;

    const url = `${API_BASE}?tc=${tc}&emote_id=${emoteId}&uid1=${u1}&uid2=${u2}&uid3=${u3}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            showNotif(`সেন্ড সফল: ${emoteId}`);
        } else {
            showNotif(`ফেল (${response.status}): ${emoteId}`);
        }
    } catch (err) {
        showNotif(`ইন্টারনেট এরর: ${emoteId}`);
    }
}

// গ্রিড লোড
function loadEmotes() {
    grid.innerHTML = '';
    emotes.forEach(emote => {
        const div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <img src="${getPngUrl(emote.id)}" alt="${emote.id}"
                 style="opacity:0; transition:opacity 0.4s ease; width:60px; height:60px; object-fit:contain;"
                 onload="this.style.opacity=1;"
                 onerror="this.src='https://via.placeholder.com/60/666/fff?text=?'">
            <div class="id">${emote.id}</div>
            <div class="name">${emote.name}</div>
        `;

        div.onclick = () => sendEmote(emote.id);
        grid.appendChild(div);
    });
}

// নোটিফ
function showNotif(msg) {
    notif.textContent = msg;
    notif.style.opacity = '1';
    setTimeout(() => notif.style.opacity = '0', 2000);
}
