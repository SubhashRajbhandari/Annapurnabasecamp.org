import React, { useEffect, useRef } from 'react';

interface MountainCanvasProps {
  isDark?: boolean;
}

export const MountainCanvas: React.FC<MountainCanvasProps> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particles (drifting snow crystals and alpine sun-glints)
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      glow: Math.random() > 0.6
    }));

    // Mountain Ridge Profiles
    let time = 0;

    const drawRidge = (
      baseY: number,
      amplitude: number,
      wavelength: number,
      strokeColor: string,
      fillGradient: CanvasGradient,
      phaseOffset: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += 15) {
        // Multi-frequency wave for jagged Himalayan snow peaks
        const y =
          baseY +
          Math.sin((x + phaseOffset) * wavelength) * amplitude +
          Math.sin((x * 2.5 + phaseOffset * 1.5) * wavelength) * (amplitude * 0.35) +
          Math.cos((x * 0.5 + phaseOffset) * wavelength * 0.5) * (amplitude * 0.5);

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      ctx.fillStyle = fillGradient;
      ctx.fill();

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.4;
      ctx.stroke();
    };

    const render = () => {
      time += 0.0025;
      ctx.clearRect(0, 0, width, height);

      if (isDark) {
        // Night Mode Canvas
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#040711');
        skyGrad.addColorStop(0.5, '#070e22');
        skyGrad.addColorStop(1, '#050a16');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // Distant Ridge
        const grad1 = ctx.createLinearGradient(0, height * 0.4, 0, height);
        grad1.addColorStop(0, 'rgba(12, 28, 56, 0.4)');
        grad1.addColorStop(1, 'rgba(4, 7, 17, 0.8)');
        drawRidge(height * 0.55, 70, 0.002, 'rgba(0, 240, 255, 0.18)', grad1, time * 20);

        // Mid Ridge
        const grad2 = ctx.createLinearGradient(0, height * 0.6, 0, height);
        grad2.addColorStop(0, 'rgba(16, 36, 70, 0.55)');
        grad2.addColorStop(1, 'rgba(4, 7, 17, 0.95)');
        drawRidge(height * 0.7, 95, 0.0035, 'rgba(0, 240, 255, 0.3)', grad2, -time * 35);

        // Foreground
        const grad3 = ctx.createLinearGradient(0, height * 0.8, 0, height);
        grad3.addColorStop(0, 'rgba(8, 18, 38, 0.85)');
        grad3.addColorStop(1, '#040711');
        drawRidge(height * 0.85, 45, 0.006, 'rgba(0, 240, 255, 0.4)', grad3, time * 15);
      } else {
        // Futuristic Glacier White Alpine Canvas (Daylight Sun over Annapurna)
        const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
        skyGrad.addColorStop(0, '#E0F2FE'); // Pale icy sky
        skyGrad.addColorStop(0.4, '#F0F9FF'); // Glacial daylight
        skyGrad.addColorStop(1, '#F8FAFD'); // Pristine snow base
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, width, height);

        // Distant Annapurna Range (Pale glacier silhouette)
        const grad1 = ctx.createLinearGradient(0, height * 0.35, 0, height);
        grad1.addColorStop(0, 'rgba(219, 234, 254, 0.65)');
        grad1.addColorStop(1, 'rgba(241, 245, 249, 0.9)');
        drawRidge(height * 0.52, 75, 0.002, 'rgba(14, 165, 233, 0.25)', grad1, time * 18);

        // Mid Ridge (Machapuchare / Fishtail ridge)
        const grad2 = ctx.createLinearGradient(0, height * 0.55, 0, height);
        grad2.addColorStop(0, 'rgba(186, 230, 253, 0.8)');
        grad2.addColorStop(1, 'rgba(248, 250, 252, 0.95)');
        drawRidge(height * 0.68, 95, 0.0035, 'rgba(2, 132, 199, 0.45)', grad2, -time * 30);

        // Foreground Modi Gorge Snowfields
        const grad3 = ctx.createLinearGradient(0, height * 0.75, 0, height);
        grad3.addColorStop(0, 'rgba(224, 242, 254, 0.9)');
        grad3.addColorStop(1, '#F8FAFD');
        drawRidge(height * 0.84, 50, 0.006, 'rgba(2, 132, 199, 0.55)', grad3, time * 15);

        // Topographic Contour Grid
        ctx.strokeStyle = 'rgba(2, 132, 199, 0.035)';
        ctx.lineWidth = 1;
        const step = 60;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
      }

      // Draw and update snow crystals
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (isDark) {
          ctx.fillStyle = p.glow ? `rgba(0, 240, 255, ${p.opacity})` : `rgba(255, 255, 255, ${p.opacity})`;
        } else {
          // In White theme: glowing cyan-blue glints and white snow sparkles
          ctx.fillStyle = p.glow
            ? `rgba(2, 132, 199, ${p.opacity * 0.8})`
            : `rgba(255, 255, 255, ${p.opacity * 0.9})`;
        }
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
