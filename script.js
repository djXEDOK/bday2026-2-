window.addEventListener('load', () => {
    // Удаляем прелоадер
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 500);

    AOS.init({ duration: 800, once: false });
});

// --- AUDIO & INTRO ---
const enterBtn = document.getElementById('enter-btn');
const introScreen = document.getElementById('intro-screen');
const app = document.getElementById('app');
const audio = document.getElementById('bg-music');
const soundIcon = document.getElementById('sound-icon');
let isMuted = false;

enterBtn.addEventListener('click', () => {
    // Анимация ухода интро
    introScreen.style.transform = 'translateY(-100%)';
    document.body.classList.add('unlocked');
    app.style.opacity = '1';
    
    // Запуск аудио
    audio.volume = 0.4;
    audio.play().then(() => {
        soundIcon.className = 'fas fa-volume-up';
    }).catch(e => {
        console.log("Автозапуск заблокирован");
    });
});

function toggleMute() {
    if (audio.paused) {
        audio.play();
        soundIcon.className = 'fas fa-volume-up';
    } else {
        isMuted = !isMuted;
        audio.muted = isMuted;
        soundIcon.className = isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }
}

// --- DESKTOP CURSOR ---
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorBlur.style.left = e.clientX + 'px';
        cursorBlur.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('button, .choice-btn, .frame-gold');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
}

// --- TIMER ---
const target = new Date("Aug 3, 2026 00:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = target - now;
    
    document.getElementById('d').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('h').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('m').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('s').innerText = Math.floor((diff % (1000 * 60)) / 1000);
}, 1000);

// --- POLLS ---
document.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.getAttribute('data-reply');
        
        // Визуальный эффект
        document.querySelectorAll('.choice-btn').forEach(b => {
            b.style.background = 'transparent'; 
            b.style.color = '#fff';
        });
        this.style.background = 'var(--gold)';
        this.style.color = '#000';
        
        showModal('STATUS', text);
        confetti({ particleCount: 50, colors: ['#D4AF37'] });
    });
});

// --- SMART NO BUTTON (MOBILE vs PC) ---
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const isMobile = window.matchMedia("(pointer: coarse)").matches;

if (!isMobile) {
    // PC: Кнопка убегает
    noBtn.addEventListener('mouseover', moveButton);
} else {
    // PHONE: При нажатии кнопка превращается в ДА
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        noBtn.innerHTML = "CONFIRM";
        noBtn.style.background = "var(--gold)";
        noBtn.style.color = "#000";
        noBtn.style.borderColor = "var(--gold)";
        confetti({ particleCount: 30, spread: 40 });
        setTimeout(() => {
            showModal("GOTCHA", "Сопротивление бесполезно.");
        }, 500);
    });
}

function moveButton() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 100 - 50;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener('click', () => {
    confetti({ particleCount: 150, spread: 100 });
    showModal("VIP ACCESS", "See you there, Legend.");
});

// --- MODAL SYSTEM ---
const modal = document.getElementById('custom-modal');
function showModal(title, text) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-text').innerText = text;
    modal.style.display = 'flex';
}
function closeModal() {
    modal.style.display = 'none';
}
window.onclick = (e) => { if (e.target == modal) closeModal(); }