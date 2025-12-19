// ===========================
// CẤU HÌNH CÁ NHÂN HÓA
// ===========================
const girlfriendName = "Vy"; // Thay tên bạn gái tại đây

// ===========================
// KHỞI TẠO CÁC PHẦN TỬ
// ===========================
const jokeSection = document.getElementById('jokeSection');
const letterSection = document.getElementById('letterSection');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const christmasMusic = document.getElementById('christmasMusic');
const snowCanvas = document.getElementById('snowCanvas');
const ctx = snowCanvas.getContext('2d');

// Thiết lập kích thước canvas
snowCanvas.width = window.innerWidth;
snowCanvas.height = window.innerHeight;

// ===========================
// XỬ LÝ NÚT "HONG" (NÉ ĐI)
// ===========================
let isAvoiding = false;

// Hàm tính toán vị trí random mới cho nút
function moveNoButton() {
    if (isAvoiding) return;
    
    isAvoiding = true;
    noBtn.classList.add('avoiding');
    
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    setTimeout(() => {
        isAvoiding = false;
    }, 300);
}

// Xử lý khi hover vào nút HONG
noBtn.addEventListener('mouseenter', moveNoButton);

// Xử lý khi click vào nút HONG (trên mobile)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Xử lý touch cho mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// ===========================
// XỬ LÝ NÚT "ĐỒNG Ý"
// ===========================
yesBtn.addEventListener('click', () => {
    // Chuyển sang phần 2
    jokeSection.classList.remove('active');
    letterSection.classList.add('active');
    
    // Phát nhạc
    playChristmasMusic();
});

// ===========================
// PHÁT NHẠC GIÁNG SINH
// ===========================
function playChristmasMusic() {
    // Thử phát nhạc
    const playPromise = christmasMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Nhạc phát thành công
                console.log('🎵 Nhạc Giáng Sinh đang phát...');
            })
            .catch(error => {
                // Trình duyệt chặn autoplay
                console.log('⚠️ Trình duyệt chặn phát nhạc tự động. Người dùng cần tương tác để phát nhạc.');
                
                // Thử phát lại khi người dùng click vào màn hình
                document.addEventListener('click', () => {
                    christmasMusic.play().catch(e => console.log('Không thể phát nhạc:', e));
                }, { once: true });
            });
    }
}

// ===========================
// HIỆU ỨNG TUYẾT RƠI
// ===========================
class Snowflake {
    constructor() {
        this.x = Math.random() * snowCanvas.width;
        this.y = Math.random() * snowCanvas.height - snowCanvas.height;
        this.radius = Math.random() * 2 + 1; // Kích thước 1-3px
        this.speed = Math.random() * 1 + 0.5; // Tốc độ rơi chậm
        this.drift = Math.random() * 0.5 - 0.25; // Dao động ngang
        this.opacity = Math.random() * 0.6 + 0.3; // Độ mờ 0.3-0.9
    }
    
    update() {
        this.y += this.speed;
        this.x += this.drift;
        
        // Reset khi tuyết rơi xuống đáy
        if (this.y > snowCanvas.height) {
            this.y = -10;
            this.x = Math.random() * snowCanvas.width;
        }
        
        // Giữ tuyết trong khung hình (dao động ngang)
        if (this.x > snowCanvas.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = snowCanvas.width;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        ctx.closePath();
    }
}

// Tạo mảng chứa các bông tuyết (nhiều tuyết)
const snowflakes = [];
const snowflakeCount = 150; // Số lượng tuyết (có thể điều chỉnh)

for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(new Snowflake());
}

// Hàm vẽ tuyết
function animateSnow() {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });
    
    requestAnimationFrame(animateSnow);
}

// Bắt đầu hiệu ứng tuyết
animateSnow();

// ===========================
// XỬ LÝ RESIZE WINDOW
// ===========================
window.addEventListener('resize', () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
    
    // Reset vị trí nút HONG nếu đang ở chế độ "né"
    if (noBtn.classList.contains('avoiding')) {
        noBtn.classList.remove('avoiding');
        noBtn.style.left = '';
        noBtn.style.top = '';
        isAvoiding = false;
    }
});

// ===========================
// CONSOLE MESSAGE DỄ THƯƠNG
// ===========================
console.log(`
🎄✨ Merry Christmas ${girlfriendName}! ✨🎄
💖 Website được làm với tất cả tình yêu thương! 💖
`);
