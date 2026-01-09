// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    // 1. Initial State for Navbar (Hidden)
    gsap.set(".navbar", { y: -100, opacity: 0 });

    // --- Preloader Logic ---
    const counter = document.getElementById("counter");
    const preloader = document.getElementById("preloader");

    // Function to run hero animations AFTER preloader
    function playHeroAnimations() {
        gsap.to(".navbar", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        });

        if (document.querySelector(".main h1")) {
            const heroTimeline = gsap.timeline();
            heroTimeline
                .from(".main h1:not(.h2)", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                })
                .from(".main .h2", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(".main .btn", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");
        }
    }

    if (counter && preloader) {
        // Preloader exists
        let count = 0;
        document.body.style.overflow = 'hidden';

        const loadingBar = document.querySelector('.loading-bar');
        const spotlight = document.querySelector('.preloader-spotlight');
        const counterWrap = document.querySelector('.counter-wrap');
        const loadingText = document.querySelector('.loading-text');

        // Interactive Spotlight & Tilt
        if (spotlight) {
            preloader.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;
                spotlight.style.setProperty('--x', `${x}%`);
                spotlight.style.setProperty('--y', `${y}%`);

                // Simple Tilt for Text
                const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
                if (counterWrap) {
                    gsap.to(counterWrap, {
                        rotationY: moveX,
                        rotationX: -moveY,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                }
            });
        }

        const updateCounter = () => {
            count++;
            counter.innerText = count;

            // Width Progress
            if (loadingBar) loadingBar.style.width = `${count}%`;

            // Random Char Scramble for Loading Text
            if (loadingText && count % 5 === 0 && count < 95) {
                loadingText.innerText = Math.random().toString(36).substring(2, 10).toUpperCase();
            } else if (loadingText && count > 95) {
                loadingText.innerText = "SYSTEM CONNECTED";
            }

            // Scale Calculation
            const scale = 0.5 + (count / 100);
            gsap.set(".counter-wrap", { scale: scale });

            if (count < 100) {
                // Faster speeds: 10ms to 30ms max
                let speed = Math.floor(Math.random() * 20) + 10;
                if (count > 90) speed += 20; // Slight slow down at very end
                setTimeout(updateCounter, speed);
            } else {
                // Done
                gsap.to(".counter-wrap", {
                    scale: 1.2,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in"
                });

                // Fade out bar and text
                gsap.to([".loading-bar-container", ".loading-text"], { opacity: 0, duration: 0.3 });

                gsap.to(preloader, {
                    y: "-100%",
                    duration: 1,
                    ease: "power2.inOut",
                    delay: 0.4,
                    onComplete: () => {
                        document.body.style.overflow = 'visible';
                        playHeroAnimations();
                    }
                });
            }
        };
        updateCounter();
    } else {
        // No preloader (other pages)
        playHeroAnimations();
    }

    // 3. Horizontal Scroll for Services Section (SMOOTH & ELEGANT)
    const servicesSection = document.querySelector(".services-section");
    const servicesWrapper = document.querySelector(".services-wrapper");

    if (servicesSection && servicesWrapper) {
        // Calculate the distance to scroll horizontally
        const getScrollAmount = () => -(servicesWrapper.scrollWidth - window.innerWidth);

        const tween = gsap.to(servicesWrapper, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: ".services-section",
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                scrub: 1, // Smooth scrolling connection
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        // Cinematic Parallax Images inside Cards during Scroll
        // This makes the images move slightly slower/faster than the card for a depth effect
        const localImages = document.querySelectorAll(".card-img-box img");
        localImages.forEach((img) => {
            gsap.to(img, {
                xPercent: 20, // Move image 20% right as we scroll left
                ease: "none",
                scrollTrigger: {
                    trigger: ".services-section",
                    start: "top top",
                    end: () => `+=${getScrollAmount() * -1}`,
                    scrub: 1
                }
            });
        });
    }

    // Smooth "Lift" Hover Effect (Non-3D, more elegant)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15, // Smooth lift
                boxShadow: "0 30px 60px rgba(0,0,0,0.15)",
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    // 4. Section Headers (Generic Fade Up)
    gsap.utils.toArray("h2, .text-blk, .main h1, .service h2").forEach(element => {
        // Skip if it's the main hero h1 which has its own animation
        if (element.closest('.main') && element.tagName === 'H1') return;

        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 5. Stats Counter Animation (Revamped with Interaction)
    if (document.querySelector(".stats-section")) {
        // Staggered Fade Up for Cards
        gsap.from(".stat-card", {
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

        // Header Reveal
        gsap.from(".stats-header", {
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Loop cards to apply counting and interaction
        const statCards = document.querySelectorAll(".stat-card");
        statCards.forEach((card, i) => {
            const stat = card.querySelector(".stat-number");

            // Initial Count Up
            if (stat) {
                const target = +stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix') || "";
                stat.innerText = "0" + suffix;

                let proxy = { val: 0 };
                gsap.to(proxy, {
                    val: target,
                    duration: 2.5,
                    scrollTrigger: {
                        trigger: ".stats-section",
                        start: "top 75%",
                    },
                    ease: "power2.out",
                    onUpdate: () => {
                        stat.innerText = Math.ceil(proxy.val) + suffix;
                    }
                });

                // --- INTERACTION: Hover Scramble ---
                const originalText = target + suffix;
                card.addEventListener('mouseenter', () => {
                    // Quick Scramble
                    let scrambleParams = { val: 0 };
                    gsap.to(scrambleParams, {
                        val: 100,
                        duration: 0.4,
                        onUpdate: () => {
                            if (Math.random() > 0.5) {
                                stat.innerText = Math.floor(Math.random() * target) + suffix;
                            }
                        },
                        onComplete: () => {
                            stat.innerText = originalText;
                        }
                    });
                });
            }

            // --- INTERACTION: 3D Tilt ---
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // Limit tilt
                const rotateX = ((y - centerY) / centerY) * -15;
                const rotateY = ((x - centerX) / centerX) * 15;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    scale: 1.05,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }

    // 6. Features Grid Animation (Why Choose Us)
    if (document.querySelector(".features-grid")) {
        console.log("Initializing Features Grid Animation");
        gsap.from(".feature-box", {
            scrollTrigger: {
                trigger: ".features-grid",
                start: "top 95%", // Trigger almost immediately when in view
                toggleActions: "play none none none"
            },
            y: 50,
            // opacity: 0, // REMOVED to ensure visibility
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            onStart: () => console.log("Features Animation Started")
        });
    }

    // 7A. Service Page Grid Animation
    if (document.querySelectorAll(".service-box-anim").length > 0) {
        gsap.from(".service-box-anim", {
            scrollTrigger: {
                trigger: "#service-grid",
                start: "top 95%", // Trigger as soon as grid touches bottom of screen
                toggleActions: "play none none none"
            },
            y: 50,
            // opacity: 0, // Removed to prevent hidden elements
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.2)"
        });
    }

    // 7. Academic Avengers Detailed Section Animation
    if (document.querySelector(".section-header")) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".main2 .first",
                start: "top 80%",
            }
        });

        tl.from(".section-title", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
            .from(".section-subtitle", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6")
            .from(".section-desc", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6")
            .from(".feature-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .from(".cta-box", {
                scale: 0.9,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");

        // Tilt for Feature Cards Only
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;
                gsap.to(card, { rotationX: rotateX, rotationY: rotateY, transformPerspective: 1000, scale: 1.02, duration: 0.4, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
            });
        });
    }
}

// Initialize when DOM is ready and GSAP is loaded
document.addEventListener("DOMContentLoaded", function () {
    // 0. Desktop Warning Injection
    const injectDesktopWarning = () => {
        if (!document.querySelector('.desktop-warning')) {
            const warningHTML = `
                <div class="desktop-warning">
                    <div class="warning-content">
                        <i class="fa-solid fa-desktop"></i>
                        <div class="line"></div>
                        <h1>DESKTOP ONLY</h1>
                        <p>For the best experience and to access all academic features, please use a desktop or laptop computer.</p>
                        <p style="font-size: 14px; opacity: 0.5;">Academic Avengers System</p>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', warningHTML);
        }
    };
    injectDesktopWarning();

    console.log("Stats JS Loaded"); // Debug
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        initAnimations();
    } else {
        console.warn("GSAP or ScrollTrigger not loaded. Animations disabled.");
    }

    // Contact Form Submission Logic
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = "Sending...";
            btn.disabled = true;

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.success) {
                    alert("Message Sent Successfully! We will contact you soon.");
                    this.reset();
                } else {
                    alert("Failed to send message. Please try again.");
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Something went wrong. Please try again later.");
            } finally {
                btn.innerText = originalText;
                btn.disabled = false;
            }
        });
    }

    // Custom Cursor Logic
    const cursor = document.createElement("div");
    cursor.id = "custom-cursor";
    document.body.appendChild(cursor);

    // simple initial set
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    // quickTo is highly optimized for mouse movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.001, ease: "none" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.001, ease: "none" });

    document.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });

    // Hover effects for clickable elements
    const clickables = document.querySelectorAll("a, button, .card, .box, input, textarea");
    clickables.forEach(el => {
        el.addEventListener("mouseenter", () => document.body.classList.add("hovered"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("hovered"));
    });

    /* --- Hero Particle Network (Constellation) --- */
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 60; // Number of dots

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, index) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = index; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    // Connect if close
                    if (dist < 150) {
                        ctx.strokeStyle = `rgba(0,0,0, ${1 - dist / 150})`; // Fade out
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Parallax Effect on Hero Text
        const heroSection = document.querySelector('.main');
        const heroTitle = document.querySelector('.main h1');
        const heroSubtitle = document.querySelector('.main .h2');

        if (heroSection && heroTitle && heroSubtitle) {
            heroSection.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                gsap.to(heroTitle, { x: x * 30, y: y * 30, duration: 1, ease: 'power2.out' });
                gsap.to(heroSubtitle, { x: x * 20, y: y * 20, duration: 1, ease: 'power2.out' });
            });
        }
    }
});