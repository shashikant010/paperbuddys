// --- Initialize functionality on DOM content load ---
document.addEventListener('DOMContentLoaded', () => {
    init3DTilt();
    initPadlockUnlock();
});

// --- 3D Tilting Effect for Feature Cards ---
function init3DTilt() {
    const cards = document.querySelectorAll('.tilting-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Calculate rotation angles (max 15 degrees)
            const rotateX = (+1) * 15 * mouseY / (cardHeight / 2);
            const rotateY = (-1) * 15 * mouseX / (cardWidth / 2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        // Reset rotation on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
}

// --- Dynamic Padlock Unlocking Logic ---
function initPadlockUnlock() {
    const padlock = document.getElementById('padlock');
    const cards = document.querySelectorAll('.feature-card');
    const statusText = document.querySelector('.padlock-status');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            padlock.classList.add('unlocked');
            statusText.textContent = "Authorized Access: UNLOCKED";
            statusText.style.color = "var(--accent)";
        });

        card.addEventListener('mouseleave', () => {
            padlock.classList.remove('unlocked');
            statusText.textContent = "Hover feature cards to unlock access";
            statusText.style.color = "rgba(255,255,255,0.5)";
        });
    });
}

// --- Password Visibility Toggle (for App Form) ---
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = passwordInput.nextElementSibling;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    }
}