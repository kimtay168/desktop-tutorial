function copyIP() {
  navigator.clipboard.writeText("mazerclub.net").then(() => {
    alert("IP copied: mazerclub.net");
  });
}

fetch("https://api.mcsrvstat.us/2/mazerclub.com")
  .then(res => res.json())
  .then(data => {
    const count = data.players && data.players.online !== undefined ? data.players.online : "N/A";
    document.getElementById("player-count").textContent = count;
  })
  .catch(() => {
    document.getElementById("player-count").textContent = "N/A";
  });

//discord
async function fetchDiscordUserCount() {
  const serverId = '953888341412167681'; // Replace with your server ID
  const response = await fetch(`https://discord.com/api/guilds/${serverId}/widget.json`);
  
  if (response.ok) {
    const data = await response.json();
    const userCount = data.presence_count || 0;
    document.getElementById('discord-count').textContent = `USER ONLINE ${userCount} `;
  } else {
    console.error("Failed to fetch Discord widget data.");
  }
}

window.addEventListener('DOMContentLoaded', fetchDiscordUserCount);


//countdown
function startCountdown(durationMs) {
  const savedEnd = localStorage.getItem('crate_end_time');
  const endTime = savedEnd ? parseInt(savedEnd) : Date.now() + durationMs;

  if (!savedEnd) {
    localStorage.setItem('crate_end_time', endTime.toString());
  }

  const button = document.getElementById('claimButton');

  function updateTimer() {
    const now = Date.now();
    const diff = Math.max(0, endTime - now);

    const totalMinutes = Math.floor(diff / 60000);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const days = totalDays;
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');

    if (diff <= 0) {
      clearInterval(timerInterval);
      button.textContent = "EXPIRED";
      button.classList.add("disabled"); // Add a disabled class (optional)
      button.removeAttribute("href");
    }
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

// Start countdown: 7 days in milliseconds
const sevenDays = 7 * 24 * 60 * 60 * 1000;
startCountdown(sevenDays);

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});

function openModal() {
  document.getElementById("rankModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("rankModal").style.display = "none";
}


