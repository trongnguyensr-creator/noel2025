// Khai báo biến toàn cục
let snowInterval;
let isMusicPlaying = false;
let isSnowActive = true;

// Đợi DOM tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const startBtn = document.getElementById('start-btn');
    const musicToggle = document.getElementById('music-toggle');
    const snowToggle = document.getElementById('snow-toggle');
    const christmasMusic = document.getElementById('christmas-music');
    const snowContainer = document.getElementById('snow-container');
    
    // Ẩn nội dung chính ban đầu
    mainContent.classList.add('hidden');
    
    // Xử lý khi nhấn nút bắt đầu
    startBtn.addEventListener('click', function() {
        // Phát nhạc
        christmasMusic.play().then(() => {
            isMusicPlaying = true;
            updateMusicButton();
        }).catch(error => {
            console.log("Không thể phát nhạc tự động: ", error);
            // Vẫn tiếp tục hiển thị nội dung nếu không thể phát nhạc
        });
        
        // Ẩn màn hình chào
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        
        // Hiển thị nội dung chính sau 1 giây
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Khởi tạo hiệu ứng tuyết
            if (isSnowActive) {
                createSnow();
            }
            
            // Thêm hiệu ứng xuất hiện cho các phần tử
            animateElements();
        }, 1000);
    });
    
    // Xử lý nút bật/tắt nhạc
    musicToggle.addEventListener('click', function() {
        if (isMusicPlaying) {
            christmasMusic.pause();
            isMusicPlaying = false;
        } else {
            christmasMusic.play();
            isMusicPlaying = true;
        }
        updateMusicButton();
    });
    
    // Xử lý nút bật/tắt tuyết
    snowToggle.addEventListener('click', function() {
        isSnowActive = !isSnowActive;
        updateSnowButton();
        
        if (isSnowActive) {
            createSnow();
        } else {
            clearInterval(snowInterval);
            // Xóa tất cả các hạt tuyết
            const snowflakes = document.querySelectorAll('.snowflake');
            snowflakes.forEach(flake => {
                flake.remove();
            });
        }
    });
    
    // Hàm cập nhật trạng thái nút nhạc
    function updateMusicButton() {
        const icon = musicToggle.querySelector('i');
        if (isMusicPlaying) {
            icon.className = 'fas fa-pause';
            musicToggle.innerHTML = '<i class="fas fa-pause"></i> Nhạc: Đang phát';
        } else {
            icon.className = 'fas fa-play';
            musicToggle.innerHTML = '<i class="fas fa-play"></i> Nhạc: Đã tạm dừng';
        }
    }
    
    // Hàm cập nhật trạng thái nút tuyết
    function updateSnowButton() {
        const icon = snowToggle.querySelector('i');
        if (isSnowActive) {
            icon.className = 'fas fa-snowflake';
            snowToggle.innerHTML = '<i class="fas fa-snowflake"></i> Tuyết: Bật';
        } else {
            icon.className = 'far fa-snowflake';
            snowToggle.innerHTML = '<i class="far fa-snowflake"></i> Tuyết: Tắt';
        }
    }
    
    // Hàm tạo hiệu ứng tuyết rơi
    function createSnow() {
        // Xóa tuyết cũ nếu có
        clearInterval(snowInterval);
        const existingSnow = document.querySelectorAll('.snowflake');
        existingSnow.forEach(flake => flake.remove());
        
        // Tạo tuyết mới
        snowInterval = setInterval(() => {
            // Giới hạn số lượng hạt tuyết để tối ưu hiệu năng
            const snowflakes = document.querySelectorAll('.snowflake');
            if (snowflakes.length > 300) return;
            
            // Tạo hạt tuyết mới
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            
            // Kích thước nhỏ và mịn (2-6px)
            const size = Math.random() * 4 + 2;
            snowflake.style.width = `${size}px`;
            snowflake.style.height = `${size}px`;
            
            // Độ mờ ngẫu nhiên (0.4 - 0.9)
            const opacity = Math.random() * 0.5 + 0.4;
            snowflake.style.opacity = opacity.toString();
            
            // Vị trí bắt đầu ngẫu nhiên trên màn hình
            const startX = Math.random() * window.innerWidth;
            snowflake.style.left = `${startX}px`;
            
            // Thời gian rơi chậm (10-20 giây)
            const fallDuration = Math.random() * 10 + 10;
            
            // Độ lệch ngang nhẹ
            const driftX = (Math.random() - 0.5) * 100;
            
            // Áp dụng animation bằng CSS
            snowflake.style.animation = `fall ${fallDuration}s linear infinite`;
            snowflake.style.setProperty('--drift', `${driftX}px`);
            
            // Thêm hạt tuyết vào container
            snowContainer.appendChild(snowflake);
            
            // Xóa hạt tuyết khi animation kết thúc
            setTimeout(() => {
                if (snowflake.parentNode === snowContainer) {
                    snowflake.remove();
                }
            }, fallDuration * 1000);
            
        }, 50); // Tạo hạt tuyết mới mỗi 50ms
    }
    
    // Hàm thêm hiệu ứng cho các phần tử
    function animateElements() {
        const elementsToAnimate = document.querySelectorAll('.card, .gallery-item, .footer');
        
        elementsToAnimate.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'fadeInUp 0.8s ease forwards';
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                // Kích hoạt animation
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 10);
            }, index * 200);
        });
    }
    
    // Thêm CSS animation cho tuyết rơi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-10px) translateX(0);
            }
            100% {
                transform: translateY(${window.innerHeight + 10}px) translateX(var(--drift, 0));
            }
        }
    `;
    document.head.appendChild(style);
    
    // Xử lý khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', function() {
        // Nếu tuyết đang hoạt động, tạo lại animation với chiều cao mới
        if (isSnowActive) {
            // Cập nhật CSS animation với chiều cao cửa sổ mới
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(-10px) translateX(0);
                    }
                    100% {
                        transform: translateY(${window.innerHeight + 10}px) translateX(var(--drift, 0));
                    }
                }
            `;
        }
    });
    
    // Thêm hiệu ứng cho hộp quà khi hover
    const giftBox = document.querySelector('.gift-box');
    giftBox.addEventListener('mouseenter', function() {
        this.style.animation = 'float 0.8s ease-in-out infinite';
    });
    
    giftBox.addEventListener('mouseleave', function() {
        this.style.animation = 'float 3s ease-in-out infinite';
    });
});