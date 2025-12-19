document.addEventListener("DOMContentLoaded", () => {

    const blurBg = document.getElementById("blur-bg");
    const imageLayer = document.getElementById("image-layer");
    const overlay = document.getElementById("overlay");
    const textBox = document.getElementById("text");
    const hint = document.getElementById("hint");
    const scene = document.getElementById("scene");
  
    const slides = [
      {
        img: "images/1.jpg",
        text: "Giữa thiên nhiên yên ả…\nChúc bạn luôn an nhiên."
      },
      {
        img: "images/2.jpg",
        text: "Mong mỗi ngày trôi qua\nđều nhẹ nhàng như gió."
      },
      {
        img: "images/3.jpg",
        text: "Sinh nhật này,\nChúc bạn đủ chậm để hạnh phúc 🎂"
      }
    ];
  
    let index = 0;
    let showingText = false;
    let animating = false;
  
    /* ================= IMAGE FADE ================= */
    function fadeChangeImage(el, url) {
      el.classList.add("fade-out");
  
      setTimeout(() => {
        el.style.backgroundImage = `url("${url}")`;
        el.classList.remove("fade-out");
      }, 600);
    }
  
    function loadSlide(i) {
      fadeChangeImage(blurBg, slides[i].img);
      fadeChangeImage(imageLayer, slides[i].img);
  
      overlay.style.opacity = 0;
      hint.style.opacity = 1;
      textBox.innerHTML = "";
      showingText = false;
    }
  
    /* ================= SMOOTH TEXT (WORD BASED) ================= */
    function smoothText(text) {
      animating = true;
      textBox.innerHTML = "";
  
      const lines = text.split("\n");
  
      lines.forEach((line, lineIndex) => {
        const lineDiv = document.createElement("div");
        lineDiv.style.marginBottom = "0.4em";
  
        const words = line.trim().split(/\s+/);
  
        words.forEach((word, wordIndex) => {
          const span = document.createElement("span");
          span.textContent = word;
  
          span.style.display = "inline-block";
          span.style.marginRight = "0.4em";
          span.style.opacity = "0";
          span.style.transform = "translateY(16px)";
          span.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";
  
          lineDiv.appendChild(span);
  
          const delay =
            lineIndex * 800 +
            wordIndex * 180;
  
          setTimeout(() => {
            span.style.opacity = "1";
            span.style.transform = "translateY(0)";
          }, delay);
        });
  
        textBox.appendChild(lineDiv);
      });
  
      const totalTime =
        lines.length * 800 +
        text.length * 40;
  
      setTimeout(() => {
        animating = false;
      }, totalTime);
    }
  
    /* ================= INIT ================= */
    loadSlide(index);
  
    /* ================= CLICK ================= */
    scene.addEventListener("click", () => {
      if (animating) return;
  
      if (!showingText) {
        overlay.style.opacity = 1;
        hint.style.opacity = 0;
        smoothText(slides[index].text);
        showingText = true;
      } else {
        index++;
  
        if (index < slides.length) {
          loadSlide(index);
        } else {
          // 🎬 CLICK CUỐI – KẾT
          overlay.style.opacity = 0;
          hint.innerText = "Chúc bạn một ngày thật đẹp ✨";
          hint.style.opacity = 1;
  
          setTimeout(() => {
            window.close();
  
            // fallback cho mobile
            setTimeout(() => {
              location.href = "about:blank";
            }, 300);
          }, 1200);
        }
      }
    });
  
  });
  