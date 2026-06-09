document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Icons
    lucide.createIcons();

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover states for cursor
    const magnetics = document.querySelectorAll('.magnetic, a, button, .pill');
    magnetics.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('hover-state'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('hover-state'));
    });

    // 3. 3D Tilt Effect on Bento Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // max rotation 5deg
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            // Smooth reset
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        
        card.addEventListener('mouseenter', () => {
            // Remove transition during hover for instant tracking
            card.style.transition = 'none';
        });
    });

    // 4. Scroll Reveal (Blur & Fade)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-text, .tilt-card').forEach((el) => {
        // Add reveal class to cards if they don't have it
        if(!el.classList.contains('reveal-text')) {
            el.classList.add('reveal-text');
        }
        observer.observe(el);
    });

    // Initial load reveal for hero
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach(el => el.classList.add('active'));
    }, 100);

    // Contact form submission (Real Email via Web3Forms)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            btn.innerHTML = 'Sending... <i data-lucide="loader" class="icon-sm icon-spin"></i>';
            lucide.createIcons();
            
            try {
                // We use Web3Forms for static sites. 
                // You need to replace the access_key below with your own from web3forms.com
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: '4cbefb46-315f-4345-86c4-bc6dcac67689',
                        name: name,
                        email: email,
                        message: message,
                        subject: `New Portfolio Message from ${name}`
                    })
                });

                if (response.status === 200) {
                    btn.innerHTML = 'Message Sent! <i data-lucide="check" class="icon-sm"></i>';
                    btn.style.backgroundColor = '#10B981'; // Success green
                    form.reset();
                } else {
                    btn.innerHTML = 'Error! Try Again';
                    btn.style.backgroundColor = '#EF4444'; // Error red
                }
            } catch (error) {
                btn.innerHTML = 'Error! Try Again';
                btn.style.backgroundColor = '#EF4444';
            }
            
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                lucide.createIcons();
            }, 4000);
        });
    }

    // 5. Dynamic Typing Effect
    const words = ["elegant mobile apps", "scalable web platforms", "premium UI/UX", "dynamic solutions"];
    let i = 0;
    const typingText = document.querySelector('.typing-text');
    
    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                typingText.innerHTML += word.shift();
                timer = setTimeout(loopTyping, 80);
            } else {
                setTimeout(deletingEffect, 2500); 
            }
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                typingText.innerHTML = word.join("");
                timer = setTimeout(loopDeleting, 40);
            } else {
                i = (i + 1) % words.length;
                setTimeout(typingEffect, 500);
            }
        };
        loopDeleting();
    }
    setTimeout(typingEffect, 1500);

    // 6. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if(scrollProgress) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        }
    });

    // 7. Project Modal Logic
    const projectData = {
        hrms: {
            title: "Hybrid HRMS Application",
            tech: "<li>Flutter</li><li>Django REST</li><li>Firebase</li>",
            image: "assets/hrms_mockup.png",
            desc: "A comprehensive Human Resource Management System built for modern enterprises. It bridges the gap between HR administrators and employees through a unified platform. The web dashboard provides high-level analytics, while the mobile app allows employees to manage their work-life on the go.",
            features: "<li>Real-time attendance tracking with geolocation.</li><li>Automated leave request workflows.</li><li>Holiday calendar integration.</li><li>Push notifications for important announcements.</li>"
        },
        billing: {
            title: "Smart Billing Application",
            tech: "<li>Flutter</li><li>Dart</li><li>SQLite</li>",
            image: "assets/billing_mockup.png",
            desc: "A mobile-first billing and invoicing solution designed to simplify day-to-day operations for small to medium businesses. It completely automates the sales tracking and invoice generation process.",
            features: "<li>Generate professional PDF invoices instantly.</li><li>Offline-first architecture with SQLite.</li><li>Detailed sales charts and analytics.</li><li>Customer database management.</li>"
        },
        crm: {
            title: "CRM Application",
            tech: "<li>Flutter</li><li>Web Dashboard</li><li>Analytics</li>",
            image: "assets/crm_mockup.png",
            desc: "A powerful Customer Relationship Management platform designed to streamline sales pipelines, manage client interactions, and provide actionable analytics for businesses.",
            features: "<li>Real-time customer data tracking.</li><li>Interactive sales pipeline visualization.</li><li>Comprehensive reporting and analytics dashboard.</li><li>Cross-platform support (Web & Mobile).</li>"
        },
        arvina: {
            title: "Arvina Hotel Stay",
            tech: "<li>Flutter</li><li>Booking Engine</li><li>Payment API</li>",
            image: "assets/arvina_mockup.png",
            desc: "A premium mobile application for hotel bookings, allowing users to browse luxury rooms, check real-time availability, and securely manage their reservations.",
            features: "<li>Seamless real-time room availability checking.</li><li>Secure payment gateway integration.</li><li>User-friendly booking management interface.</li><li>Rich media galleries for hotel properties.</li>"
        }
    };

    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Prevent opening if they clicked the Github/External links
            if (e.target.closest('a')) return;
            
            const projectId = trigger.getAttribute('data-project');
            const data = projectData[projectId];
            
            if(data) {
                document.getElementById('modal-title').innerHTML = data.title;
                document.getElementById('modal-tech').innerHTML = data.tech;
                document.getElementById('modal-image').src = data.image;
                document.getElementById('modal-desc').innerHTML = data.desc;
                document.getElementById('modal-features').innerHTML = data.features;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // prevent bg scroll
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close on clicking outside
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 7. Mobile Hamburger Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const allNavLinks = document.querySelectorAll('.nav-link, .nav-links .btn');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
                document.body.style.overflow = 'hidden'; // Stop scrolling behind menu
            } else {
                icon.setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto';
            }
            lucide.createIcons();
        });

        // Close menu when a link is clicked
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileMenuBtn.querySelector('i').setAttribute('data-lucide', 'menu');
                document.body.style.overflow = 'auto';
                lucide.createIcons();
            });
        });
    }
});
