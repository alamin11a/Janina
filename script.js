const IMAGE_BASE = "https://emote-psi.vercel.app/emotes";
const grid = document.getElementById('grid');
const total = document.getElementById('total');
const notif = document.getElementById('notif');

let emotes = [];

// ইনপুট ফিল্ড (শুধু দেখানোর জন্য)
const teamCodeInput = document.getElementById('teamCode');
const uid1 = document.getElementById('uid1');
const uid2 = document.getElementById('uid2');
const uid3 = document.getElementById('uid3');

// ইমেজ URL (সরাসরি PNG)
function getImageUrl(emoteId) {
    return `${IMAGE_BASE}/${emoteId}.png?t=${Date.now()}`; // ক্যাশ এড়ানো
}

// গ্রিড তৈরি
function refreshGrid() {
    grid.innerHTML = '';
    emotes.forEach(emote => {
        const div = document.createElement('div');
        div.className = 'item';

        div.innerHTML = `
            <img src="${getImageUrl(emote.id)}" alt="${emote.id}"
                 style="opacity:0; transition:opacity 0.4s ease;"
                 onload="this.style.opacity=1;"
                 onerror="this.src='https://via.placeholder.com/80/666/fff?text=?'">
            <p>${emote.id}<br><small>${emote.name}</small></p>
        `;

        // ক্লিক = রিফ্রেশ (কাঁপা ছাড়া)
        div.onclick = () => {
            const img = div.querySelector('img');
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = getImageUrl(emote.id);
            }, 400);
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
