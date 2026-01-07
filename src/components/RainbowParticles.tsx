import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  type: "ambient" | "burst";
}

const RainbowParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  const createAmbientParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
      size: 1 + Math.random() * 2,
      hue: Math.random() * 360,
      type: "ambient",
    };
  }, []);

  const createBurstParticle = useCallback((x: number, y: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 6;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60 + Math.random() * 40,
      maxLife: 100,
      size: 2 + Math.random() * 4,
      hue: Math.random() * 360,
      type: "burst",
    };
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create burst of particles
    for (let i = 0; i < 30; i++) {
      particlesRef.current.push(createBurstParticle(x, y));
    }
  }, [createBurstParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("click", handleClick);

    // Initialize ambient particles
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(createAmbientParticle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life -= 0.5;

        if (particle.life <= 0) {
          if (particle.type === "ambient") {
            // Respawn ambient particles
            const newParticle = createAmbientParticle(canvas);
            particle.x = newParticle.x;
            particle.y = newParticle.y;
            particle.life = newParticle.maxLife;
            particle.hue = newParticle.hue;
            return true;
          }
          return false;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Add gravity and friction for burst particles
        if (particle.type === "burst") {
          particle.vy += 0.05;
          particle.vx *= 0.99;
          particle.vy *= 0.99;
        }

        // Wrap around for ambient particles
        if (particle.type === "ambient") {
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Slowly shift hue for rainbow effect
          particle.hue = (particle.hue + 0.5) % 360;
        }

        // Calculate opacity based on life
        const opacity = Math.min(1, particle.life / 30);
        
        // Draw particle with glow
        ctx.save();
        ctx.globalAlpha = opacity * 0.8;
        
        // Glow effect
        ctx.shadowBlur = particle.type === "burst" ? 15 : 8;
        ctx.shadowColor = `hsla(${particle.hue}, 100%, 60%, 0.8)`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 60%, ${opacity})`;
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 80%, ${opacity})`;
        ctx.fill();
        
        ctx.restore();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createAmbientParticle, handleClick]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ pointerEvents: "auto" }}
    />
  );
};

export default RainbowParticles;
