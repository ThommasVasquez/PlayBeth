'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<SVGGElement>(null);
  const centerRef = useRef<SVGCircleElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !petalsRef.current || !centerRef.current) return;

    const petals = petalsRef.current.children;
    const tl = gsap.timeline({
      onComplete: () => {
        // fade out the whole loader after animation
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setIsVisible(false)
        });
      }
    });

    // Reset states
    gsap.set(petals, { scale: 0, opacity: 0, transformOrigin: '50% 100%' });
    gsap.set(centerRef.current, { scale: 0, opacity: 0, transformOrigin: '50% 50%' });

    // Animation Sequence
    tl.to(centerRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    })
    .to(petals, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.3');

    // Loop the sequence while loading (optional, but here we just do once then hide)
    // For a persistent loader, we could use a different logic.
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className={styles.loaderContainer}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.bgVideo}
      >
        <source src="/videos/playbeth.mp4" type="video/mp4" />
      </video>
      <svg
        viewBox="0 0 200 200"
        className={styles.flowerSvg}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={petalsRef}>
          {/* Petal 1: Top (Pink) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#ecd2e0"
            transform="rotate(0, 100, 100)"
          />
          {/* Petal 2: Top-Right (Lavender) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#ced1f8"
            transform="rotate(60, 100, 100)"
          />
          {/* Petal 3: Bottom-Right (Beige) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#e5d6cd"
            transform="rotate(120, 100, 100)"
          />
          {/* Petal 4: Bottom (Pink) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#ecd2e0"
            transform="rotate(180, 100, 100)"
          />
          {/* Petal 5: Bottom-Left (Lavender) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#ced1f8"
            transform="rotate(240, 100, 100)"
          />
          {/* Petal 6: Top-Left (Beige) */}
          <path
            d="M100 100 C 99.8 100, 83.5 85, 82 48 C 82 22, 118 22, 118 48 C 118 85, 100.2 100, 100 100"
            fill="#e5d6cd"
            transform="rotate(300, 100, 100)"
          />
        </g>
        {/* Center Circle */}
        <circle
          ref={centerRef}
          cx="100"
          cy="100"
          r="19"
          fill="#e5d6cd"
          stroke="white"
          strokeWidth="3.5"
        />
      </svg>
      <div className={styles.loadingText}>PlayBeth!</div>
    </div>
  );
}
