// public/realtime.js (CLIENT) — ne contient PAS de webhook Discord
// Se contente de se connecter au serveur via Socket.IO et d'envoyer des infos de visite.

const socket = io(); // nécessite <script src="/socket.io/socket.io.js"></script> dans index.html

// Récupère des infos non sensibles sur le visiteur (pour le serveur)
function getVisitorInfo() {
  const d = new Date();
  return {
    timestamp: d.toISOString(),
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || '',
    referrer: document.referrer || 'Direct'
  };
}

// Envoie une fois l'information au serveur (sécurisé côté serveur)
document.addEventListener('DOMContentLoaded', () => {
  try {
    socket.emit('visitorInfo', getVisitorInfo());
  } catch (e) {
    // fallback avec fetch si socket indisponible
    fetch('/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getVisitorInfo())
    }).catch(()=>{});
  }
});

// Gestion UI locale / notifications en temps réel
const countEl = document.getElementById('count');
const userListEl = document.getElementById('userList');

if ('Notification' in window) {
  if (Notification.permission === 'default') {
    Notification.requestPermission().catch(()=>{});
  }
}

function notify(msg) {
  if (Notification.permission === 'granted') {
    new Notification(msg);
  } else {
    console.log('Notification:', msg);
  }
}

socket.on('updateUsers', users => {
  if (countEl) countEl.textContent = users.length;
  if (userListEl) {
    userListEl.innerHTML = '';
    users.forEach(u => {
      const li = document.createElement('li');
      li.textContent = u;
      userListEl.appendChild(li);
    });
  }
});

socket.on('userConnected', pseudo => {
  notify(`${pseudo} s'est connecté`);
});

socket.on('userDisconnected', pseudo => {
  notify(`${pseudo} a quitté`);
});
