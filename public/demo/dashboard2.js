document.addEventListener('DOMContentLoaded', () => {
    initBackgroundSparkline();
    initMiniSparkline();
    animateAttendance();
});

// --- Custom Animation: Glowing Background Sparkline ---
function initBackgroundSparkline() {
    const canvas = document.getElementById('bg-sparkline');
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        
        // Create a flowing sine wave
        for (let i = 0; i < width; i++) {
            const y = Math.sin((i * 0.005) + time) * 100 + (height / 2);
            if (i === 0) ctx.moveTo(i, y);
            else ctx.lineTo(i, y);
        }

        // Styling the glowing line
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(255, 0, 127, 0.5)';
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(255, 0, 127, 1)';
        ctx.stroke();

        time += 0.02; // Speed of the wave
        requestAnimationFrame(draw);
    }
    draw();
}

// --- Custom Animation: Mini Sparkline in Bento Box ---
function initMiniSparkline() {
    const canvas = document.getElementById('mini-sparkline');
    const ctx = canvas.getContext('2d');
    
    // Set actual canvas resolution to match display size to prevent blurring
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width - 50; 
    canvas.height = 100;

    const points = [10, 40, 25, 60, 45, 80, 50, 90, 70];
    const spacing = canvas.width / (points.length - 1);

    // Draw the line with a gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#00ffcc');
    gradient.addColorStop(1, '#ff007f');

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - points[0]);

    for (let i = 1; i < points.length; i++) {
        // Smooth bezier curves between points
        const xc = (spacing * (i - 1) + spacing * i) / 2;
        const yc = (canvas.height - points[i - 1] + canvas.height - points[i]) / 2;
        ctx.quadraticCurveTo(spacing * (i - 1), canvas.height - points[i - 1], xc, yc);
    }
    ctx.lineTo(canvas.width, canvas.height - points[points.length - 1]);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff007f';
    ctx.stroke();
    
    // Add glowing dots on data points
    points.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(i * spacing, canvas.height - p, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    });
}

// --- Trigger Circular Progress Animation ---
function animateAttendance() {
    setTimeout(() => {
        const progressCircle = document.querySelector('.circular-progress .progress');
        // stroke-dasharray is 251. 85% means (1 - 0.85) * 251 = 37.65 offset
        progressCircle.style.strokeDashoffset = '37.65';
    }, 500); // Slight delay for dramatic effect after page load
}