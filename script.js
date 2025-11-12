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

// ইমেজ URL জেনারেট
function getImageUrl(emoteId) {
    const tc = teamCodeInput.value.trim() || "demo";
    const u1 = uid1.value.trim() || "1";
    const u2 = uid2.value.trim() || "2";
    const u3 = uid3.value.trim() || "3";
    return `${API_BASE}?tc=${tc}&emote_id=${emoteId}&uid1=${u1}&uid2=${u2}&uid3=${u3}&t=${Date.now()}`; // cache avoid
}

// গ্রিড রিফ্রেশ
function refreshGrid() {
    grid.innerHTML = '';
    emotes.forEach(emote => {
        const div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <img src="${getImageUrl(emote.id)}" alt="${emote.id}" 
                 onerror="this.src='https://via.placeholder.com/80/666/fff?text=?'">
            <p>${emote.id}<br><small>${emote.name}</small></p>
        `;

        // ক্লিক = API-তে সেন্ড + ইমেজ রিফ্রেশ
        div.onclick = () => {
            const img = div.querySelector('img');
            img.src = getImageUrl(emote.id); // নতুন করে লোড
            showNotif("API-তে সেন্ড করা হয়েছে!");
        };

        // লং প্রেস = কপি
        let pressTimer;
        div.onmousedown = div.ontouchstart = () => {
            pressTimer = setTimeout(() => {
                navigator.clipboard.writeText(emote.id).then(() => {
                    showNotif("কপি হয়েছে: " + emote.id);
                });
            }, 800);
        };
        div.onmouseup = div.ontouchend = div.onmouseleave = () => {
            clearTimeout(pressTimer);
        };

        grid.appendChild(div);
    });
}

// নোটিফিকেশন দেখান
function showNotif(msg) {
    notif.textContent = msg;
    notif.style.opacity = '1';
    setTimeout(() => notif.style.opacity = '0', 2000);
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
    input.addEventListener('input', refreshGrid);
});
