// ============================================
// TRANG WEB CHÚC MỪNG GIÁNG SINH CHO BẠN GÁI
// ============================================
// Tác giả: Người yêu của em
// Mục đích: Tạo bất ngờ và gửi lời chúc Giáng Sinh ngọt ngào
// ============================================

// ====================
// CẤU HÌNH DỄ CHỈNH SỬA
// ====================

// Tên bạn gái (có thể thay đổi dễ dàng)
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
    initEvents();
    
    // Tự động hiển thị thư sau 5 giây (nếu người dùng chưa bấm nút)
    setTimeout(function() {
        if (document.getElementById('letter').classList.contains('hidden')) {
            // Chỉ hiển thị thông báo nhẹ nhàng
            showNotification();
        }
    }, 5000);
});

// ====================
// TẠO HIỆU ỨNG TUYẾT RƠI
// ====================

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');
    const snowflakeCount = 50; // Số lượng bông tuyết
    
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
// XỬ LÝ SỰ KIỆN
// ====================

function initEvents() {
    // Nút mở quà
    const giftBtn = document.getElementById('gift-btn');
    const letter = document.getElementById('letter');
    
    giftBtn.addEventListener('click', function() {
        // Ẩn nút mở quà
        giftBtn.style.display = 'none';
        
        // Hiển thị thư với hiệu ứng
        letter.classList.remove('hidden');
        
        // Thêm hiệu ứng đánh máy cho từng đoạn văn
        typeWriterEffect();
        
        // Phát âm thanh (nếu có)
        playSoundEffect();
    });
    
    // Nút cập nhật tên
    const updateNameBtn = document.getElementById('update-name-btn');
    const nameInput = document.getElementById('name-input');
    
    updateNameBtn.addEventListener('click', function() {
        updateGirlfriendName();
    });
    
    // Cho phép nhấn Enter để cập nhật tên
    nameInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            updateGirlfriendName();
        }
    });
    
    // Nút nhạc
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    
    musicBtn.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.innerHTML = '<i class="fas fa-pause"></i> <span>Tạm dừng nhạc</span>';
            musicBtn.style.backgroundColor = 'rgba(32, 178, 170, 0.9)';
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> <span>Nhạc Giáng Sinh</span>';
            musicBtn.style.backgroundColor = 'rgba(255, 107, 139, 0.8)';
        }
    });
}

// ====================
// CẬP NHẬT TÊN BẠN GÁI
// ====================

function updateGirlfriendName() {
    const nameInput = document.getElementById('name-input');
    const newName = nameInput.value.trim();
    
    if (newName) {
        girlfriendName = newName;
        document.getElementById('girlfriend-name').textContent = girlfriendName;
        
        // Hiệu ứng khi cập nhật thành công
        nameInput.value = '';
        nameInput.placeholder = `Tên đã cập nhật: ${girlfriendName}`;
        
        // Thông báo
        showMessage(`Anh sẽ gọi em là "${girlfriendName}" nhé! ❤️`, 'success');
    } else {
        showMessage('Em hãy nhập tên của mình vào nhé! 💕', 'error');
    }
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
        
        // Hiển thị từng đoạn với độ trễ
        setTimeout(() => {
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    paragraph.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30); // Tốc độ đánh máy
                }
            };
            typeWriter();
        }, index * 1500); // Độ trễ giữa các đoạn
    });
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

// ====================
// HIỂN THỊ THÔNG BÁO NHẸ NHÀNG
// ====================

function showNotification() {
    // Chỉ hiển thị nếu thư chưa được mở
    if (document.getElementById('letter').classList.contains('hidden')) {
        showMessage('💝 Nhấn nút "Mở quà" để xem lời nhắn từ anh nhé!', 'success');
    }
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
// HÀM BỔ TRỢ
// ====================

// Lưu tên vào localStorage (nếu trình duyệt hỗ trợ)
function saveNameToStorage(name) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("girlfriendChristmasName", name);
    }
}

// Lấy tên từ localStorage (nếu có)
function getNameFromStorage() {
    if (typeof(Storage) !== "undefined") {
        const savedName = localStorage.getItem("girlfriendChristmasName");
        if (savedName) {
            return savedName;
        }
    }
    return null;
}