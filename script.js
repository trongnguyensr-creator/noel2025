const jokeSection = document.getElementById('jokeSection');
const letterSection = document.getElementById('letterSection');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const christmasMusic = document.getElementById('christmasMusic');
const snowCanvas = document.getElementById('snowCanvas');
const ctx = snowCanvas.getContext('2d');

snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

// XỬ LÝ NÚT "HONG" NÉ TRÁNH
let isAvoiding = false;
function moveNoButton() {
    if (isAvoiding) return;
    isAvoiding = true;
    noBtn.classList.add('avoiding');
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    noBtn.style.left = Math.max(20, Math.random() * maxX) + 'px';
    noBtn.style.top = Math.max(20, Math.random() * maxY) + 'px';
    setTimeout(() => { isAvoiding = false; }, 300);
}

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

// XỬ LÝ KHI ĐỒNG Ý
yesBtn.addEventListener('click', () => {
    jokeSection.classList.remove('active');
    letterSection.classList.add('active');
    // Phát nhạc sau khi người dùng tương tác (quy định của trình duyệt)
    christmasMusic.play().catch(e => console.log("Nhạc chưa phát được:", e));
});

// HIỆU ỨNG TUYẾT RƠI
class Snowflake {
    constructor() {
        this.reset();
        this.y = Math.random() * snowCanvas.height;
    }
    reset() {
        this.x = Math.random() * snowCanvas.width;
        this.y = -10;
        this.radius = Math.random() * 3 + 1;
        this.speed = Math.random() * 1 + 0.5;
        this.drift = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.y += this.speed;
        this.x += this.drift;
        if (this.y > snowCanvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

const snowflakes = Array.from({ length: 150 }, () => new Snowflake());
function animate() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    snowflakes.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
});
