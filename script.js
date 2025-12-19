// Khai báo biến toàn cục
let snowInterval;
let splashSnowInterval;
let noBtnClickCount = 0;
let yesBtnClicked = false;

// Đợi DOM tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const christmasMusic = document.getElementById('christmas-music');
    const snowContainer = document.getElementById('snow-container');
    const splashSnowContainer = document.getElementById('splash-snow-container');
    const attemptCount = document.getElementById('attempt-count');
    
    // Ẩn nội dung chính ban đầu
    mainContent.classList.add('hidden');
    
    // Tạo tuyết cho màn hình chào
    createSplashSnow();
    
    // Xử lý khi nhấn nút ĐỒNG Ý
    yesBtn.addEventListener('click', function() {
        if (yesBtnClicked) return; // Ngăn nhấn nhiều lần
        
        yesBtnClicked = true;
        
        // Thêm hiệu ứng cho nút ĐỒNG Ý
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2)';
        this.innerHTML = 'YÊU ANH!';
        this.style.background = 'linear-gradient(to right, #FF1493, #FF69B4)';
        
        // Dừng tuyết trên màn hình chào
        clearInterval(splashSnowInterval);
        
        // Phát nhạc và mở quà
        christmasMusic.play().catch(error => {
            console.log("Không thể phát nhạc tự động: ", error);
        });
        
        // Ẩn màn hình chào với hiệu ứng
        splashScreen.style.opacity = '0';
        splashScreen.style.pointerEvents = 'none';
        
        // Hiển thị nội dung chính sau 1 giây
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Khởi tạo hiệu ứng tuyết chính
            createSnow();
            
            // Hiệu ứng xuất hiện cho các đoạn văn
            animateParagraphs();
            
        }, 1000);
    });
    
    // Xử lý khi nhấn nút HONG
    noBtn.addEventListener('click', function() {
        // Tăng số lần từ chối
        noBtnClickCount++;
        attemptCount.textContent = noBtnClickCount;
        
        // Thay đổi vị trí nút HONG ngẫu nhiên
        moveNoButton();
        
        // Thay đổi văn bản nút HONG theo số lần nhấn
        changeNoButtonText();
        
        // Hiệu ứng rung cho nút ĐỒNG Ý
        yesBtn.style.animation = 'none';
        setTimeout(() => {
            yesBtn.style.animation = 'yesPulse 2s infinite';
        }, 10);
        
        // Tăng kích thước nút ĐỒNG Ý sau mỗi lần từ chối
        const currentScale = 1 + (noBtnClickCount * 0.05);
        yesBtn.style.transform = `scale(${Math.min(currentScale, 1.3)})`;
    });
    
    // Hàm di chuyển nút HONG
    function moveNoButton() {
        const jokeButtons = document.querySelector('.joke-buttons');
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        const containerWidth = jokeButtons.offsetWidth;
        const containerHeight = jokeButtons.offsetHeight;
        
        // Tính vị trí mới, tránh để nút ra ngoài container
        const maxX = containerWidth - buttonWidth;
        const maxY = containerHeight - buttonHeight;
        
        // Tạo vị trí ngẫu nhiên
        let newX, newY;
        let attempts = 0;
        
        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            attempts++;
            
            // Tránh bị kẹt trong vòng lặp vô hạn
            if (attempts > 100) {
                newX = maxX / 2;
                newY = maxY / 2;
                break;
            }
            
        // Đảm bảo nút không quá gần nút ĐỒNG Ý
        } while (Math.abs(newX - (containerWidth/2 - buttonWidth/2)) < buttonWidth * 1.5 && 
                 Math.abs(newY - (containerHeight/2 - buttonHeight/2)) < buttonHeight * 1.5);
        
        // Áp dụng vị trí mới với hiệu ứng
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${newX}px`;
        noBtn.style.top = `${newY}px`;
        noBtn.style.transition = 'all 0.5s ease';
        
        // Thêm hiệu ứng xoay
        noBtn.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
    }
    
    // Hàm thay đổi văn bản nút HONG
    function changeNoButtonText() {
        const texts = [
            "HONG",
            "Thử lại đi",
            "Chắc không?",
            "Suy nghĩ lại đi",
            "Hong nha",
            "Chọn cái kia đi",
            "Sai rồi",
            "Đừng thế chứ",
            "Anh buồn đấy",
            "Làm ơn mà"
        ];
        
        const randomIndex = Math.min(noBtnClickCount - 1, texts.length - 1);
        noBtn.innerHTML = texts[randomIndex];
    }
    
    // Hàm tạo hiệu ứng tuyết rơi cho màn hình chào
    function createSplashSnow() {
        splashSnowInterval = setInterval(() => {
            // Giới hạn số lượng hạt tuyết
            const snowflakes = splashSnowContainer.querySelectorAll('.snowflake');
            if (snowflakes.length > 80) return;
            
            // Tạo hạt tuyết mới
            createSnowflake(splashSnowContainer);
            
        }, 60);
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
            if (snowflakes.length > 200) return;
            
            // Tạo 2-3 hạt tuyết mỗi lần để có hiệu ứng dày hơn
            for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                createSnowflake(snowContainer);
            }
            
        }, 40);
    }
    
    // Hàm tạo một hạt tuyết
    function createSnowflake(container) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Kích thước nhỏ và mịn (1-4px)
        const size = Math.random() * 3 + 1;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        // Độ mờ ngẫu nhiên (0.3 - 0.8)
        const opacity = Math.random() * 0.5 + 0.3;
        snowflake.style.opacity = opacity.toString();
        
        // Vị trí bắt đầu ngẫu nhiên trên màn hình
        const startX = Math.random() * window.innerWidth;
        snowflake.style.left = `${startX}px`;
        
        // Thời gian rơi chậm (8-15 giây)
        const fallDuration = Math.random() * 7 + 8;
        
        // Độ lệch ngang nhẹ
        const driftX = (Math.random() - 0.5) * 100;
        
        // Tính toán độ mờ dần và thu nhỏ
        const fadeStart = Math.random() * 0.7 + 0.3;
        const shrinkStart = Math.random() * 0.6 + 0.4;
        
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
    
    // Hàm hiệu ứng xuất hiện cho các đoạn văn
    function animateParagraphs() {
        const paragraphs = document.querySelectorAll('.letter-content p');
        paragraphs.forEach((paragraph, index) => {
            setTimeout(() => {
                paragraph.style.opacity = '0';
                paragraph.style.transform = 'translateY(20px)';
                paragraph.style.animation = 'fadeInUp 0.8s ease forwards';
                
                setTimeout(() => {
                    paragraph.style.opacity = '1';
                    paragraph.style.transform = 'translateY(0)';
                }, 10);
            }, index * 500);
        });
    }
    
    // Xử lý khi thay đổi kích thước cửa sổ
    window.addEventListener('resize', function() {
        // Tạo lại tuyết với kích thước mới
        clearInterval(snowInterval);
        const snowflakes = snowContainer.querySelectorAll('.snowflake');
        snowflakes.forEach(flake => flake.remove());
        
        // Đợi một chút rồi tạo lại tuyết
        setTimeout(() => {
            createSnow();
        }, 100);
    });
});