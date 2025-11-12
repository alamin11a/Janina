const API_BASE = "https://emote-psi.vercel.app/api/join";
const PNG_BASE = "https://cdn.jsdelivr.net/gh/ShahGCreator/icon@main/PNG";
const grid = document.getElementById('grid');
const notif = document.getElementById('notif');
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');

// কনফিগ লোড
const config = window.APP_CONFIG;

// টেক্সট সেট
document.title = config.title;
document.getElementById('headerTitle').textContent = config.title;
document.getElementById('headerDesc').textContent = config.description;
document.getElementById('teamCode').value = config.teamCode;
document.getElementById('uid1').value = config.uid1;
document.getElementById('uid2').value = config.uid2;
document.getElementById('uid3').value = config.uid3;

// লগইন
function checkLogin() {
  const input = document.getElementById('passInput').value;
  if (input === config.password) {
    loginScreen.style.display = 'none';
    mainContent.style.display = 'block';
    loadEmotes();
  } else {
    document.getElementById('loginError').textContent = 'ভুল পাসওয়ার্ড!';
    document.getElementById('passInput').value = '';
  }
}
document.getElementById('passInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') checkLogin();
});

// ইমোট লিস্ট
const emotes = [
  {"id":909051014,"name":"puffy ride"},
  {"id":909050009,"name":"(circle)"},
  {"id":909051013,"name":"petals"},
  {"id":909051012,"name":"bow"},
  {"id":909051010,"name":"moterbike"},
  {"id":909051004,"name":"shower"},
  {"id":909051002,"name":"dream"},
  {"id":909051001,"name":"angelic"},
  {"id":909048015,"name":"paint"},
  {"id":909044015,"name":"sword"},
  {"id":909041008,"name":"flar"},
  {"id":909049003,"name":"(owl)"},
  {"id":909050008,"name":"thor"},
  {"id":909049001,"name":"(bigdill)"},
  {"id":909041013,"name":"(cs gm)"},
  {"id":909050014,"name":"(map read)"},
  {"id":909050015,"name":"(tomato)"},
  {"id":909050002,"name":"(ninja summon)"},
  {"id":909042007,"name":"(100 lvl)"},
  {"id":909050028,"name":"(auraboat)"},
  {"id":909049012,"name":"(flying guns)"},
  {"id":909000045,"name":"(I heart you)"},
  {"id":909000034,"name":"(pirate flag)"},
  {"id":909000012,"name":"(push up)"},
  {"id":909000020,"name":"(devil move)"},
  {"id":909000008,"name":"(shoot dance)"},
  {"id":909000006,"name":"(chicken)"},
  {"id":909000014,"name":"(THRONE)"},
  {"id":909000010,"name":"(rose)"},
  {"id":909038004,"name":"(valentine heart)"},
  {"id":909034001,"name":"(rampage book)"},
  {"id":909049017,"name":"(guild flag)"},
  {"id":909040004,"name":"(fish)"},
  {"id":909041003,"name":"(inosuke)"},
  {"id":909041012,"name":"(br grandmaster)"},
  {"id":909049010,"name":"(evo p90)"},
  {"id":909051003,"name":"(evo m60) new"},
  {"id":909033002,"name":"(evo mp5)"},
  {"id":909041005,"name":"(evo groza)"},
  {"id":909038010,"name":"(thompson evo)"},
  {"id":909039011,"name":"(evo M10 red)"},
  {"id":909040010,"name":"(evo mp40 blue)"},
  {"id":909000081,"name":"(evo m10 green)"},
  {"id":909000085,"name":"(evo xm8)"},
  {"id":909000063,"name":"(evo ak)"},
  {"id":909000075,"name":"(evo mp40)"},
  {"id":909033001,"name":"(evo m4A1)"},
  {"id":909000090,"name":"(evo famas)"},
  {"id":909000068,"name":"(evo scar)"},
  {"id":909000098,"name":"(evo ump)"},
  {"id":909035007,"name":"(evo m18)"},
  {"id":909037011,"name":"(evo fist)"},
  {"id":909038012,"name":"(evo g18)"},
  {"id":909035012,"name":"(evo AN94)"},
  {"id":909042008,"name":"(evo Woodpecker)"}
];

// PNG URL
function getPngUrl(id) {
  return `${PNG_BASE}/${id}.png`;
}

// সেন্ড
async function sendEmote(id) {
  const tc = document.getElementById('teamCode').value || config.teamCode;
  const u1 = document.getElementById('uid1').value || config.uid1;
  const u2 = document.getElementById('uid2').value || config.uid2;
  const u3 = document.getElementById('uid3').value || config.uid3;

  const url = `${API_BASE}?tc=${tc}&emote_id=${id}&uid1=${u1}&uid2=${u2}&uid3=${u3}`;
  try {
    await fetch(url);
    showNotif(`সেন্ড সফল: ${id}`);
  } catch {
    showNotif(`ইন্টারনেট এরর`);
  }
}

// গ্রিড
function loadEmotes() {
  grid.innerHTML = '';
  emotes.forEach(emote => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${getPngUrl(emote.id)}" alt="${emote.id}"
           style="opacity:0;transition:opacity 0.4s;"
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
