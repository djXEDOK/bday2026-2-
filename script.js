// --- ХАПТИКА (Вибро для мобилок) ---
const vibrate = (ms = 50) => {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(ms);
    }
};

// --- SFX ---
const clickSound = document.getElementById('sfx-click');
const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.play();
};

// --- PRELOADER ---
let progress = 0;
const progBar = document.getElementById('progress-bar');
const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
            document.getElementById('loader').style.opacity = '0';
            setTimeout(() => document.getElementById('loader').remove(), 500);
        }, 500);
    }
    progBar.style.width = progress + '%';
}, 200);

// --- ACCESS SYSTEM ---
const enterBtn = document.getElementById('enter-btn');
const audio = document.getElementById('bg-music');

enterBtn.addEventListener('click', () => {
    vibrate(100);
    playClick();
    document.getElementById('intro-screen').style.transform = 'scale(2)';
    document.getElementById('intro-screen').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('intro-screen').remove();
        document.body.classList.remove('loading');
        AOS.init({ duration: 1000, once: false });
    }, 600);
    audio.volume = 0.3;
    audio.play();
});

// --- TIMER ---
const bday = new Date("Aug 3, 2026 00:00:00").getTime();
setInterval(() => {
    const diff = bday - new Date().getTime();
    document.getElementById('d').innerText = Math.floor(diff / (86400000));
    document.getElementById('h').innerText = Math.floor((diff % 86400000) / 3600000);
    document.getElementById('m').innerText = Math.floor((diff % 3600000) / 60000);
}, 1000);

// --- ROLE SELECTION (GENERATE TICKET) ---
function setRole(role, el) {
    vibrate(60);
    playClick();
    
    // Снимаем выделение
    document.querySelectorAll('.role-card').forEach(c => c.style.borderColor = '#222');
    el.style.borderColor = 'var(--gold)';

    const result = document.getElementById('ticket-result');
    result.classList.remove('hidden');
    result.innerHTML = `
        <div class="ticket-anim">
            <p style="font-family: var(--font-tech); font-size: 0.7rem;">ENCRYPTING PASS...</p>
            <h3 style="color: var(--gold)">ACCESS GRANTED: ${role}</h3>
            <p>Ваша позиция в протоколе подтверждена.</p>
        </div>
    `;
    confetti({ particleCount: 40, colors: ['#D4AF37'] });
}

// --- SMART ABORT BUTTON (MAGNETIC) ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');

const isMobile = window.matchMedia("(pointer: coarse)").matches;

if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        const box = noBtn.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (box.left + box.width/2), e.clientY - (box.top + box.height/2));
        
        if (dist < 100) {
            const angle = Math.atan2(e.clientY - (box.top + box.height/2), e.clientX - (box.left + box.width/2));
            const x = Math.cos(angle) * -120;
            const y = Math.sin(angle) * -120;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
} else {
    noBtn.addEventListener('touchstart', () => {
        vibrate(200);
        noBtn.innerText = "ACCESS DENIED";
        setTimeout(() => noBtn.innerText = "ABORT", 1000);
    });
}

yesBtn.addEventListener('click', () => {
    vibrate([100, 50, 100]);
    playClick();
    confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
    alert("ПРОТОКОЛ АКТИВИРОВАН. ЖДЕМ ВАС.");
});

// --- PARALLAX SHARDS ---
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    document.querySelector('.s1').style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    document.querySelector('.s2').style.transform = `translate(${x * -50}px, ${y * -50}px)`;
});
