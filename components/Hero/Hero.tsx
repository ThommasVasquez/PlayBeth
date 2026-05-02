import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(bgRef.current, 
      { scale: 1.1, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out' }
    );

    tl.fromTo(contentRef.current?.children || [], 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=0.8'
    );
  }, []);

  return (
    <section className={styles.hero}>
      <div ref={bgRef} className={styles.background}>
        <img src="/images/baby_hero_banner_1777703813015.png" alt="Baby Collection" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <span className={styles.badge}>Pure Comfort for Your Baby</span>
          <h1>Dreamy Days, Cozy Nights</h1>
          <p>Discover our curated collection of organic baby clothing and minimalist nursery essentials. Designed with love and care for your little ones.</p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Shop Newborn</button>
            <button className={styles.secondaryBtn}>Nursery Tour</button>
          </div>
        </div>
      </div>
    </section>
  );
}
