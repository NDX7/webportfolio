/**
 * Custom Canvas-based Letter Rain / Matrix Code Ambient Background
 */
class LetterGlitch {
  constructor(elementId, options = {}) {
    this.container = document.getElementById(elementId);
    if (!this.container) return;
    
    // Merge options
    this.options = Object.assign({
      glitchSpeed: 55,
      centerVignette: true,
      outerVignette: false,
      smooth: true,
      glitchColors: ['#0f172a', '#1e293b', '#3b82f6', '#10b981'] // Soft cyberpunk dark/blue/green
    }, options);
    
    this.init();
  }
  
  init() {
    // Append a canvas to the container
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    // CSS bindings for canvas layer
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.canvas.style.pointerEvents = 'none';
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Matrix character pool
    this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+-=[]{}|;:,./<>?ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    this.columns = [];
    this.fontSize = 14;
    
    this.setupColumns();
    this.animate();
  }
  
  resize() {
    this.width = this.canvas.width = this.container.clientWidth;
    this.height = this.canvas.height = this.container.clientHeight;
    this.setupColumns();
  }
  
  setupColumns() {
    const colCount = Math.ceil(this.width / this.fontSize);
    this.columns = [];
    for (let i = 0; i < colCount; i++) {
      this.columns.push({
        x: i * this.fontSize,
        y: Math.random() * -this.height,
        speed: 1.0 + Math.random() * 2.0, // Slow, elegant falling speed
        chars: this.getRandomChars(15),
        opacity: Math.random() * 0.25 + 0.05 // Soft, subtle backdrops
      });
    }
  }
  
  getRandomChars(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.letters[Math.floor(Math.random() * this.letters.length)];
    }
    return result;
  }
  
  animate() {
    // Semi-transparent overlay to create trails
    this.ctx.fillStyle = 'rgba(11, 15, 25, 0.15)'; // Deep indigo/black fade
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    this.ctx.font = `${this.fontSize}px 'JetBrains Mono', monospace`;
    
    this.columns.forEach(col => {
      for (let i = 0; i < col.chars.length; i++) {
        const charY = col.y + i * this.fontSize;
        if (charY < 0 || charY > this.height) continue;
        
        // Randomly change a character in column
        if (Math.random() < 0.04) {
          const arr = col.chars.split('');
          arr[i] = this.letters[Math.floor(Math.random() * this.letters.length)];
          col.chars = arr.join('');
        }
        
        // Select color
        const colorIndex = Math.floor(Math.random() * this.options.glitchColors.length);
        this.ctx.fillStyle = this.options.glitchColors[colorIndex];
        
        // Fade characters as they go up the trail
        this.ctx.globalAlpha = col.opacity * (1 - (i / col.chars.length));
        this.ctx.fillText(col.chars[i], col.x, charY);
      }
      
      // Move speed
      col.y += col.speed;
      if (col.y > this.height) {
        col.y = -col.chars.length * this.fontSize;
        col.speed = 1.0 + Math.random() * 2.0;
        col.opacity = Math.random() * 0.25 + 0.05;
      }
    });
    
    // Vignette background shading
    if (this.options.centerVignette) {
      const gradient = this.ctx.createRadialGradient(
        this.width / 2, this.height / 2, Math.min(this.width, this.height) * 0.2,
        this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.75
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(1, 'rgba(11, 15, 25, 0.9)');
      this.ctx.fillStyle = gradient;
      this.ctx.globalAlpha = 1.0;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    setTimeout(() => {
      requestAnimationFrame(() => this.animate());
    }, this.options.glitchSpeed);
  }
}

/**
 * Local Time clock widget runner (UTC+5:30 Kochi, India)
 */
function runLocalClock() {
  const clockElement = document.getElementById('local-time');
  if (!clockElement) return;

  function updateClock() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    
    try {
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const timeString = formatter.format(new Date());
      clockElement.textContent = `${timeString} (GMT+5:30)`;
    } catch (e) {
      // Fallback if Intl.DateTimeFormat doesn't support the timezone
      const localDate = new Date();
      const offset = 5.5; // India offset
      const utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
      const indiaDate = new Date(utc + (3600000 * offset));
      
      const hh = String(indiaDate.getHours()).padStart(2, '0');
      const mm = String(indiaDate.getMinutes()).padStart(2, '0');
      const ss = String(indiaDate.getSeconds()).padStart(2, '0');
      clockElement.textContent = `${hh}:${mm}:${ss} (GMT+5:30)`;
    }
  }

  // Ticks once per second
  setInterval(updateClock, 1000);
  updateClock();
}

// Initializer
document.addEventListener("DOMContentLoaded", () => {
  // Start glitch matrix backdrop if container exists
  if (document.getElementById('glitch-bg')) {
    new LetterGlitch('glitch-bg', {
      glitchSpeed: 60,
      centerVignette: true,
      outerVignette: false,
      smooth: true,
      glitchColors: ['#0f172a', '#1e293b', '#1e40af', '#10b981']
    });
  }
  
  // Start timezone clock
  runLocalClock();
});