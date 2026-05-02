"use client";

import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import ProductCard from "@/components/Product/ProductCard";
import { PRODUCTS } from "@/lib/data";
import styles from "./page.module.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(`.${styles.grid} > a`);

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  return (
    <main className={styles.main}>
      <Header />
      <Hero />

      <section ref={gridRef} className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="section-title">Trending Now</h2>
            <button className={styles.viewAll}>View All</button>
          </div>
          <div className={styles.grid}>
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.brandsSection}>
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className={styles.brandGrid}>
            {["Newborn", "Toddler", "Sleepwear", "Nursery"].map((brand) => (
              <div key={brand} className={styles.brandCard}>
                <h3>{brand}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>
              Join{" "}
              <img
                src="/images/logo_playbeth_final_outlined.png"
                alt="PlayBeth!"
                className={styles.inlineLogo}
              />
            </h2>
            <p>
              Sign up for our newsletter to get the latest news on upcoming
              releases and exclusives.
            </p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <img
                  src="/images/logo_playbeth_final_outlined.png"
                  alt="PlayBeth!"
                  style={{ height: "50px" }}
                />
              </Link>
              <p>The premier destination for the fan community.</p>
            </div>
            <div className={styles.footerLinks}>
              <div>
                <h4>Shop</h4>
                <ul>
                  <li>New Arrivals</li>
                  <li>Exclusives</li>
                  <li>HasLab</li>
                </ul>
              </div>
              <div>
                <h4>Support</h4>
                <ul>
                  <li>Contact Us</li>
                  <li>Shipping Info</li>
                  <li>Returns</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            © 2026 ENERGYSOFTmedia®. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}

// Add Link import
import Link from "next/link";
