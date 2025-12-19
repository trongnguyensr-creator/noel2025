// Khai báo biến toàn cục
let noBtnClickCount = 0;
let musicPlaying = false;
let audioContext;
let snowflakes = [];

// Tên bạn gái - dễ dàng thay đổi
const girlfriendName = "Em yêu";

// DOM Elements
const part1 = document.getElementById('part1');
const part2 = document.getElementById('part2');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const backBtn = document.getElementById('backBtn');
const christmasMusic = document.getElementById('christmasMusic');
const musicToggle = document.getElementById('musicToggle');
const musicStatus = document.getElementById('musicStatus');
const snowfallContainer = document.getElementById('snowfall');

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', function() {
    console.log("Trang web Giáng Sinh đã sẵn sàng! 🎄");
    
    // Kiểm tra file nhạc
    checkMusicFile();
    
    // Tạo hiệu ứng tuyết rơi
    createSnowfall();
    
    // Khởi tạo sự kiện
    initEvents();
    
    // Thay thế tên trong thư
    replaceNameInLetter();
});

// Kiểm tra file nhạc
function checkMusicFile() {
    christmasMusic.addEventListener('error', function() {
        console.warn("Không thể tải file nhạc giangsinh.mp3. Vui lòng đảm bảo file tồn tại.");
        musicToggle.style.display = 'none';
    });
    
    christmasMusic.addEventListener('canplaythrough', function() {
        console.log("Nhạc Giáng Sinh đã sẵn sàng!");
    });
}

// Tạo hiệu ứng tuyết rơi
function createSnowfall() {
    // Số lượng hạt tuyết (thay đổi theo kích thước màn hình)
    const snowflakeCount = window.innerWidth < 768 ? 80 : 150;
    
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 4 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // Vị trí ngẫu nhiên
    const startX = Math.random() * 100;
    snowflake.style.left = `${startX}vw`;
    
    // Thời gian rơi ngẫu nhiên
    const duration = Math.random() * 10 + 10;
    snowflake.style.animationDuration = `${duration}s`;
    
    // Độ trễ bắt đầu ngẫu nhiên
    const delay = Math.random() * 5;
    snowflake.style.animationDelay = `${delay}s`;
    
    // Lưu thông tin hạt tuyết
    snowflakes.push({
        element: snowflake,
        startX: startX
    });
    
    snowfallContainer.appendChild(snowflake);
}

// Khởi tạo sự kiện
function initEvents() {
    // Nút ĐỒNG Ý
    yesBtn.addEventListener('click', function() {
        console.log("Em đã đồng ý! 💖");
        
        // Phát nhạc
        playChristmasMusic();
        
        // Hiệu ứng chuyển trang
        yesBtn.innerHTML = "YÊU EM NHIỀU 💖";
        yesBtn.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            part1.classList.remove('active');
            part1.style.opacity = '0';
            part1.style.transform = 'scale(0.9)';
            part1.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                part1.style.display = 'none';
                part2.style.display = 'block';
                
                setTimeout(() => {
                    part2.classList.add('active');
                    part2.style.opacity = '1';
                    part2.style.transform = 'scale(1)';
                    part2.style.transition = 'all 0.8s ease';
                    
                    // Thêm hiệu ứng gõ chữ cho thư
                    typeWriterEffect();
                }, 50);
            }, 800);
        }, 500);
    });
    
    // Nút HONG
    noBtn.addEventListener('click', handleNoButtonClick);
    noBtn.addEventListener('mouseover', handleNoButtonHover);
    
    // Nút quay lại
    backBtn.addEventListener('click', function() {
        part2.classList.remove('active');
        part2.style.opacity = '0';
        part2.style.transform = 'scale(0.9)';
        part2.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            part2.style.display = 'none';
            part1.style.display = 'block';
            
            setTimeout(() => {
                part1.classList.add('active');
                part1.style.opacity = '1';
                part1.style.transform = 'scale(1)';
                part1.style.transition = 'all 0.8s ease';
            }, 50);
        }, 800);
    });
    
    // Nút điều khiển nhạc
    musicToggle.addEventListener('click', toggleMusic);
    
    // Xử lý phím tắt
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && part2.classList.contains('active')) {
            backBtn.click();
        }
        
        if (e.key === 'm' || e.key === 'M') {
            toggleMusic();
        }
    });
}

// Xử lý nút HONG khi click
function handleNoButtonClick() {
    noBtnClickCount++;
    
    // Thay đổi văn bản dựa trên số lần click
    const messages = [
        "HONG 😝",
        "Chắc chắn hong? 😜",
        "Thử lại đi! 😄",
        "Chọn ĐỒNG Ý đi! 💖",
        "Em chắc chứ? 😏",
        "Lần cuối đó! 🤗",
        "Anh buồn đó 😢",
        "Thôi mà... 🥺"
    ];
    
    const messageIndex = Math.min(noBtnClickCount - 1, messages.length - 1);
    noBtn.innerHTML = messages[messageIndex];
    
    // Di chuyển nút đến vị trí ngẫu nhiên
    moveNoButton();
    
    // Tăng kích thước nút ĐỒNG Ý
    const scale = 1 + (noBtnClickCount * 0.05);
    yesBtn.style.transform = `scale(${scale})`;
    
    // Thêm trái tim bay lên
    createFlyingHeart();
    
    // Sau 5 lần nhấn, đặt lại đếm
    if (noBtnClickCount >= 8) {
        noBtnClickCount = 0;
    }
}

// Xử lý nút HONG khi hover
function handleNoButtonHover() {
    // 30% cơ hội di chuyển khi hover
    if (Math.random() < 0.3) {
        moveNoButton();
    }
}

// Di chuyển nút HONG đến vị trí ngẫu nhiên
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Tính toán vị trí mới trong phạm vi container
    const maxX = containerRect.width - noBtn.offsetWidth - 20;
    const maxY = containerRect.height - noBtn.offsetHeight - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    // Di chuyển nút
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
    noBtn.style.transition = 'all 0.3s ease';
    
    // Thêm hiệu ứng xoay
    const rotation = Math.random() * 20 - 10;
    noBtn.style.transform = `rotate(${rotation}deg)`;
}

// Tạo trái tim bay lên
function createFlyingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.fontSize = '24px';
    heart.style.zIndex = '1000';
    heart.style.pointerEvents = 'none';
    
    // Vị trí bắt đầu gần nút HONG
    const noBtnRect = noBtn.getBoundingClientRect();
    heart.style.left = `${noBtnRect.left + noBtnRect.width/2 - 12}px`;
    heart.style.top = `${noBtnRect.top - 10}px`;
    
    document.body.appendChild(heart);
    
    // Animation bay lên
    const animation = heart.animate([
        { transform: 'translateY(0) scale(1)', opacity: 1 },
        { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });
    
    // Xóa sau khi animation kết thúc
    animation.onfinish = () => {
        document.body.removeChild(heart);
    };
}

// Phát nhạc Giáng Sinh
function playChristmasMusic() {
    if (musicPlaying) return;
    
    // Tạo context audio để vượt qua chính sách autoplay
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Phát nhạc
        christmasMusic.play().then(() => {
            console.log("Nhạc Giáng Sinh đang phát! 🎵");
            musicPlaying = true;
            musicStatus.textContent = "Nhạc: Bật";
            musicToggle.style.background = "rgba(255, 77, 109, 0.3)";
        }).catch(error => {
            console.warn("Không thể phát nhạc tự động:", error);
            showMusicPlayHint();
        });
    } catch (error) {
        console.warn("Không thể khởi tạo AudioContext:", error);
        // Thử phát nhạc trực tiếp
        christmasMusic.play().then(() => {
            musicPlaying = true;
            musicStatus.textContent = "Nhạc: Bật";
            musicToggle.style.background = "rgba(255, 77, 109, 0.3)";
        }).catch(e => {
            console.warn("Không thể phát nhạc:", e);
            showMusicPlayHint();
        });
    }
}

// Tắt/bật nhạc
function toggleMusic() {
    if (!musicPlaying) {
        christmasMusic.play().then(() => {
            musicPlaying = true;
            musicStatus.textContent = "Nhạc: Bật";
            musicToggle.style.background = "rgba(255, 77, 109, 0.3)";
            console.log("Nhạc đã bật!");
        }).catch(error => {
            console.warn("Không thể phát nhạc:", error);
            alert("Vui lòng nhấn nút 'ĐỒNG Ý' để nghe nhạc Giáng Sinh!");
        });
    } else {
        christmasMusic.pause();
        musicPlaying = false;
        musicStatus.textContent = "Nhạc: Tắt";
        musicToggle.style.background = "rgba(255, 255, 255, 0.1)";
        console.log("Nhạc đã tắt!");
    }
}

// Hiển thị gợi ý phát nhạc
function showMusicPlayHint() {
    const hint = document.createElement('div');
    hint.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            z-index: 1000;
            font-size: 14px;
            text-align: center;
            border: 1px solid #ff4d6d;
        ">
            <p>Nhấn nút nhạc ở góc phải để bật nhạc Giáng Sinh! 🎵</p>
        </div>
    `;
    
    document.body.appendChild(hint);
    
    // Tự động xóa sau 5 giây
    setTimeout(() => {
        if (document.body.contains(hint)) {
            document.body.removeChild(hint);
        }
    }, 5000);
}

// Hiệu ứng gõ chữ cho thư
function typeWriterEffect() {
    const letterTexts = document.querySelectorAll('.letter-text');
    const greeting = document.querySelector('.greeting');
    const closing = document.querySelector('.closing');
    const signature = document.querySelector('.signature');
    const christmasWish = document.querySelector('.christmas-wish p');
    
    // Đặt độ trễ cho từng phần
    setTimeout(() => {
        greeting.style.opacity = '1';
        greeting.style.transform = 'translateY(0)';
        greeting.style.transition = 'all 0.8s ease';
    }, 300);
    
    letterTexts.forEach((text, index) => {
        setTimeout(() => {
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            text.style.transition = 'all 0.8s ease';
        }, 800 + (index * 500));
    });
    
    setTimeout(() => {
        closing.style.opacity = '1';
        closing.style.transform = 'translateY(0)';
        closing.style.transition = 'all 0.8s ease';
    }, 800 + (letterTexts.length * 500));
    
    setTimeout(() => {
        signature.style.opacity = '1';
        signature.style.transform = 'translateY(0)';
        signature.style.transform = 'scale(1)';
        signature.style.transition = 'all 0.8s ease';
    }, 1200 + (letterTexts.length * 500));
    
    setTimeout(() => {
        christmasWish.style.opacity = '1';
        christmasWish.style.transform = 'translateY(0)';
        christmasWish.style.transition = 'all 0.8s ease';
    }, 1500 + (letterTexts.length * 500));
    
    // Ban đầu ẩn các phần tử
    const elementsToAnimate = [greeting, ...letterTexts, closing, signature, christmasWish];
    elementsToAnimate.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
        }
    });
}

// Thay thế tên trong thư
function replaceNameInLetter() {
    // Có thể thêm logic để thay thế tên ở đây nếu cần
    console.log(`Trang web này dành cho ${girlfriendName} 💖`);
}

// Responsive: điều chỉnh số lượng hạt tuyết khi thay đổi kích thước màn hình
window.addEventListener('resize', function() {
    // Xóa các hạt tuyết cũ
    snowflakes.forEach(snowflake => {
        if (snowflake.element.parentNode) {
            snowflake.element.parentNode.removeChild(snowflake.element);
        }
    });
    
    snowflakes = [];
    
    // Tạo lại hạt tuyết
    createSnowfall();
});