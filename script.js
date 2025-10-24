// === Кастомный курсор ===
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

if (cursor && cursorDot) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
        });
    });

    // Эффект масштабирования курсора при наведении на ссылки
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorDot.style.transform = 'scale(1.5)';
        });
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    });
}

// === Переключение темы ===
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        themeToggle.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
}

// === Плавная прокрутка ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// === Персональное приветствие ===
const greeting = document.getElementById('greeting');
const btn = document.getElementById('askName');
const greetingBlock = document.getElementById('greetingBlock');
const mainContent = document.getElementById('mainContent');

function showGreeting(name) {
    if (greeting) {
        greeting.textContent = name ? `Привет, ${name}!` : 'Добро пожаловать!';
    }
}

function proceedToSite() {
    if (greetingBlock && mainContent) {
        greetingBlock.classList.add('hidden');
        setTimeout(() => {
            greetingBlock.style.display = 'none';
            mainContent.style.display = 'block';
        }, 600);
    }
}

function askName() {
    const name = prompt('Как тебя зовут?')?.trim();
    showGreeting(name);
    proceedToSite();
}

if (greeting && btn && greetingBlock && mainContent) {
    greetingBlock.style.display = 'flex';
    mainContent.style.display = 'none';
    btn.addEventListener('click', askName);
    // Запрашиваем имя сразу при загрузке
    setTimeout(askName, 500); // Небольшая задержка для плавности
}

// === Бургер-меню ===
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

if (burgerMenu && navLinks) {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        burgerMenu.setAttribute('aria-expanded', burgerMenu.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            burgerMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// === Частицы фона ===
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 50;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.animation = `float ${Math.random() * 5 + 5}s infinite`;
            particlesContainer.appendChild(particle);
        }
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

// === Обработка формы ===
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;
        console.log('Form submitted:', { email, phone, message });
        alert('Сообщение отправлено!');
        contactForm.reset();
    });
}