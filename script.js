// script.js - Hiệu ứng tuyết và tương tác

document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");
  const startButton = document.getElementById("start-button");
  const audio = document.getElementById("christmas-music");
  const snowContainer = document.getElementById("snow-container");

  // Tạo tuyết rơi
  function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = "❅"; // hoặc "•", "✻", "❆"

    // Kích thước ngẫu nhiên nhỏ
    const size = Math.random() * 0.6 + 0.4; // 0.4em - 1em
    snowflake.style.fontSize = `${size}em`;

    // Vị trí ngang ngẫu nhiên
    snowflake.style.left = `${Math.random() * 100}vw`;

    // Thời gian rơi (chậm)
    const duration = Math.random() * 15 + 10; // 10-25s
    snowflake.style.animationDuration = `${duration}s`;

    // Độ trễ khởi động
    snowflake.style.animationDelay = `${Math.random() * 5}s`;

    // Dao động ngang nhẹ
    const drift = Math.random() * 100 - 50; // -50px đến +50px
    snowflake.style.setProperty('--drift', `${drift}px`);

    // Độ mờ
    snowflake.style.opacity = Math.random() * 0.5 + 0.4; // 0.4 - 0.9

    snowContainer.appendChild(snowflake);

    // Xóa sau khi rơi xong để tiết kiệm bộ nhớ
    setTimeout(() => {
      snowflake.remove();
    }, (duration + 1) * 1000);
  }

  // Tạo nhiều tuyết liên tục
  setInterval(createSnowflake, 80); // Tạo mỗi 80ms → tuyết dày nhưng nhẹ

  // Xử lý nút bắt đầu
  startButton.addEventListener("click", () => {
    // Phát nhạc
    audio.play().catch(e => console.log("Không thể phát nhạc:", e));

    // Ẩn màn hình chào
    welcomeScreen.style.opacity = "0";
    setTimeout(() => {
      welcomeScreen.classList.add("hidden");
    }, 1500);

    // Hiện nội dung chính
    setTimeout(() => {
      mainContent.classList.remove("hidden");
      mainContent.classList.add("visible");
    }, 800);
  });
});
