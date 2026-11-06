import { useEffect, useRef } from 'react';

export function EmberParticles({ count = 28, className = '' }: { count?: number; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', resize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      maxOpacity: number;
      hue: number;
    }

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 40,
      size: 1 + Math.random() * 2.5,
      speedY: 0.4 + Math.random() * 0.9,
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: 0.1,
      fadeSpeed: 0.003 + Math.random() * 0.006,
      maxOpacity: 0.35 + Math.random() * 0.45,
      hue: 28 + Math.random() * 18 // Warm gold to ember orange
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.3;
        p.opacity += p.fadeSpeed;

        if (p.opacity > p.maxOpacity || p.opacity < 0.05) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Reset if reached the top
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          p.x = Math.random() * width;
          p.y = height + 10;
          p.opacity = 0.1;
          p.speedY = 0.4 + Math.random() * 0.9;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${Math.max(0, p.opacity)})`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 50%, 0.8)`;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 size-full ${className}`}
    />
  );
}
