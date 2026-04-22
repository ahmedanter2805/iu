// Global UI Logic (Preloader, Sidebar Toggle)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Handling - Ultra Robust Version
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const hide = () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        };
        
        // Hide anyway after 3 seconds as a safety net
        setTimeout(hide, 3000);
        
        if (document.readyState === 'complete') {
            hide();
        } else {
            window.addEventListener('load', hide);
        }
    }

    // 2. Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 2b. Sidebar Collapse (Desktop)
    const collapseToggle = document.getElementById('collapseToggle');
    const collapseIcon = document.getElementById('collapseIcon');
    if (collapseToggle && sidebar) {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            sidebar.classList.add('collapsed');
            if (collapseIcon) collapseIcon.classList.replace('fa-chevron-left', 'fa-chevron-right');
        }
        collapseToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            const nowCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', nowCollapsed);
            if (collapseIcon) {
                if (nowCollapsed) collapseIcon.classList.replace('fa-chevron-left', 'fa-chevron-right');
                else collapseIcon.classList.replace('fa-chevron-right', 'fa-chevron-left');
            }
        });
    }

    // 3. Header Navigation Toggle (Mobile)
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 4. Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        setInterval(nextSlide, 5000);
    }
});

// Auth Logic (Keep if needed)
const authWrapper = document.querySelector('.auth-wrapper');
const loginTrigger = document.querySelector('.login-trigger');
const registerTrigger = document.querySelector('.register-trigger');

if (registerTrigger && authWrapper) {
    registerTrigger.onclick = (e) => { e.preventDefault(); authWrapper.classList.add('toggled'); };
}
if (loginTrigger && authWrapper) {
    loginTrigger.onclick = (e) => { e.preventDefault(); authWrapper.classList.remove('toggled'); };
}
