// Khai báo biến toàn cục
let snowInterval;
let splashSnowInterval;
let isMusicPlaying = false;
let isSnowActive = true;
let typingElements = [];
let currentTypingIndex = 0;

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
    const splashSnowContainer = document.getElementById('splash-snow-container');
    
    // Ẩn nội dung chính ban đầu
    mainContent.classList.add('hidden');
    
    // Tạo tuyết cho màn hình chào
    createSplashSnow();
    
    // Xử lý khi nhấn nút bắt đầu
    startBtn.addEventListener('click', function() {
        // Thêm hiệu ứng nhấn nút
        this.style.animation = 'none';
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
        
        // Phát nhạc
        christmasMusic.play().then(() => {
            isMusicPlaying = true;
            updateMusicButton();
        }).catch(error => {
            console.log("Không thể phát nhạc tự động: ", error);
            // Vẫn tiếp tục hiển thị nội dung nếu không thể phát nhạc
        });
        
        // Ẩn màn hình chào với hiệu ứng
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        
        // Dừng tuyết trên màn hình chào
        clearInterval(splashSnowInterval);
        
        // Hiển thị nội dung chính sau 1 giây
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Khởi tạo hiệu ứng tuyết chính
            if (isSnowActive) {
                createSnow();
            }
            
            // Bắt đầu hiệu ứng gõ chữ
            startTypingEffects();
            
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
    
    // Hàm tạo hiệu ứng tuyết rơi cho màn hình chào
    function createSplashSnow() {
        splashSnowInterval = setInterval(() => {
            // Giới hạn số lượng hạt tuyết
            const snowflakes = splashSnowContainer.querySelectorAll('.snowflake');
            if (snowflakes.length > 100) return;
            
            // Tạo hạt tuyết mới
            createSnowflake(splashSnowContainer, true);
            
        }, 80); // Tạo hạt tuyết mới mỗi 80ms
    }
    
    // Hàm tạo hiệu ứng tuyết rơi chính
    function createSnow() {
        // Xóa tuyết cũ nếu có
        clearInterval(snowInterval);
        const existingSnow = snowContainer.querySelectorAll('.snowflake');
        existingSnow.forEach(flake => flake.remove());
        
        // Tạo tuyết mới
        snowInterval = setInterval(() => {
            // Giới hạn số lượng hạt tuyết để tối ưu hiệu năng
            const snowflakes = snowContainer.querySelectorAll('.snowflake');
            if (snowflakes.length > 250) return;
            
            // Tạo 2-3 hạt tuyết mỗi lần để có hiệu ứng dày hơn
            for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                createSnowflake(snowContainer, false);
            }
            
        }, 30); // Tạo hạt tuyết mới mỗi 30ms
    }
    
    // Hàm tạo một hạt tuyết
    function createSnowflake(container, isSplash) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Kích thước nhỏ và mịn (1-5px)
        const size = Math.random() * 4 + 1;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Độ mờ ngẫu nhiên (0.3 - 0.9)
        const opacity = Math.random() * 0.6 + 0.3;
        snowflake.style.opacity = opacity.toString();
        
        // Vị trí bắt đầu ngẫu nhiên trên màn hình
        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;
        
        // Thời gian rơi chậm (8-18 giây)
        const fallDuration = Math.random() * 10 + 8;
        
        // Độ lệch ngang nhẹ
        const driftX = (Math.random() - 0.5) * 150;
        
        // Tính toán độ mờ dần và thu nhỏ
        const fadeStart = Math.random() * 0.7 + 0.3; // Bắt đầu mờ dần từ 30-100% thời gian
        const shrinkStart = Math.random() * 0.6 + 0.4; // Bắt đầu thu nhỏ từ 40-100% thời gian
        
        // Tạo animation bằng JavaScript để có hiệu ứng mờ dần và thu nhỏ
        let startTime = null;
        const startY = -10;
        const endY = window.innerHeight + 10;
        
        function animateSnowflake(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / (fallDuration * 1000), 1);
            
            // Tính vị trí Y
            const currentY = startY + (endY - startY) * progress;
            
            // Tính độ lệch X theo thời gian (hiệu ứng dao động)
            const driftProgress = Math.sin(progress * Math.PI * 2) * driftX;
            
            // Tính opacity (mờ dần)
            let currentOpacity = opacity;
            if (progress > fadeStart) {
                currentOpacity = opacity * (1 - (progress - fadeStart) / (1 - fadeStart));
            }
            
            // Tính scale (thu nhỏ)
            let currentScale = 1;
            if (progress > shrinkStart) {
                currentScale = 1 - (progress - shrinkStart) / (1 - shrinkStart);
            }
            
            // Áp dụng các giá trị
            snowflake.style.transform = `translateY(${currentY}px) translateX(${driftProgress}px) scale(${currentScale})`;
            snowflake.style.opacity = currentOpacity.toString();
            
            // Tiếp tục animation nếu chưa kết thúc
            if (progress < 1) {
                requestAnimationFrame(animateSnowflake);
            } else {
                // Xóa hạt tuyết khi animation kết thúc
                if (snowflake.parentNode === container) {
                    snowflake.remove();
                }
            }
        }
        
        // Bắt đầu animation
        requestAnimationFrame(animateSnowflake);
        
        // Thêm hạt tuyết vào container
        container.appendChild(snowflake);
    }
    
    // Hàm bắt đầu hiệu ứng gõ chữ
    function startTypingEffects() {
        // Chuẩn bị nội dung cần gõ
        const typingContent = [
            { id: 'typed-subtitle', text: 'Chúc em một mùa Giáng Sinh thật ấm áp và hạnh phúc', delay: 500 },
            { id: 'typed-greeting', text: 'Gửi em yêu của anh,', delay: 1000 },
            { id: 'typed-line1', text: 'Giáng Sinh năm nay thật đặc biệt vì có em bên cạnh.', delay: 1500 },
            { id: 'typed-line2', text: 'Mỗi khi mùa đông đến, những bông tuyết trắng rơi nhẹ nhàng, anh lại nghĩ về nụ cười ấm áp của em. Em chính là món quà tuyệt vời nhất mà cuộc đời đã ban tặng cho anh.', delay: 2500 },
            { id: 'typed-line3', text: 'Trong không khí của đêm Giáng Sinh lãng mạn, anh muốn gửi đến em những lời chúc ngọt ngào nhất: Chúc em luôn hạnh phúc, rạng rỡ và tràn đầy năng lượng. Chúc cho tình yêu của chúng ta mãi bền vững như những cây thông xanh tươi trong mùa đông giá lạnh.', delay: 4000 },
            { id: 'typed-line4', text: 'Cảm ơn em đã đến bên anh, cùng anh sưởi ấm những ngày đông giá lạnh. Hy vọng rằng mỗi mùa Giáng Sinh về, chúng ta lại có nhau, cùng đón những khoảnh khắc đẹp bên gia đình và những người thân yêu.', delay: 6000 },
            { id: 'typed-closing', text: 'Yêu em nhiều,', delay: 8000 },
            { id: 'typed-photo-text', text: 'Chỗ này dành cho ảnh của chúng mình', delay: 8500 },
            { id: 'typed-footer', text: 'Chúc em một mùa Giáng Sinh an lành và hạnh phúc bên gia đình!', delay: 9000 },
            { id: 'wish1', text: 'Mong em luôn khỏe mạnh và hạnh phúc', delay: 9500 },
            { id: 'wish2', text: 'Chúc em thành công trong công việc và cuộc sống', delay: 10000 },
            { id: 'wish3', text: 'Hy vọng chúng ta sẽ có nhiều kỷ niệm đẹp bên nhau', delay: 10500 },
            { id: 'wish4', text: 'Chúc tình yêu của chúng ta mãi bền chặt', delay: 11000 }
        ];
        
        // Thực hiện gõ từng phần tử
        typingContent.forEach((item, index) => {
            setTimeout(() => {
                typeText(item.id, item.text);
            }, item.delay);
        });
        
        // Hiệu ứng xuất hiện cho các gallery items
        setTimeout(() => {
            const galleryItems = ['gift-item', 'tree-item', 'cookie-item'];
            galleryItems.forEach((id, idx) => {
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.style.animation = 'fadeInUp 0.8s ease forwards';
                        element.style.opacity = '0';
                        element.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, 10);
                    }
                }, idx * 300);
            });
        }, 11500);
    }
    
    // Hàm gõ chữ với hiệu ứng
    function typeText(elementId, text) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        // Xóa nội dung cũ
        element.textContent = '';
        
        // Tạo cursor
        const cursor = document.createElement('span');
        cursor.classList.add('typing-cursor');
        element.appendChild(cursor);
        
        // Tốc độ gõ chữ ngẫu nhiên
        const typingSpeed = Math.random() * 30 + 20; // 20-50ms mỗi ký tự
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                // Chèn ký tự
                const char = text.charAt(charIndex);
                const charSpan = document.createElement('span');
                charSpan.textContent = char;
                element.insertBefore(charSpan, cursor);
                
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Xóa cursor khi hoàn thành
                cursor.remove();
                
                // Thêm hiệu ứng rung nhẹ cho một số phần tử quan trọng
                if (elementId === 'typed-greeting' || elementId === 'typed-closing') {
                    element.style.animation = 'gentle-shake 0.5s ease';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 500);
                }
            }
        }
        
        // Bắt đầu gõ
        typeChar();
    }
    
    // Thêm CSS animation cho tuyết rơi
    const style = document.createElement('style');
    document.head.appendChild(style);
    
    // Xử lý khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', function() {
        // Nếu tuyết đang hoạt động, tạo lại với kích thước mới
        if (isSnowActive) {
            clearInterval(snowInterval);
            const snowflakes = snowContainer.querySelectorAll('.snowflake');
            snowflakes.forEach(flake => flake.remove());
            
            // Đợi một chút rồi tạo lại tuyết
            setTimeout(() => {
                if (isSnowActive) {
                    createSnow();
                }
            }, 100);
        }
    });
    
    // Thêm hiệu ứng cho hộp quà khi hover
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) {
        giftBox.addEventListener('mouseenter', function() {
            this.style.animation = 'float 1s ease-in-out infinite, gentle-shake 1s ease-in-out infinite';
        });
        
        giftBox.addEventListener('mouseleave', function() {
            this.style.animation = 'float 4s ease-in-out infinite, gentle-shake 3s ease-in-out infinite';
        });
    }
    
    // Hiệu ứng cho nút bắt đầu khi hover
    startBtn.addEventListener('mouseenter', function() {
        this.style.animation = 'bounce 0.8s infinite, gentle-shake 1.5s ease-in-out infinite';
    });
    
    startBtn.addEventListener('mouseleave', function() {
        this.style.animation = 'bounce 2s infinite, gentle-shake 3s ease-in-out infinite';
    });
});