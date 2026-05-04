import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Camera, Globe, Mail, Phone, MapPin, Send } from 'lucide-react';

const Reveal = ({ children, delay = 0, className = '', direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (direction === 'up') return isVisible ? 'translateY(0)' : 'translateY(48px)';
    if (direction === 'left') return isVisible ? 'translateX(0)' : 'translateX(-48px)';
    if (direction === 'right') return isVisible ? 'translateX(0)' : 'translateX(48px)';
    return 'none';
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] cubic-bezier(0.22, 1, 0.36, 1) ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const FoliageOverlay = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-[#e08b73]/5 blur-[100px] animate-blob" />
    <div className="absolute bottom-[20%] right-[-5%] w-[30rem] h-[30rem] bg-[#e4e9e0]/10 blur-[120px] animate-blob animation-delay-2000" />
    {[...Array(6)].map((_, i) => (
      <svg
        key={i}
        className="absolute opacity-[0.06] animate-leaf-float"
        style={{
          top: `${15 + i * 15}%`,
          left: i % 2 === 0 ? `${5 + i}%` : 'auto',
          right: i % 2 !== 0 ? `${5 + i}%` : 'auto',
          width: '40px',
          animationDelay: `${i * 1.5}s`,
          transform: `rotate(${i * 45}deg)`,
        }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#c5a391"
        strokeWidth="1"
      >
        <path d="M12 2C12 2 12 10 2 12C12 14 12 22 12 22C12 22 12 14 22 12C12 10 12 2 12 2Z" />
      </svg>
    ))}
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Portfolio', 'About', 'Services', 'Kind Words', 'Contact'];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out px-6 md:px-16 ${
          isScrolled
            ? 'bg-[#fdfbf9] py-4 border-b border-[#e08b73]/10 shadow-sm'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif text-2xl tracking-widest italic transition-colors duration-500 hidden md:block text-[#1a1615]">
            LOVE AND LIGHT
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className={`text-[10px] uppercase tracking-[4px] transition-colors duration-300 font-light ${
                  isScrolled ? 'text-[#3d3533] hover:text-[#c5a391]' : 'text-[#1a1615]/80 hover:text-[#3d3533]'
                }`}
              >
                {link}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-[#1a1615] transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[200] bg-[#ffffff] flex flex-col items-center justify-center transition-all duration-700 ease-cinematic ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        }`}
      >
        <button className="absolute top-8 right-6 text-[#1a1615]" onClick={() => setMobileMenuOpen(false)}>
          <X size={32} strokeWidth={1} />
        </button>
        <div className="space-y-8 text-center">
          {navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="block font-serif text-4xl italic text-[#1a1615] transform transition-all duration-500 hover:text-[#c5a391]"
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#ffffff] py-20 md:py-0">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--bg-texture)_0%,var(--bg-pure)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255, 255, 255, 0.6)_0%,rgba(255, 255, 255, 0.2)_100%)]" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[radial-gradient(circle,var(--accent-luxe)_0%,transparent_70%)] blur-[100px] opacity-[0.4] animate-hero-mist" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[60%] h-[60%] bg-[radial-gradient(circle,var(--accent-silk)_0%,transparent_70%)] blur-[100px] opacity-[0.8] animate-hero-mist-reverse" />
      <div className="absolute top-[10%] right-[10%] orb orb-1" />
      <div className="absolute bottom-[15%] left-[5%] orb orb-2" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-12 items-center">
      {/* Text Content */}
      <div className="md:col-span-7 text-center md:text-left order-1 md:order-1">
        <Reveal delay={200}>
          <span className="text-[11px] uppercase tracking-[6px] text-[#8c827f] mb-6 block font-light">
            Hyderabad, India & Beyond
          </span>
        </Reveal>
        <Reveal delay={400}>
          <h1 className="font-serif text-5xl md:text-8xl italic text-[#1a1615] leading-[1.1] mb-8">
            Capturing the <br />
            <span className="text-[#e08b73] not-italic font-normal">Soul of Your</span> <br />
            Legacy
          </h1>
        </Reveal>
        <Reveal delay={600}>
          <p className="text-[#3d3533] max-w-md font-light text-sm md:text-base leading-relaxed tracking-wider mb-10 mx-auto md:mx-0">
            Luxury wedding & portrait photography crafted with light, emotion, and an editorial lens. We tell stories that outlast memory.
          </p>
        </Reveal>
        <Reveal delay={800}>
          <button className="group relative px-10 py-4 border border-[#1a1615]/10 text-[#1a1615] text-[11px] uppercase tracking-[4px] hover:bg-[#c5a391]/10 hover:border-[#c5a391] transition-all duration-500">
            Explore Our Films
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a391] group-hover:w-full transition-all duration-700" />
          </button>
        </Reveal>
      </div>

      {/* Image Content - Now visible on mobile (removed 'hidden') */}
      <div className="flex md:col-span-5 justify-center relative group order-2 md:order-2">
        <Reveal delay={600} direction="up"> {/* Changed direction to 'up' for better mobile flow */}
          <div className="relative group p-3 md:p-4 border border-[#1a1615]/5 rounded-[40px] md:rounded-[60px] shadow-sm hover:shadow-xl transition-all duration-1000">
            <div className="relative w-[280px] h-[350px] md:w-80 md:h-[400px] lg:w-[350px] lg:h-[450px] bg-[#fdfbf9] rounded-[32px] md:rounded-[48px] overflow-hidden z-10">
              <div 
                className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center transition-transform duration-[4000ms] group-hover:scale-110" 
              />
            </div>
            
            {/* Floating "Say Yes" badge - adjusted size for mobile */}
            <div className="absolute -bottom-4 -left-4 bg-[#ffffff] p-4 md:p-6 rounded-full shadow-2xl animate-float pointer-events-none z-20">
              <div className="flex flex-col items-center">
                <span className="text-[8px] md:text-[10px] uppercase tracking-[3px] text-[#c5a391] font-medium">Say</span>
                <span className="font-serif text-xl md:text-2xl italic text-[#1a1615]">Yes</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-40">
      <span className="text-[9px] uppercase tracking-[4px] text-[#1a1615]/50">Scroll</span>
      <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#c5a391] to-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#1a1615] animate-scroll-line" />
      </div>
    </div>
  </section>
);

const Manifesto = () => (
  <section className="relative py-32 md:py-48 bg-[#fdfbf9] overflow-hidden">
    <FoliageOverlay />
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <Reveal>
        <div className="w-[1px] h-20 bg-[#e08b73]/40 mx-auto mb-16" />
      </Reveal>
      <Reveal delay={200}>
        <h2 className="font-serif text-3xl md:text-5xl italic text-[#5d4a44] leading-[1.5] mb-12">
          "We believe that every love story is a <span className="text-[#e08b73]">masterpiece</span> written in light, waiting to be preserved for the generations that follow."
        </h2>
      </Reveal>
      <Reveal delay={400}>
        <p className="text-[#8d7b74] text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
          Our approach is deeply personal. We don't just take photographs; we capture the breath, the touch, and the unspoken promises that define your connection. Timeless, romantic, and purely you.
        </p>
      </Reveal>
    </div>
  </section>
);

const PortfolioMasonry = () => {
  const images = [
    { title: 'Eternal Grace', meta: 'Hyderabad, 2023', span: 'row-span-2' },
    { title: 'Whispered Vows', meta: 'Udaipur, 2024', span: 'row-span-1' },
    { title: 'Gilded Hour', meta: 'Dubai, 2023', span: 'row-span-1' },
    { title: 'The Embrace', meta: 'Coorg, 2024', span: 'row-span-2' },
    { title: 'Velvet Nights', meta: 'London, 2023', span: 'row-span-1' },
    { title: 'Morning Dew', meta: 'Kerala, 2024', span: 'row-span-1' },
  ];

  return (
    <section id="portfolio" className="py-24 bg-[#fdfbf9] px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 space-y-6 md:space-y-0">
          <Reveal direction="left">
            <div>
              <span className="text-[10px] uppercase tracking-[6px] text-[#e08b73] mb-3 block">Selected Works</span>
              <h2 className="font-serif text-4xl md:text-5xl italic text-[#5d4a44]">Visual Proof</h2>
            </div>
          </Reveal>
          <Reveal direction="right">
            <a href="#" className="text-[10px] uppercase tracking-[4px] text-[#8d7b74] border-b border-[#e08b73]/30 pb-2 hover:text-[#e08b73] transition-colors">
              View Full Gallery
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <Reveal key={i} delay={i * 150} className={`${img.span} relative group overflow-hidden rounded-[4px] cursor-pointer aspect-[3/4]`}>
              <div className="w-full h-full bg-[#eee7e3] transition-transform duration-1000 group-hover:scale-105 overflow-hidden" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="font-serif text-2xl italic text-white mb-2">{img.title}</h3>
                <span className="text-[9px] uppercase tracking-[4px] text-white/70">{img.meta}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryReel = () => (
  <section className="bg-[#1e1712] py-4 overflow-hidden relative z-10">
    <div className="flex animate-scroll-horizontal space-x-12 whitespace-nowrap py-12">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 opacity-30 hover:opacity-100 transition-opacity duration-500 cursor-default px-8 border-r border-white/5">
          <span className="font-serif text-2xl italic text-white">Love & Light</span>
          <span className="text-[10px] uppercase tracking-[5px] text-[#e08b73]">Legacy Co.</span>
        </div>
      ))}
    </div>
  </section>
);

const About = () => (
  <section id="about" className="relative py-32 md:py-48 bg-[#f9f5f0] overflow-hidden">
    <FoliageOverlay />
    <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
      <Reveal direction="left">
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-1/2 h-1/3 bg-gradient-to-br from-[#e08b73] to-[#e8d5c8] opacity-20 rounded-[2px]" />
          <div className="relative aspect-[4/5] bg-[#eee7e3] rounded-[4px] shadow-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-[#5d4a44]/10 font-serif italic text-3xl">Founder Story</div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-2/3 h-2/3 border border-[#e08b73]/20 rounded-[2px] -z-10" />
        </div>
      </Reveal>
      <Reveal delay={300} direction="right">
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-[#e08b73]" />
            <span className="text-[10px] uppercase tracking-[6px] text-[#e08b73]">Behind the Lens</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#5d4a44] leading-tight">
            A heart dedicated to <br /> capturing the <span className="text-[#e08b73]">unseen.</span>
          </h2>
          <div className="space-y-6 text-[#8d7b74] font-light leading-relaxed tracking-wide text-base">
            <p>
              My journey began with a simple realization: life happens in the quiet moments between the big events. The way a father catches his breath when he sees his daughter in her gown. The trembling hands during a first look.
            </p>
            <p>
              As the lead photographer at Love and Light, my mission is to capture these fleeting whispers. My style is editorial and cinematic, inspired by the timeless elegance of vintage film and the warmth of golden hour light.
            </p>
            <p>
              I don't just deliver images; I deliver feelings. I invite you to see your story through my lens.
            </p>
          </div>
          <div className="pt-8">
            <span className="font-serif text-4xl italic text-[#e08b73] opacity-60">S. Vardhan</span>
            <p className="text-[10px] uppercase tracking-[4px] text-[#8d7b74] mt-2">Principal Photographer</p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const Services = () => {
  const serviceList = [
    { num: '01', title: 'Couture Weddings', desc: 'Full-day coverage that captures the grandeur and the intimacy of your union. Includes luxury heirloom albums and a curated digital collection.' },
    { num: '02', title: 'Editorial Portraits', desc: 'Fine art sessions designed to celebrate your individuality. Perfect for branding, fashion, or personal legacy storytelling.' },
    { num: '03', title: 'Legacy Films', desc: 'Cinematic short films that breathe life into your story. Movement, sound, and light woven into a breathtaking narrative.' },
  ];

  return (
    <section id="services" className="py-32 bg-[#fdfbf9] px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[6px] text-[#e08b73] mb-4 block">Experiences</span>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#5d4a44] mb-6">Our Intent</h2>
            <p className="text-[#8d7b74] font-light tracking-wide leading-relaxed">
              We offer bespoke photography experiences tailored to the unique narrative of each client. Quality, not quantity, is our guiding principle.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[#e08b73]/10">
          {serviceList.map((service, i) => (
            <Reveal key={i} delay={i * 200} className="bg-[#fdfbf9] p-12 relative group hover:z-10 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-4px]">
              <span className="absolute top-8 right-8 font-serif text-7xl text-[#e08b73]/10 font-light group-hover:text-[#e08b73]/20 transition-colors">{service.num}</span>
              <div className="w-10 h-[1px] bg-[#e08b73] mb-10" />
              <h3 className="font-serif text-3xl italic text-[#5d4a44] mb-6 transition-colors group-hover:text-[#e08b73]">{service.title}</h3>
              <p className="text-[#8d7b74] font-light text-sm leading-loose tracking-wide mb-12">{service.desc}</p>
              <a href="#contact" className="inline-flex items-center text-[10px] uppercase tracking-[4px] text-[#e08b73] group/link">
                Inquire Now
                <span className="ml-3 w-6 h-[1px] bg-[#e08b73] transition-all duration-500 group-hover/link:w-12" />
              </a>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#e08b73] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  // Using your new requested data and variable names
  const testimonials = [
    { name: "Ananya & Arjun", location: "Hyderabad", text: "They captured the soul of our wedding. Every frame feels like a soft, warm memory come to life." },
    { name: "Meera R.", location: "Dubai", text: "Incredible attention to light. The most professional and poetic team we've ever worked with." },
    { name: "Siddharth K.", location: "London", text: "A truly luxury experience. The final gallery was a cinematic masterpiece that we'll treasure forever." },
    { name: "Priya V.", location: "Mumbai", text: "Soft, romantic, and exactly what I dreamed of. They made the entire day feel effortless." },
  ];

  const COLORS = {
    luxeObsidian: '#1a1615',
  };

  return (
    <section id="kind-words" className="py-40 bg-[#fdfbf9] overflow-hidden border-y border-[#1a1615]/5 relative">
      <div className="max-w-[1400px] mx-auto px-12 mb-20 text-center">
        <Reveal>
          <span className="text-[10px] uppercase tracking-[6px] font-bold text-[#c5a391]">Validation</span>
          <h2 className="text-5xl italic font-serif mt-4" style={{ color: COLORS.luxeObsidian }}>Client Legacies</h2>
        </Reveal>
      </div>

      <div className="flex overflow-hidden group">
        {/* We use the animate-scroll-horizontal class which is already in your CSS below */}
        <div className="flex gap-10 animate-scroll-horizontal py-10 hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[450px] p-14 bg-white rounded-[40px] border border-[#1a1615]/5 shadow-sm hover:shadow-[0_40px_80px_rgba(26,22,21,0.08)] hover:-translate-y-4 transition-all duration-700">
               {/* Using the Camera icon as a decorative quote mark since it's already in your imports */}
               <Camera className="w-10 h-10 text-[#c5a391] opacity-20 mb-6" />
               <p className="text-xl italic font-serif leading-relaxed mb-10 text-gray-700">"{t.text}"</p>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-[1px] bg-[#c5a391]" />
                  <div>
                    <p className="text-[10px] uppercase tracking-[3px] font-bold" style={{ color: COLORS.luxeObsidian }}>{t.name}</p>
                    <p className="text-[9px] uppercase tracking-[2px] opacity-40">{t.location}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="relative py-32 md:py-48 bg-[#fdfbf9] overflow-hidden">
    <FoliageOverlay />
    <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-24 items-start relative z-10">
      <Reveal direction="left">
        <div className="space-y-12">
          <div>
            <span className="text-[10px] uppercase tracking-[6px] text-[#e08b73] mb-4 block">Connect</span>
            <h2 className="font-serif text-5xl md:text-7xl italic text-[#5d4a44] leading-tight">
              Let's co-create <br /> your <span className="text-[#e08b73]">legacy.</span>
            </h2>
          </div>
          <p className="text-[#8d7b74] font-light leading-relaxed tracking-wide text-lg max-w-md">
            We take on a limited number of commissions each year to ensure every story receives our undivided heart.
          </p>
          <div className="space-y-6">
            {[
              { icon: Mail, text: 'hello@loveandlight.co', link: 'mailto:hello@loveandlight.co' },
              { icon: Phone, text: '+91 98765 43210', link: 'tel:+919876543210' },
              { icon: MapPin, text: 'Banjara Hills, Hyderabad', link: '#' },
            ].map((item, i) => (
              <div key={i} className="flex items-center group cursor-pointer">
                <div className="w-10 h-[1px] bg-[#e08b73]/40 group-hover:w-16 transition-all duration-500" />
                <item.icon size={16} className="mx-4 text-[#e08b73]/60" strokeWidth={1.5} />
                <a href={item.link} className="text-sm font-light text-[#5d4a44] tracking-wider hover:text-[#e08b73] transition-colors">{item.text}</a>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={300} direction="right">
        <div className="bg-white p-10 md:p-14 shadow-2xl rounded-[4px] border border-[#e08b73]/5">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 relative">
                <label className="text-[9px] uppercase tracking-[4px] text-[#e08b73]">Full Name</label>
                <input type="text" className="w-full bg-transparent border-b border-[#5d4a44]/10 py-3 outline-none focus:border-[#e08b73] transition-colors font-light text-sm" placeholder="John & Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-[4px] text-[#e08b73]">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-[#5d4a44]/10 py-3 outline-none focus:border-[#e08b73] transition-colors font-light text-sm" placeholder="hello@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[4px] text-[#e08b73]">Experience Interest</label>
              <select className="w-full bg-transparent border-b border-[#5d4a44]/10 py-3 outline-none focus:border-[#e08b73] transition-colors font-light text-sm appearance-none">
                <option>Couture Wedding</option>
                <option>Editorial Portraits</option>
                <option>Legacy Film</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[4px] text-[#e08b73]">Tell Us Your Story</label>
              <textarea rows="4" className="w-full bg-transparent border-b border-[#5d4a44]/10 py-3 outline-none focus:border-[#e08b73] transition-colors font-light text-sm resize-none" placeholder="We're dreaming of..." />
            </div>
            <button className="w-full bg-[#5d4a44] text-[#fdfbf9] py-5 uppercase tracking-[5px] text-[11px] font-medium hover:bg-[#e08b73] transition-all duration-500 flex items-center justify-center space-x-3 group">
              <span>Inquire Now</span>
              <Send size={14} className="transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#f9f5f0] border-top border-[#e08b73]/10 py-12 md:py-20 px-6 md:px-16">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
      <div className="font-serif text-xl italic text-[#5d4a44] tracking-widest">LOVE AND LIGHT</div>
      <div className="flex items-center space-x-8">
        {[Camera, Globe, Mail].map((Icon, i) => (
          <a key={i} href="#" className="text-[#8d7b74] hover:text-[#e08b73] transition-colors">
            <Icon size={20} strokeWidth={1.2} />
          </a>
        ))}
      </div>
      <div className="text-[10px] uppercase tracking-[3px] text-[#8d7b74] font-light">&copy; 2024 Love and Light Co Production. All rights reserved.</div>
    </div>
  </footer>
);

const App = () => (
  <div className="bg-[#fdfbf9] font-sans selection:bg-[#e08b73]/20 selection:text-[#5d4a44]">
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap');

      :root {
        --bg-pure: #ffffff;
        --bg-texture: #f5f0f0;
        --text-main: #1a1615;
        --text-body: #3d3533;
        --text-muted: #8c827f;
        --accent-luxe: #e9dfea;
        --accent-silk: #f8eef5;
        --border-silk: rgba(26, 22, 21, 0.08);
        --shadow-premium: rgba(26, 22, 21, 0.12);
        --interaction-glow: rgba(26, 22, 21, 0.40);
        --mist-opacity: 0.4;
        --blur-strength: 100px;
        --float-speed: 25s;
        --z-background: -10;
      }

      .ease-cinematic {
        transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
      }

      .animate-blob {
        animation: blob-drift 20s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes blob-drift {
        0% { transform: translate(0, 0) scale(1) rotate(0deg); }
        100% { transform: translate(40px, -30px) scale(1.1) rotate(15deg); }
      }

      .animate-hero-mist {
        animation: float-around var(--float-speed) infinite alternate ease-in-out;
      }

      .animate-hero-mist-reverse {
        animation: float-around calc(var(--float-speed) * 1.2) infinite alternate-reverse ease-in-out;
      }

      .orb {
        position: absolute;
        border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(244,237,237,0.2) 100%);
        border: 1px solid var(--border-silk);
        box-shadow: 0 10px 30px var(--shadow-premium);
      }

      .orb-1 { width: 300px; height: 250px; animation: organic-drift 30s infinite ease-in-out; }
      .orb-2 { width: 180px; height: 200px; opacity: 0.5; animation: organic-drift 22s infinite ease-in-out reverse; }

      @keyframes float-around {
        0% { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-2%, 5%) scale(0.95); }
      }

      @keyframes organic-drift {
        0% { transform: translate(0, 0) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        50% { transform: translate(20px, -40px) rotate(5deg); border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
        100% { transform: translate(0, 0) rotate(0deg); border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      }

      .animate-leaf-float {
        animation: leaf-float 12s infinite alternate ease-in-out;
      }

      @keyframes leaf-float {
        0% { transform: translateY(0) rotate(0deg); opacity: 0.05; }
        100% { transform: translateY(-20px) rotate(10deg); opacity: 0.03; }
      }

      .animate-scroll-line {
        animation: scroll-line 2.4s infinite cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes scroll-line {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }

      .animate-scroll-horizontal {
        animation: scroll-horizontal 40s linear infinite;
      }

      @keyframes scroll-horizontal {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-float {
        animation: float 6s infinite ease-in-out;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }

      .animation-delay-2000 { animation-delay: 2s; }
      .animation-delay-4000 { animation-delay: 4s; }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #fdfbf9;
      }
      ::-webkit-scrollbar-thumb {
        background: #e08b73;
        border-radius: 10px;
      }
    `}</style>

    <Navbar />
    <Hero />
    <Manifesto />
    <PortfolioMasonry />
    <StoryReel />
    <About />
    <Services />
    <Testimonials />
    <Contact />
    <Footer />
  </div>
);

export default App;
