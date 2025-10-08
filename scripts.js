// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Initialize text split animation for hero title
    initTextSplitAnimation();
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger animations for various animation classes
                if (entry.target.classList.contains('slide-in-left') ||
                    entry.target.classList.contains('slide-in-right') ||
                    entry.target.classList.contains('scale-up') ||
                    entry.target.classList.contains('fade-in-up') ||
                    entry.target.classList.contains('bounce-in')) {
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedSelectors = '.fade-in, .slide-in-left, .slide-in-right, .scale-up, .fade-in-up, .bounce-in, .heading-unblur, .paragraph-unblur, .text-unblur, .word-reveal, .char-reveal';
    
    document.querySelectorAll(animatedSelectors).forEach((el) => {
        // Set initial opacity for animated elements
        if (el.classList.contains('slide-in-left') ||
            el.classList.contains('slide-in-right') ||
            el.classList.contains('scale-up') ||
            el.classList.contains('bounce-in')) {
            el.style.opacity = '0';
        }
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });

    // Lightbox functionality for all clickable images
    const clickableImages = document.querySelectorAll('.clickable-image');
    clickableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(this);
        });
    });

    // Close lightbox when clicking anywhere on it
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', closeLightbox);
    }

    // Also close with X button
    const closeBtn = lightbox?.querySelector('button');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Easter egg: CTRL+ALT+U+Y combo
    let keysPressed = {};
    
    document.addEventListener('keydown', function(e) {
        keysPressed[e.key.toLowerCase()] = true;
        
        // Check if CTRL+ALT+Y are all pressed
        if (keysPressed['control'] && keysPressed['alt'] && keysPressed['y']) {
            activateEasterEgg();
            keysPressed = {}; // Reset after activation
        }
    });
    
    document.addEventListener('keyup', function(e) {
        delete keysPressed[e.key.toLowerCase()];
    });
});

function openLightbox(img) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightbox = document.getElementById('lightbox');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Text split animation function
function initTextSplitAnimation() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;
    
    // Split text into individual characters
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    heroTitle.classList.add('text-split');
    
    // Create spans for each character, preserving spaces
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.classList.add('char');
        
        if (char === ' ') {
            span.innerHTML = '&nbsp;'; // Preserve spaces
        } else {
            span.textContent = char;
        }
        
        heroTitle.appendChild(span);
    }
    
    // Animate characters with staggered delay
    const chars = heroTitle.querySelectorAll('.char');
    
    // Start animation after a short delay
    setTimeout(() => {
        chars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('animate');
            }, index * 50); // 50ms delay between each character
        });
    }, 500); // Initial delay before starting animation
}

// Easter egg function - Mr. Krabs CHAOS takeover!
function activateEasterEgg() {
    const krabsGif = 'https://media.tenor.com/YDAg458HOWgAAAAM/mr-krabs-pose.gif';
    
    // Find all images on the page
    const allImages = document.querySelectorAll('img');
    
    // Store original sources and styles for potential restoration
    if (!window.originalImageSources) {
        window.originalImageSources = [];
        window.originalStyles = {
            body: {},
            elements: []
        };
        
        allImages.forEach((img, index) => {
            window.originalImageSources[index] = img.src;
        });
        
        // Store original body styles
        const body = document.body;
        window.originalStyles.body = {
            backgroundColor: body.style.backgroundColor || getComputedStyle(body).backgroundColor,
            filter: body.style.filter || 'none',
            animation: body.style.animation || 'none'
        };
    }
    
    // Add chaos CSS animations
    addChaosStyles();
    
    // Turn everything red and add shaking
    applyRedChaosEffect();
    
    // Replace all images with Mr. Krabs with intense effects
    allImages.forEach((img, index) => {
        img.style.transition = 'all 0.3s ease-in-out';
        img.style.transform = 'scale(0) rotate(720deg)';
        img.style.filter = 'hue-rotate(0deg) saturate(2) brightness(1.2)';
        
        setTimeout(() => {
            img.src = krabsGif;
            img.alt = 'Mr. Krabs has taken over! 🦀';
            img.style.transform = 'scale(1.1) rotate(0deg)';
            img.style.animation = 'kraबsShake 0.5s infinite, krabsGlow 2s infinite alternate';
            img.style.filter = 'hue-rotate(20deg) saturate(3) brightness(1.5) drop-shadow(0 0 20px red)';
            
            // Random rotation and position chaos
            setTimeout(() => {
                img.style.transform = `scale(1) rotate(${Math.random() * 20 - 10}deg)`;
            }, 300);
        }, Math.random() * 500 + 100);
    });
    
    // Add screen shake effect
    addScreenShake();
    
    // Add floating Mr. Krabs emojis
    addFloatingCrabs();
    
    // Add rainbow text effects
    addRainbowTextEffects();
    
    // Add spinning elements
    addSpinningMadness();
    
    // Add random color flashing
    addColorFlashing();
    
    // Add matrix rain effect
    addMatrixRain();
    
    // Add bouncing elements
    addBouncingElements();
    
    // Add cursor trail
    addCursorTrail();
    
    // Show chaos notification
    showChaosNotification();
    
    // Change page title with more intensity
    const originalTitle = document.title;
    document.title = '🦀💥🔥 MAXIMUM CHAOS OVERLOAD! 🔥💥🦀 ' + originalTitle;
    
    // Add audio effect (if possible)
    playKrabsSound();
    
    // Add more intense audio
    playIntenseAudio();
    
    // Restore title after 8 seconds
    setTimeout(() => {
        document.title = originalTitle;
    }, 8000);
}

// Show Easter egg notification
function showEasterEggNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff6b6b, #feca57);
            color: white;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            animation: easterEggPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        ">
            🦀 MR. KRABS HAS TAKEN OVER! 🦀<br>
            <small style="font-size: 14px; opacity: 0.9;">Press CTRL+ALT+R to restore images</small>
        </div>
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes easterEggPop {
            0% { transform: translate(-50%, -50%) scale(0) rotate(180deg); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'easterEggPop 0.3s reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 4000);
    
    // Add restore functionality
    addRestoreFunction();
}

// Add function to restore original images
function addRestoreFunction() {
    const restoreHandler = function(e) {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'r') {
            restoreOriginalImages();
            document.removeEventListener('keydown', restoreHandler);
        }
    };
    
    document.addEventListener('keydown', restoreHandler);
}

// Restore original images and remove all chaos effects
function restoreOriginalImages() {
    if (!window.originalImageSources) return;
    
    // Restore images
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img, index) => {
        if (window.originalImageSources[index]) {
            img.style.transition = 'all 0.3s ease-in-out';
            img.style.transform = 'scale(0)';
            img.style.animation = '';
            img.style.filter = '';
            
            setTimeout(() => {
                img.src = window.originalImageSources[index];
                img.alt = img.alt.replace('Mr. Krabs has taken over! 🦀', '').trim();
                img.style.transform = 'scale(1)';
            }, 150);
        }
    });
    
    // Remove all chaos effects
    removeChaosEffects();
    
    // Show restore notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #2ecc71, #27ae60);
            color: white;
            padding: 20px 25px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10002;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 16px;
            animation: easterEggPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        ">
            ✅ SANITY RESTORED! 🧘‍♂️<br>
            <small style="font-size: 12px; opacity: 0.9;">All chaos effects removed</small>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'easterEggPop 0.3s reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Remove all chaos effects
function removeChaosEffects() {
    // Remove chaos styles
    const chaosStyles = document.getElementById('chaos-styles');
    if (chaosStyles) {
        chaosStyles.remove();
    }
    
    // Remove red overlay
    const redOverlay = document.getElementById('chaos-overlay');
    if (redOverlay) {
        redOverlay.remove();
    }
    
    // Remove floating crabs
    const floatingCrabs = document.querySelectorAll('.floating-crab');
    floatingCrabs.forEach(crab => crab.remove());
    
    // Remove matrix characters
    const matrixChars = document.querySelectorAll('.matrix-char');
    matrixChars.forEach(char => char.remove());
    
    // Remove cursor trails
    const cursorTrails = document.querySelectorAll('.cursor-trail');
    cursorTrails.forEach(trail => trail.remove());
    
    // Remove cursor trail event listener
    if (window.cursorTrailHandler) {
        document.removeEventListener('mousemove', window.cursorTrailHandler);
        window.cursorTrailHandler = null;
    }
    
    // Restore body styles
    document.body.style.animation = '';
    document.body.style.filter = '';
    if (window.originalStyles && window.originalStyles.body) {
        document.body.style.backgroundColor = window.originalStyles.body.backgroundColor;
    }
    
    // Restore HTML element
    document.documentElement.style.animation = '';
    
    // Restore all elements
    const elements = document.querySelectorAll('section, nav, div, p, h1, h2, h3, h4, h5, h6, span, a, img, button');
    elements.forEach(el => {
        el.style.animation = '';
        el.style.filter = '';
        el.style.color = '';
        el.style.textShadow = '';
        el.style.fontWeight = '';
        el.style.border = '';
        el.style.boxShadow = '';
        el.style.transformOrigin = '';
    });
    
    // Clear stored data
    window.originalImageSources = null;
    window.originalStyles = null;
}

// Add chaos CSS animations
function addChaosStyles() {
    const chaosStyle = document.createElement('style');
    chaosStyle.id = 'chaos-styles';
    chaosStyle.textContent = `
        @keyframes krabsShake {
            0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
            10% { transform: translateX(-2px) translateY(-1px) rotate(-1deg); }
            20% { transform: translateX(2px) translateY(1px) rotate(1deg); }
            30% { transform: translateX(-1px) translateY(2px) rotate(-1deg); }
            40% { transform: translateX(1px) translateY(-2px) rotate(1deg); }
            50% { transform: translateX(-2px) translateY(1px) rotate(-1deg); }
            60% { transform: translateX(2px) translateY(-1px) rotate(1deg); }
            70% { transform: translateX(-1px) translateY(-2px) rotate(-1deg); }
            80% { transform: translateX(1px) translateY(2px) rotate(1deg); }
            90% { transform: translateX(-2px) translateY(-1px) rotate(-1deg); }
        }
        
        @keyframes krabsGlow {
            0% { 
                filter: hue-rotate(0deg) saturate(3) brightness(1.5) drop-shadow(0 0 10px red);
                box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
            }
            100% { 
                filter: hue-rotate(60deg) saturate(4) brightness(2) drop-shadow(0 0 30px orange);
                box-shadow: 0 0 40px rgba(255, 100, 0, 1);
            }
        }
        
        @keyframes screenShake {
            0%, 100% { transform: translateX(0) translateY(0); }
            10% { transform: translateX(-5px) translateY(-3px); }
            20% { transform: translateX(5px) translateY(3px); }
            30% { transform: translateX(-3px) translateY(5px); }
            40% { transform: translateX(3px) translateY(-5px); }
            50% { transform: translateX(-5px) translateY(3px); }
            60% { transform: translateX(5px) translateY(-3px); }
            70% { transform: translateX(-3px) translateY(-5px); }
            80% { transform: translateX(3px) translateY(5px); }
            90% { transform: translateX(-5px) translateY(-3px); }
        }
        
        @keyframes redPulse {
            0%, 100% { 
                background-color: rgba(255, 0, 0, 0.1) !important;
                filter: hue-rotate(0deg) saturate(2) brightness(1.2);
            }
            50% { 
                background-color: rgba(255, 0, 0, 0.3) !important;
                filter: hue-rotate(20deg) saturate(3) brightness(1.5);
            }
        }
        
        @keyframes floatCrab {
            0% { 
                transform: translateY(100vh) rotate(0deg) scale(0.5);
                opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { 
                transform: translateY(-100px) rotate(360deg) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes rainbowText {
            0% { color: #ff0000; text-shadow: 0 0 20px #ff0000; }
            16% { color: #ff8000; text-shadow: 0 0 20px #ff8000; }
            33% { color: #ffff00; text-shadow: 0 0 20px #ffff00; }
            50% { color: #00ff00; text-shadow: 0 0 20px #00ff00; }
            66% { color: #0080ff; text-shadow: 0 0 20px #0080ff; }
            83% { color: #8000ff; text-shadow: 0 0 20px #8000ff; }
            100% { color: #ff0000; text-shadow: 0 0 20px #ff0000; }
        }
        
        @keyframes spinMadness {
            0% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.2); }
            50% { transform: rotate(180deg) scale(0.8); }
            75% { transform: rotate(270deg) scale(1.5); }
            100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes colorFlash {
            0% { background-color: #ff0000 !important; }
            10% { background-color: #ff8000 !important; }
            20% { background-color: #ffff00 !important; }
            30% { background-color: #00ff00 !important; }
            40% { background-color: #00ffff !important; }
            50% { background-color: #0080ff !important; }
            60% { background-color: #8000ff !important; }
            70% { background-color: #ff00ff !important; }
            80% { background-color: #ff0080 !important; }
            90% { background-color: #80ff00 !important; }
            100% { background-color: #ff0000 !important; }
        }
        
        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes bounceMadness {
            0%, 100% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-50px) scale(1.2) rotate(10deg); }
            50% { transform: translateY(-100px) scale(0.8) rotate(-10deg); }
            75% { transform: translateY(-25px) scale(1.1) rotate(5deg); }
        }
        
        @keyframes cursorTrail {
            0% { 
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
        
        .chaos-red-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            background: radial-gradient(circle, rgba(255,0,0,0.2) 0%, rgba(255,100,0,0.1) 50%, rgba(255,0,0,0.15) 100%) !important;
            pointer-events: none !important;
            z-index: 9998 !important;
            animation: redPulse 1s infinite !important;
        }
    `;
    document.head.appendChild(chaosStyle);
}

// Apply red chaos effect to everything
function applyRedChaosEffect() {
    // Add red overlay
    const redOverlay = document.createElement('div');
    redOverlay.className = 'chaos-red-overlay';
    redOverlay.id = 'chaos-overlay';
    document.body.appendChild(redOverlay);
    
    // Make body shake and turn reddish
    document.body.style.animation = 'screenShake 0.5s infinite, redPulse 2s infinite';
    document.body.style.filter = 'hue-rotate(350deg) saturate(1.5) brightness(1.1)';
    
    // Apply effects to all major elements
    const elements = document.querySelectorAll('section, nav, div, p, h1, h2, h3, h4, h5, h6');
    elements.forEach(el => {
        if (!el.id || el.id !== 'chaos-overlay') {
            el.style.animation = 'krabsShake 0.3s infinite';
            el.style.filter = 'hue-rotate(340deg) saturate(1.3)';
        }
    });
}

// Add screen shake effect
function addScreenShake() {
    const html = document.documentElement;
    html.style.animation = 'screenShake 0.8s infinite';
    
    // Stop screen shake after 10 seconds
    setTimeout(() => {
        html.style.animation = '';
    }, 10000);
}

// Add floating Mr. Krabs emojis
function addFloatingCrabs() {
    const crabEmojis = ['🦀', '🦀', '🦀', '🦀', '🦀'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const crab = document.createElement('div');
            crab.textContent = crabEmojis[Math.floor(Math.random() * crabEmojis.length)];
            crab.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                font-size: ${Math.random() * 40 + 20}px;
                z-index: 9999;
                pointer-events: none;
                animation: floatCrab ${Math.random() * 3 + 4}s linear;
                filter: drop-shadow(0 0 10px red);
            `;
            crab.className = 'floating-crab';
            
            document.body.appendChild(crab);
            
            // Remove after animation
            setTimeout(() => {
                if (crab.parentNode) {
                    crab.remove();
                }
            }, 7000);
        }, Math.random() * 5000);
    }
}

// Show chaos notification
function showChaosNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff0000, #ff6600, #ff0000);
            color: white;
            padding: 30px 40px;
            border-radius: 20px;
            box-shadow: 0 0 50px rgba(255, 0, 0, 0.8);
            z-index: 10001;
            font-family: 'Inter', sans-serif;
            font-weight: bold;
            font-size: 24px;
            text-align: center;
            animation: easterEggPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), krabsShake 0.5s infinite;
            border: 3px solid #ffff00;
            text-shadow: 0 0 10px rgba(255, 255, 0, 0.8);
        ">
            🦀💥 MR. KRABS CHAOS MODE! 💥🦀<br>
            <div style="font-size: 16px; margin-top: 10px; opacity: 0.9;">
                🔥 EVERYTHING IS RED AND SHAKING! 🔥<br>
                <small style="font-size: 14px;">Press CTRL+ALT+R to restore sanity</small>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 6 seconds
    setTimeout(() => {
        notification.style.animation = 'easterEggPop 0.3s reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 6000);
}

// Play Krabs sound effect (if possible)
function playKrabsSound() {
    try {
        // Create audio context for beep sounds
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a series of beeps to simulate chaos
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(200 + Math.random() * 400, audioContext.currentTime);
                oscillator.type = 'square';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.2);
            }, i * 200);
        }
    } catch (e) {
        console.log('Audio not available, but chaos continues!');
    }
}

// Add rainbow text effects
function addRainbowTextEffects() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a');
    textElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `rainbowText 2s infinite, krabsShake 0.5s infinite`;
            el.style.fontWeight = 'bold';
        }, index * 50);
    });
}

// Add spinning madness to random elements
function addSpinningMadness() {
    const spinElements = document.querySelectorAll('div, section, nav');
    const randomElements = Array.from(spinElements).sort(() => 0.5 - Math.random()).slice(0, 10);
    
    randomElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = `spinMadness 3s infinite, krabsShake 0.3s infinite`;
            el.style.transformOrigin = 'center';
        }, index * 200);
    });
}

// Add random color flashing to backgrounds
function addColorFlashing() {
    const flashElements = document.querySelectorAll('section, div, nav');
    flashElements.forEach((el, index) => {
        setTimeout(() => {
            const currentBg = el.style.backgroundColor;
            el.style.animation += `, colorFlash 1s infinite`;
            el.style.border = '3px solid #ffff00';
            el.style.boxShadow = '0 0 30px rgba(255, 255, 0, 0.8)';
        }, index * 100);
    });
}

// Add Matrix rain effect
function addMatrixRain() {
    const matrixChars = ['🦀', '💰', '💎', '⭐', '🔥', '💥', '⚡', '🌟'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const matrixChar = document.createElement('div');
            matrixChar.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            matrixChar.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: -50px;
                font-size: ${Math.random() * 30 + 15}px;
                color: #00ff00;
                z-index: 9999;
                pointer-events: none;
                animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
                text-shadow: 0 0 10px #00ff00;
                font-weight: bold;
            `;
            matrixChar.className = 'matrix-char';
            
            document.body.appendChild(matrixChar);
            
            setTimeout(() => {
                if (matrixChar.parentNode) {
                    matrixChar.remove();
                }
            }, 5000);
        }, Math.random() * 3000);
    }
}

// Add bouncing elements
function addBouncingElements() {
    const bounceElements = document.querySelectorAll('img, button, a');
    bounceElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation += `, bounceMadness 2s infinite`;
            el.style.transformOrigin = 'center bottom';
        }, index * 150);
    });
}

// Add cursor trail effect
function addCursorTrail() {
    let trailElements = [];
    
    const createTrail = (e) => {
        const trail = document.createElement('div');
        trail.textContent = '🦀';
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX - 10}px;
            top: ${e.clientY - 10}px;
            font-size: 20px;
            pointer-events: none;
            z-index: 10000;
            animation: cursorTrail 1s ease-out forwards;
        `;
        trail.className = 'cursor-trail';
        
        document.body.appendChild(trail);
        trailElements.push(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
            trailElements = trailElements.filter(t => t !== trail);
        }, 1000);
    };
    
    document.addEventListener('mousemove', createTrail);
    
    // Store the event listener for cleanup
    window.cursorTrailHandler = createTrail;
}

// Enhanced audio chaos
function playIntenseAudio() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create multiple oscillators for chaos
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Random frequency and type for chaos
                oscillator.frequency.setValueAtTime(100 + Math.random() * 800, audioContext.currentTime);
                oscillator.type = ['sine', 'square', 'sawtooth', 'triangle'][Math.floor(Math.random() * 4)];
                
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }, i * 100);
        }
        
        // Add some bass drops
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const bassOsc = audioContext.createOscillator();
                const bassGain = audioContext.createGain();
                
                bassOsc.connect(bassGain);
                bassGain.connect(audioContext.destination);
                
                bassOsc.frequency.setValueAtTime(60, audioContext.currentTime);
                bassOsc.type = 'sawtooth';
                
                bassGain.gain.setValueAtTime(0.1, audioContext.currentTime);
                bassGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
                
                bassOsc.start(audioContext.currentTime);
                bassOsc.stop(audioContext.currentTime + 1);
            }, i * 1500);
        }
    } catch (e) {
        console.log('Enhanced audio chaos not available!');
    }
}
