'use client';
import React, { useEffect, useRef, useState } from 'react';
import { 
  Menu, X, MapPin, Zap, Smartphone, CreditCard, Users, Hotel, 
  Briefcase, GraduationCap, ArrowDownRight, Download, Send, 
  Code, Link, Loader2, Check 
} from 'lucide-react';
import { SplineScene } from './ui/splite';
import { Spotlight } from './ui/spotlight';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [typingText, setTypingText] = useState('');
  
  // Custom Cursor
  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    const follower = document.querySelector('.custom-cursor-follower') as HTMLElement;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      reqId = requestAnimationFrame(animateFollower);
    };

    document.addEventListener('mousemove', onMouseMove);
    animateFollower();

    // Hover states
    const addHover = () => document.body.classList.add('hover-state');
    const removeHover = () => document.body.classList.remove('hover-state');
    const magnetics = document.querySelectorAll('.magnetic, a, button, .pill');
    magnetics.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(reqId);
      magnetics.forEach(el => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  // Scroll Progress
  useEffect(() => {
    const scrollProgress = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-text, .tilt-card').forEach((el) => {
      if (!el.classList.contains('reveal-text')) el.classList.add('reveal-text');
      observer.observe(el);
    });

    setTimeout(() => {
      document.querySelectorAll('.hero .reveal-text').forEach(el => el.classList.add('active'));
    }, 100);

    return () => observer.disconnect();
  }, []);

  // Tilt Effect
  useEffect(() => {
    const tiltCards = document.querySelectorAll('.tilt-card');
    const handlers = new Map();

    tiltCards.forEach((card: any) => {
      const onMove = (e: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      };
      
      const onLeave = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      };

      const onEnter = () => {
        card.style.transition = 'none';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      card.addEventListener('mouseenter', onEnter);
      
      handlers.set(card, { onMove, onLeave, onEnter });
    });

    return () => {
      tiltCards.forEach((card: any) => {
        const h = handlers.get(card);
        if (h) {
          card.removeEventListener('mousemove', h.onMove);
          card.removeEventListener('mouseleave', h.onLeave);
          card.removeEventListener('mouseenter', h.onEnter);
        }
      });
    };
  }, []);

  // Background Particle Engine
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particlesArray: any[] = [];
    const numberOfParticles = window.innerWidth < 768 ? 40 : 100;
    
    let mouse = { x: -1000, y: -1000, radius: 150 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseOut = () => { mouse.x = -1000; mouse.y = -1000; };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseOut);

    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number; color: string;
      baseX: number; baseY: number; density: number;
      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
        this.size = size; this.color = color; this.baseX = x; this.baseY = y;
        this.density = (Math.random() * 30) + 1;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = this.color;
        ctx!.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/15;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/15;
          }
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.8) - 0.4;
        let directionY = (Math.random() * 0.8) - 0.4;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, '#06B6D4'));
      }
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                         ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          let connectDistance = window.innerWidth < 768 ? (canvas.width/3) * (canvas.height/3) : (canvas.width/10) * (canvas.height/10);
          if (distance < connectDistance) {
            opacityValue = 1 - (distance/20000);
            ctx!.strokeStyle = 'rgba(6, 182, 212,' + (opacityValue * 0.5) + ')';
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx!.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx!.stroke();
          }
        }
      }
    }

    let reqId: number;
    function animate() {
      reqId = requestAnimationFrame(animate);
      ctx!.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', onResize);

    init();
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  const projectData: Record<string, any> = {
    hrms: {
      title: "Hybrid HRMS Application",
      tech: ["Flutter", "Django REST", "Firebase"],
      image: "/assets/hrms_mockup.png",
      desc: "A comprehensive Human Resource Management System built for modern enterprises. It bridges the gap between HR administrators and employees through a unified platform.",
      features: ["Real-time attendance tracking", "Automated leave request workflows", "Holiday calendar integration"]
    },
    billing: {
      title: "Smart Billing Application",
      tech: ["Flutter", "Dart", "SQLite"],
      image: "/assets/billing_mockup.png",
      desc: "A mobile-first billing and invoicing solution designed to simplify day-to-day operations for businesses.",
      features: ["Generate professional PDF invoices", "Offline-first architecture", "Detailed sales charts"]
    },
    crm: {
      title: "CRM Application",
      tech: ["Flutter", "Web Dashboard", "Analytics"],
      image: "/assets/crm_mockup.png",
      desc: "A powerful Customer Relationship Management platform designed to streamline sales pipelines.",
      features: ["Real-time customer tracking", "Pipeline visualization", "Comprehensive reporting"]
    },
    arvina: {
      title: "Arvina Hotel Stay",
      tech: ["Flutter", "Booking Engine", "Payment API"],
      image: "/assets/arvina_mockup.png",
      desc: "A premium mobile application for hotel bookings, allowing users to browse luxury rooms securely.",
      features: ["Real-time room availability", "Secure payment gateway", "User-friendly interface"]
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: '4cbefb46-315f-4345-86c4-bc6dcac67689',
          name, email, message, subject: `New Portfolio Message from ${name}`
        })
      });

      if (response.status === 200) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  return (
    <>
      <div className="scroll-progress" id="scroll-progress"></div>
      <div className="bg-glow"></div>
      <canvas id="bg-canvas"></canvas>
      
      <div className="custom-cursor"></div>
      <div className="custom-cursor-follower"></div>

      <nav className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">Shabeer<span className="dot">.</span></a>
          <button className="hamburger magnetic" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
            <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a>
            <a href="#achievements" className="nav-link" onClick={() => setIsMenuOpen(false)}>Awards</a>
            <a href="#contact" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Let's Talk</a>
          </div>
        </div>
      </nav>

      <main>
        <header className="hero" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div className="hero-content" style={{ flex: 1, zIndex: 10 }}>
            <p className="greeting reveal-text">Crafting digital experiences.</p>
            <h1 className="name gradient-text reveal-text delay-1">Shabeer.</h1>
            <h2 className="role reveal-text delay-2">I build <span className="typing-text">dynamic solutions</span><span className="cursor"></span></h2>
            
            <div className="hero-cta reveal-text delay-3">
              <a href="#projects" className="btn btn-primary btn-lg magnetic">Explore Work <ArrowDownRight className="inline" /></a>
              <a href="/assets/resume.pdf" download className="btn btn-ghost magnetic">Download Resume <Download className="inline" size={18} /></a>
            </div>
          </div>
          
          {/* Spline 3D Robot on the right side */}
          <div className="block spline-wrapper" style={{ flex: 1, position: 'relative', height: '600px', zIndex: 5 }}>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </header>

        <section id="about" className="section">
          <h2 className="section-title reveal-text">The Engine Room.</h2>
          <div className="bento-grid">
            <div className="bento-card tilt-card profile-bento">
              {/* Note: In a real Next app you'd move assets to /public */}
              <img src="/assets/profile.png" alt="Shabeer" className="bento-img" />
            </div>
            <div className="bento-card bio-bento tilt-card">
              <h3>Building Digital Experiences</h3>
              <p className="text-secondary">I am a passionate Flutter App Developer. Currently working at <span className="highlight-text">Hybrid AI Solutions</span> for the past 6 months. I hold a BSc and MSc in Computer Science from Thiruthangal Nadar College.</p>
            </div>
            <div className="bento-card tilt-card small-bento center-content">
              <MapPin className="bento-icon" />
              <h4>Based in</h4>
              <p>India</p>
            </div>
            <div className="bento-card tilt-card small-bento center-content glow-accent">
              <Zap className="bento-icon float-anim" />
              <h4>Currently</h4>
              <p>Open for roles</p>
            </div>
            <div className="bento-card tilt-card skills-bento">
              <h3>Tech Stack</h3>
              <div className="skills-pills">
                {['Flutter', 'Dart', 'Python', 'Django REST', 'Firebase', 'React/Next.js', 'SQLite', 'Git'].map(s => (
                  <span key={s} className="pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>



        <section id="projects" className="section">
          <h2 className="section-title reveal-text">Selected Works.</h2>
          <div className="projects-grid">
            {[
              { id: 'hrms', title: 'Hybrid HRMS Application', icon: Smartphone, desc: 'A comprehensive Human Resource Management System with a web dashboard for HR and a mobile app for employees.', tech: ['Flutter', 'Django', 'Firebase'] },
              { id: 'billing', title: 'Smart Billing Application', icon: CreditCard, desc: 'A mobile-based billing and invoicing solution for businesses to manage sales, track transactions.', tech: ['Flutter', 'Dart', 'SQLite'] },
              { id: 'crm', title: 'CRM Application', icon: Users, desc: 'A comprehensive Customer Relationship Management platform for managing sales pipelines and client data.', tech: ['Flutter', 'Dashboard', 'Analytics'] },
              { id: 'arvina', title: 'Arvina Hotel Stay', icon: Hotel, desc: 'A real-time hotel booking application offering seamless reservations, room browsing, and payment.', tech: ['Flutter', 'Booking', 'Payments'] }
            ].map(proj => (
              <div key={proj.id} className="project-card tilt-card modal-trigger magnetic" onClick={() => { setModalData(projectData[proj.id]); document.body.style.overflow = 'hidden'; }}>
                <div className="project-content">
                  <div className="project-header">
                    <proj.icon className="folder-icon float-anim" />
                    <div className="project-links">
                      <a href="#" className="magnetic" onClick={e => e.stopPropagation()}><Code /></a>
                    </div>
                  </div>
                  <h3 className="project-title">{proj.title}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <ul className="project-tech">
                    {proj.tech.map(t => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="achievements" className="section">
          <h2 className="section-title gradient-text">Awards & Achievements</h2>
          <div className="achievements-bento">
            <div className="bento-card tilt-card achievement-card">
              <div className="icon-wrapper float-anim"><Briefcase /></div>
              <h3>Hybrid AI Solutions</h3>
              <p className="text-secondary">Flutter Developer (6 Months)</p>
            </div>
            <div className="bento-card tilt-card achievement-card">
              <div className="icon-wrapper float-anim" style={{ animationDelay: '0.5s' }}><GraduationCap /></div>
              <h3>MSc Computer Science</h3>
              <p className="text-secondary">Thiruthangal Nadar College</p>
            </div>
            <div className="bento-card tilt-card achievement-card">
              <div className="icon-wrapper float-anim" style={{ animationDelay: '1s' }}><GraduationCap /></div>
              <h3>BSc Computer Science</h3>
              <p className="text-secondary">Madras University</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="bento-card tilt-card contact-bento">
            <h2 className="section-title">Let's build together.</h2>
            <p className="contact-desc">Ready to bring your next big idea to life? Drop me a message and let's create something extraordinary.</p>
            
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group row">
                <input type="text" name="name" placeholder="Name" required className="glass-input" />
                <input type="email" name="email" placeholder="Email" required className="glass-input" />
              </div>
              <div className="form-group">
                <textarea rows={4} name="message" placeholder="Your Message" required className="glass-input"></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary btn-block magnetic"
                style={formStatus === 'success' ? { backgroundColor: '#10B981' } : formStatus === 'error' ? { backgroundColor: '#EF4444' } : {}}
              >
                {formStatus === 'idle' && <>Send Message <Send className="inline" size={18} /></>}
                {formStatus === 'loading' && <>Sending... <Loader2 className="inline animate-spin" size={18} /></>}
                {formStatus === 'success' && <>Message Sent! <Check className="inline" size={18} /></>}
                {formStatus === 'error' && <>Error! Try Again</>}
              </button>
            </form>
          </div>
        </section>

        <footer>
          <div className="social-links">
            <a href="#" className="magnetic"><Link /></a>
            <a href="#" className="magnetic"><Code /></a>
          </div>
          <p>© 2026 Shabeer. Designed with precision (Now in React).</p>
        </footer>

        {modalData && (
          <div id="project-modal" className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) { setModalData(null); document.body.style.overflow = 'auto'; } }}>
            <div className="modal-content tilt-card">
              <button className="modal-close magnetic" onClick={() => { setModalData(null); document.body.style.overflow = 'auto'; }}><X /></button>
              <div className="modal-scroll-area">
                <div className="modal-header">
                  <h2 id="modal-title" className="gradient-text">{modalData.title}</h2>
                  <ul id="modal-tech" className="project-tech">
                    {modalData.tech.map((t: string) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
                <div className="modal-gallery">
                  <img id="modal-image" src={modalData.image} alt="Mockup" className="modal-img" />
                </div>
                <div className="modal-details">
                  <h3>Overview</h3>
                  <p id="modal-desc" className="contact-desc">{modalData.desc}</p>
                  <br />
                  <h3>Key Features</h3>
                  <ul id="modal-features" className="feature-list">
                    {modalData.features.map((f: string) => <li key={f}>{f}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
