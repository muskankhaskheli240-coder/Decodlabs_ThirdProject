// Mood configurations
const moods = {
    relaxed: {
        colors: ['#667eea', '#764ba2', '#f093fb'],
        quotes: ['Find peace in simplicity', 'Breathe deeply', 'Let go of tension'],
        icon: '🧘'
    },
    focused: {
        colors: ['#4facfe', '#00f2fe', '#2e2e78'],
        quotes: ['Stay concentrated', 'Mind over matter', 'Focus brings results'],
        icon: '⚡'
    },
    rainy: {
        colors: ['#34495e', '#2c3e50', '#5f9ea0'],
        quotes: ['Listen to the rain', 'Wash away worries', 'Find calm in storms'],
        icon: '🌧️'
    },
    romantic: {
        colors: ['#f093fb', '#f5576c', '#ff6b95'],
        quotes: ['Love transcends', 'Hearts unite', 'Feel the warmth'],
        icon: '💕'
    },
    energetic: {
        colors: ['#fa709a', '#fee140', '#ff6b6b'],
        quotes: ['Ignite your passion', 'Embrace the energy', 'Unleash your power'],
        icon: '🔥'
    },
    dreamy: {
        colors: ['#a8edea', '#fed6e3', '#667eea'],
        quotes: ['Dream without limits', 'Drift into wonder', 'Imagine the impossible'],
        icon: '✨'
    },
    midnight: {
        colors: ['#1a1a2e', '#16213e', '#0f3460'],
        quotes: ['Embrace the darkness', 'Silence speaks volumes', 'Night reveals truth'],
        icon: '🌙'
    }
};

let currentMood = 'relaxed';

// Navbar functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    navLinks.forEach(link => {
        link.classList.remove('active');
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        if (section && section.offsetTop - 70 <= window.scrollY) {
            link.classList.add('active');
        }
    });
});

// Mood switching
function switchMood(mood) {
    currentMood = mood;
    const moodCards = document.querySelectorAll('.mood-card');
    moodCards.forEach(card => card.classList.remove('active'));
    document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
    
    updateRoom();
    updateQuote();
    document.getElementById('currentMood').textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
}

// Update room visuals
function updateRoom() {
    const room = document.getElementById('mainRoom');
    const colors = moods[currentMood].colors;
    room.style.background = `linear-gradient(135deg, ${colors[0]}33, ${colors[1]}33)`;
    
    const light = document.getElementById('roomLight');
    light.style.background = `radial-gradient(circle, ${colors[1]}66, transparent)`;
}

// Update quote
function updateQuote() {
    const quotes = moods[currentMood].quotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quoteText').textContent = randomQuote;
    document.getElementById('quoteMood').textContent = `— ${currentMood.charAt(0).toUpperCase() + currentMood.slice(1)}`;
}

// Live clock
setInterval(() => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    document.getElementById('liveTime').textContent = time;
}, 1000);

// Counter animation
window.addEventListener('scroll', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        if (!counter.dataset.counted) {
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                    counter.dataset.counted = true;
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        }
    });
}, { once: false });

// Initialize
switchMood('relaxed');
