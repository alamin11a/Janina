const API_BASE = "https://emote-psi.vercel.app/api/join";
const grid = document.getElementById('grid');
const total = document.getElementById('total');
const notif = document.getElementById('notif');

let emotes = [];

// ইনপুট ফিল্ড
const teamCodeInput = document.getElementById('teamCode');
const uid1 = document.getElementById('uid1');
const uid2 = document.getElementById('uid2');
const uid3 = document.getElementById('uid3');

// ক্যাশে ছাড়া URL (শুধু প্রয়োজন হলে)
let lastParams = {};

// URL জেনারেট
function getImageUrl(emoteId) {
    const tc = teamCodeInput.value.trim() || "demo";
    const u1 = uid1.value.trim() || "1";
    const u2 = uid2.value.trim() || "2";
    const u3 = uid3.value.trim() || "3";

    const params = { tc, emote_id: emoteId, uid1: u1, uid2: u2, uid3: u3 };
    
    // শুধু প্যারামিটার চেঞ্জ হলে নতুন URL
    const key = JSON.stringify(params);
    if (!lastParams[key]) {
        lastParams[key] = `${API_BASE}?${new URLSearchParams(params).toString()}&t=${Date.now()}`;
    }
    return lastParams[key];
}

// গ্রিড রিফ্রেশ
function refreshGrid() {
    lastParams = {}; // ক্যাশ ক্লিয়ার
    grid.innerHTML = '';
    emotes.forEach(emote => {
        const div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <img src="${getImageUrl(emote.id)}" alt="${emote.id}" 
                 style="opacity:0; transition:opacity 0.3s;"
                 onload="this.style.opacity=1;"
                 onerror="this.src='https://via.placeholder.com/80/666/fff?text=?'">
            <p>${emote.id}<br><small>${emote.name}</small></p>
        `;

        // ক্লিক = শুধু রিফ্রেশ (কোনো ফ্লিকার ছাড়া)
        div.onclick = () => {
            const img = div.querySelector('img');
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = getImageUrl(emote.id);
            }, 300);
            showNotif(`সেন্ড করা হয়েছে: ${emote.id}`);
        };

        grid.appendChild(div);
    });
}

// নোটিফিকেশন
function showNotif(msg) {
    notif.textContent = msg;
    notif.style.opacity = '1';
    setTimeout(() => notif.style.opacity = '0', 1800);
}

// লোড emotes.json
fetch('emotes.json')
    .then(res => res.json())
    .then(data => {
        emotes = data;
        total.textContent = emotes.length;
        refreshGrid();
    })
    .catch(err => {
        grid.innerHTML = `<p style="text-align:center;color:#ff6b6b;">লোড করা যায়নি: ${err.message}</p>`;
    });

// ইনপুট চেঞ্জ হলে রিফ্রেশ
[teamCodeInput, uid1, uid2, uid3].forEach(input => {
    input.addEventListener('input', () => {
        setTimeout(refreshGrid, 500); // ডিবাউন্স
    });
});
