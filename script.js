// Инициализация звуков
const clickSound = document.getElementById('click-sound');
const steamSound = document.getElementById('steam-sound');
const radarSound = document.getElementById('radar-sound');

// Логирование загрузки скрипта
console.log('Скрипт загружен!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен!');

    // Элементы
    const screen = document.getElementById('main-screen');
    const spaceship = document.getElementById('spaceship');
    const alienSaucer = document.getElementById('alien-saucer');
    const button = document.querySelector('.data-btn');
    const panel = document.querySelector('.data-panel');
    const radar = document.getElementById('radar');
    const planet = document.getElementById('planet');
    const saucer = document.getElementById('alien-saucer');
    const body = document.body;

    // Главная страница
    screen.addEventListener('click', () => {
        clickSound.play();
        const codeLines = document.getElementById('code-lines');
        codeLines.style.display = 'block';
        codeLines.textContent = 'LOADING SYSTEM...\n' + '10101010'.repeat(5);
        setTimeout(() => codeLines.style.display = 'none', 2500);
    });

    // Космический корабль
    spaceship.addEventListener('click', () => {
        clickSound.play();
        spaceship.style.animation = 'boost 2s';
        setTimeout(() => spaceship.style.animation = 'fly 20s infinite linear', 2000);
    });

    // Инопланетная тарелка
    alienSaucer.addEventListener('click', () => {
        radarSound.play();
        alienSaucer.style.transform = 'scale(1.2)';
        setTimeout(() => alienSaucer.style.transform = '', 200);
    });

    // Котики
    document.querySelectorAll('.space-cat').forEach(cat => {
        cat.addEventListener('click', () => {
            clickSound.play();
            cat.style.transform = 'scale(1.2)';
            setTimeout(() => cat.style.transform = '', 200);
        });
    });

    // Обо мне: управление досье
    if (button) {
        console.log('Кнопка найдена!');
        button.addEventListener('click', () => {
            console.log('Клик по кнопке!');
            clickSound.play(); // Добавляем звук клика
            if (panel.style.display === 'block') {
                panel.style.animation = 'slide-out 0.5s forwards'; // Уход вправо
                setTimeout(() => {
                    panel.style.display = 'none';
                    panel.style.animation = '';
                    panel.style.transform = 'translateX(-100%)'; // Сбрасываем в начальное положение слева
                }, 500);
                button.textContent = 'Развернуть досье';
            } else {
                panel.style.display = 'block';
                panel.style.animation = 'slide-in 0.5s forwards'; // Появление слева
                button.textContent = 'Свернуть досье';
            }
        });
    } else {
        console.error('Кнопка не найдена!');
    }

    // Навыки
    document.querySelectorAll('.skill-lever input, .skill-sphere, .skill-button').forEach(item => {
        item.addEventListener('click', () => {
            clickSound.play();
            const card = document.getElementById('tech-card');
            card.innerHTML = `Технология: ${item.dataset.skill}<br>Уровень: ${item.value || 'Эксперт'}`;
            card.style.display = 'block';
            card.style.left = `${item.offsetLeft}px`;
            card.style.top = `${item.offsetTop + item.offsetHeight}px`;
            setTimeout(() => card.style.display = 'none', 2500);
        });
    });

    // Опыт работы
    document.querySelectorAll('.exp-item').forEach(item => {
        item.addEventListener('click', () => {
            clickSound.play();
            item.style.transform = 'scale(1.05)';
            setTimeout(() => item.style.transform = '', 200);
        });
    });

    // Three.js для портфолио (3D-планеты)
    const portfolioScene = new THREE.Scene();
    const portfolioCamera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
    const portfolioRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('portfolio-canvas'), alpha: true });
    portfolioRenderer.setSize(window.innerWidth * 0.8, 400);
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshBasicMaterial({ color: 0xB87333 });
    const star = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const planet1 = new THREE.Mesh(planetGeometry, planetMaterial);
    const planet2 = new THREE.Mesh(planetGeometry, planetMaterial);
    star.position.set(0, 0, 0);
    planet1.position.set(3, 0, 0);
    planet2.position.set(-3, 0, 0);
    portfolioScene.add(star, planet1, planet2);
    portfolioCamera.position.z = 5;

    let angle = 0;
    function animatePortfolio() {
        requestAnimationFrame(animatePortfolio);
        angle += 0.02;
        planet1.position.x = 3 * Math.cos(angle);
        planet1.position.z = 3 * Math.sin(angle);
        planet2.position.x = 3 * Math.cos(angle + Math.PI);
        planet2.position.z = 3 * Math.sin(angle + Math.PI);
        portfolioRenderer.render(portfolioScene, portfolioCamera);
    }
    animatePortfolio();

    document.getElementById('portfolio-canvas').addEventListener('click', (e) => {
        clickSound.play();
        const details = document.getElementById('project-details');
        details.innerHTML = `Миссия ${e.offsetX < window.innerWidth / 2 ? 1 : 2}:<br>Запуск успешен!<br>Дата: 25.02.2025`;
        details.style.display = 'block';
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => {
            details.style.display = 'none';
            document.body.style.animation = '';
        }, 2500);
    });

    // Контакты
    document.querySelector('.radio-form').addEventListener('submit', (e) => {
        e.preventDefault();
        clickSound.play();
        steamSound.play();
        const input = document.querySelector('.typewriter');
        alert(`Сигнал "${input.value}" передан в космос!`);
        input.value = '';
    });

    // Three.js для пасхалки (3D-игра)
    const gameScene = new THREE.Scene();
    const gameCamera = new THREE.PerspectiveCamera(75, 300 / 200, 0.1, 1000);
    const gameRenderer = new THREE.WebGLRenderer({ canvas: document.getElementById('game-canvas'), alpha: true });
    gameRenderer.setSize(300, 200);
    const shipGeometry = new THREE.ConeGeometry(0.5, 1, 32);
    const shipMaterial = new THREE.MeshBasicMaterial({ color: 0x39FF14 });
    const ship = new THREE.Mesh(shipGeometry, shipMaterial);
    const asteroidGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0xB87333 });
    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    ship.position.set(0, -2, 0);
    asteroid.position.set(0, 3, 0);
    gameScene.add(ship, asteroid);
    gameCamera.position.z = 5;

    let gameActive = false;
    let shipX = 0, asteroidY = 3;
    function animateGame() {
        if (!gameActive) return;
        requestAnimationFrame(animateGame);
        asteroidY -= 0.05;
        asteroid.position.y = asteroidY;
        if (asteroidY < -3) asteroidY = 3;
        ship.position.x = shipX;
        gameRenderer.render(gameScene, gameCamera);
    }

    // Пасхалка
    let clicks = 0;
    document.getElementById('secret-gear').addEventListener('click', () => {
        clickSound.play();
        clicks++;
        if (clicks === 5) {
            const game = document.getElementById('mini-game');
            game.style.display = 'block';
            gameActive = true;
            animateGame();
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' && shipX > -5) shipX -= 0.2;
                if (e.key === 'ArrowRight' && shipX < 5) shipX += 0.2;
            });
        }
    });

    // Эффект печатной машинки
    const typewriter = document.querySelector('.typewriter');
    typewriter.addEventListener('input', () => {
        typewriter.style.animation = 'blink 0.5s infinite';
        setTimeout(() => typewriter.style.animation = '', 1000);
    });

    // Радар следует за курсором
    if (radar) {
        for (let i = 0; i < 4; i++) {
            const marker = document.createElement('div');
            marker.className = 'marker';
            radar.appendChild(marker);
        }
        const scanner = document.createElement('div');
        scanner.className = 'scanner';
        radar.appendChild(scanner);

        document.addEventListener('mousemove', (e) => {
            radar.style.left = `${e.clientX}px`;
            radar.style.top = `${e.clientY}px`;
        });
    }

    // Динамические случайные звёзды
    const starsRandom = document.createElement('div');
    starsRandom.className = 'stars-random';
    body.appendChild(starsRandom);

    function createRandomStar() {
        const star = document.createElement('div');
        star.className = 'random-star';
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.width = `${Math.random() * 2 + 1}px`;
        star.style.height = star.style.width;
        starsRandom.appendChild(star);
        setTimeout(() => star.remove(), 2000);
    }
    setInterval(createRandomStar, 500);

    // Эффект планеты с курсором и тарелкой
    if (planet) {
        let trailInterval;
        planet.addEventListener('mouseenter', () => {
            body.style.cursor = 'none';
            const cursorDistort = document.createElement('div');
            cursorDistort.className = 'cursor-distort';
            body.appendChild(cursorDistort);

            trailInterval = setInterval(() => {
                const trail = document.createElement('div');
                trail.className = 'cursor-trail';
                const rect = planet.getBoundingClientRect();
                trail.style.left = `${rect.left + rect.width / 2}px`;
                trail.style.top = `${rect.top + rect.height / 2}px`;
                body.appendChild(trail);
                setTimeout(() => trail.remove(), 500);
            }, 100);

            document.addEventListener('mousemove', (e) => {
                cursorDistort.style.left = `${e.clientX - 12.5}px`;
                cursorDistort.style.top = `${e.clientY - 12.5}px`;
            });
        });

        planet.addEventListener('mouseleave', () => {
            body.style.cursor = 'default';
            const cursorDistort = document.querySelector('.cursor-distort');
            if (cursorDistort) cursorDistort.remove();
            clearInterval(trailInterval);
            document.querySelectorAll('.cursor-trail').forEach(trail => trail.remove());
        });

        function checkDistortion() {
            const planetRect = planet.getBoundingClientRect();
            const saucerRect = saucer.getBoundingClientRect();
            const dx = (planetRect.left + planetRect.width / 2) - (saucerRect.left + saucerRect.width / 2);
            const dy = (planetRect.top + planetRect.height / 2) - (saucerRect.top + saucerRect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const distortionStrength = (200 - distance) / 200;
                saucer.style.transform = `skewX(${dx * distortionStrength * 0.1}deg) scale(${1 - distortionStrength * 0.2})`;
                saucer.style.filter = `blur(${distortionStrength * 2}px)`;
            } else {
                saucer.style.transform = '';
                saucer.style.filter = '';
            }
        }
        setInterval(checkDistortion, 50);
    }
});