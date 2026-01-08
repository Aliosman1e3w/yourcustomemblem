import heroVideo from "@/assets/hero-video-ferrari.mp4";
import logoEmblem from "@/assets/logo-emblem.png";

const HeroCarousel = () => {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            // Smooth loop transition
            transition: "opacity 0.3s ease-in-out"
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo Emblem Image */}
          <div className="mb-8 animate-fade-up">
            <img 
              src={logoEmblem} 
              alt="Your Custom Emblem" 
              className="w-64 md:w-80 lg:w-96 h-auto mx-auto drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))"
              }}
            />
          </div>
          
          {/* Subtitle */}
          <p className="font-body text-sm md:text-base tracking-[0.4em] uppercase text-white/70 mb-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Premium Custom Emblems
          </p>
          
          {/* Main Title */}
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Crafted With
            <span className="block text-gradient-gold mt-2">Excellence & Precision</span>
          </h1>
          
          {/* Description */}
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Transform your vehicle with our handcrafted custom emblems. 
            Each piece is meticulously designed and finished to perfection.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="#work-samples"
              className="px-8 py-4 bg-gradient-to-r from-primary to-[#F4E4BC] text-black font-semibold tracking-wide uppercase text-sm rounded-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
            >
              View Our Work
            </a>
            <a
              href="#quote"
              className="px-8 py-4 border border-white/30 text-white font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-white/10 transition-all duration-300"
            >
              Get a Quote
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
