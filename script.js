// ============================================
// TRANG WEB CHÚC MỪNG GIÁNG SINH CHO BẠN GÁI
// ============================================

// Tên bạn gái (có thể thay đổi)
let girlfriendName = "Em yêu";

// ====================
// KHỞI TẠO TRANG WEB
// ====================

document.addEventListener('DOMContentLoaded', function() {
    // Hiển thị tên bạn gái
    document.getElementById('girlfriend-name').textContent = girlfriendName;
    
    // Tạo hiệu ứng tuyết rơi
    createSnowflakes();
    
    // Khởi tạo các sự kiện
    initPhase1Events();
    initPhase2Events();
});

// ====================
// TẠO HIỆU ỨNG TUYẾT RƠI
// ====================

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Kích thước ngẫu nhiên
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Vị trí ngẫu nhiên
        snowflake.style.left = `${Math.random() * 100}vw`;
        
        // Tốc độ rơi ngẫu nhiên
        const duration = Math.random() * 5 + 5;
        snowflake.style.animationDuration = `${duration}s`;
        
        // Độ trễ ngẫu nhiên
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        // Độ mờ ngẫu nhiên
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// ====================
// PHẦN 1: JOKE DỄ THƯƠNG
// ====================

function initPhase1Events() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    
    // Xử lý nút "ĐỒNG Ý"
    yesBtn.addEventListener('click', function() {
        // Phát nhạc
        const bgMusic = document.getElementById('bg-music');
        bgMusic.play().catch(e => console.log("Không thể tự động phát nhạc:", e));
        
        // Chuyển sang Phase 2
        const phase1 = document.getElementById('phase1');
        const phase2 = document.getElementById('phase2');
        
        phase1.classList.add('fade-out');
        
        setTimeout(() => {
            phase1.classList.add('hidden');
            phase2.classList.remove('hidden');
        }, 800);
    });
    
    // Xử lý nút "HONG" - chạy trốn
    noBtn.addEventListener('mouseenter', moveNoButton);
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Đặt vị trí ban đầu cho nút HONG
    moveNoButton();
}

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.buttons-container');
    
    // Lấy kích thước container
    const containerRect = container.getBoundingClientRect();
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Tạo vị trí ngẫu nhiên (tránh nút ĐỒNG Ý ở giữa)
    let newX, newY;
    let attempts = 0;
    
    do {
        newX = Math.random() * (containerRect.width - btnWidth);
        newY = Math.random() * (containerRect.height - btnHeight);
        attempts++;
    } while (isNearCenter(newX, newY, containerRect, btnWidth, btnHeight) && attempts < 10);
    
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

function isNearCenter(x, y, containerRect, btnWidth, btnHeight) {
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;
    const btnCenterX = x + btnWidth / 2;
    const btnCenterY = y + btnHeight / 2;
    
    const distance = Math.sqrt(
        Math.pow(btnCenterX - centerX, 2) + 
        Math.pow(btnCenterY - centerY, 2)
    );
    
    // Nếu khoảng cách < 150px thì quá gần trung tâm
    return distance < 150;
}

// ====================
// PHẦN 2: THƯ GIÁNG SINH
// ====================

function initPhase2Events() {
    // Nút mở quà
    const giftBtn = document.getElementById('gift-btn');
    const letter = document.getElementById('letter');
    const giftSection = document.getElementById('gift-section');
    
    giftBtn.addEventListener('click', function() {
        // Ẩn nút mở quà
        giftSection.style.display = 'none';
        
        // Hiển thị thư với hiệu ứng
        letter.classList.remove('hidden');
        
        // Thêm hiệu ứng đánh máy cho từng đoạn văn
        typeWriterEffect();
        
        // Phát âm thanh hiệu ứng
        playSoundEffect();
    });
}

// ====================
// HIỆU ỨNG ĐÁNH MÁY CHO THƯ
// ====================

function typeWriterEffect() {
    const paragraphs = document.querySelectorAll('.letter-content p');
    
    paragraphs.forEach((paragraph, index) => {
        // Lưu nội dung gốc
        const originalText = paragraph.textContent;
        paragraph.textContent = '';
        paragraph.style.opacity = '0';
        
        // Hiển thị từng đoạn với độ trễ
        setTimeout(() => {
            paragraph.style.opacity = '1';
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    paragraph.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30);
                }
            };
            typeWriter();
        }, index * 1500);
    });
}

// ====================
// PHÁT ÂM THANH HIỆU ỨNG
// ====================

function playSoundEffect() {
    // Tạo âm thanh chuông nhỏ khi mở quà
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Nốt C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Nốt E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Nốt G5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Trình duyệt không hỗ trợ Web Audio API");
    }
}

// ====================
// HIỂN THỊ THÔNG BÁO
// ====================

function showMessage(message, type) {
    // Tạo phần tử thông báo
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-in 2.5s forwards;
    `;
    
    // Màu sắc theo loại thông báo
    if (type === 'success') {
        messageEl.style.backgroundColor = '#4CAF50';
    } else {
        messageEl.style.backgroundColor = '#FF6B8B';
    }
    
    // Thêm CSS cho animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; visibility: hidden; }
        }
    `;
    document.head.appendChild(style);
    
    // Thêm thông báo vào trang
    document.body.appendChild(messageEl);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 3000);
}
