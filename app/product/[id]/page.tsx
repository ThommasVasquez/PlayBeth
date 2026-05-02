'use client';

import Header from '@/components/Header/Header';
import { PRODUCTS } from '@/lib/data';
import styles from './ProductPage.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Star, Share2, Heart } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = PRODUCTS.find(p => p.id === id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current.children, 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [product]);

  if (!product) return <div>Product not found</div>;

  return (
    <main className={styles.main}>
      <Header />
      
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/"><ArrowLeft size={16} /> Back to Trending</Link>
        </div>

        <div className={styles.pdpLayout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ viewTransitionName: `product-img-${id}` } as any}
              />
            </div>
            <div className={styles.thumbnails}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.thumb}>
                  <img src={product.image} alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          <div ref={contentRef} className={styles.details}>
            <div className={styles.header}>
              <span className={styles.brand}>{product.brand}</span>
              <h1>{product.name}</h1>
              <div className={styles.rating}>
                <div className={styles.stars}>
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} />
                </div>
                <span>(42 reviews)</span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.price}>{product.price}</span>
              <span className={styles.stock}>In Stock</span>
            </div>

            <p className={styles.description}>
              Celebrate the legacy of Star Wars with premium figures, vehicles, and roleplay items from Star Wars The Black Series. This figure is detailed to look like the character from the cinematic universe, featuring premium detail and multiple points of articulation.
            </p>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>
              <div className={styles.secondaryActions}>
                <button className={styles.iconBtn}><Heart size={20} /></button>
                <button className={styles.iconBtn}><Share2 size={20} /></button>
              </div>
            </div>

            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <strong>Ages:</strong> 4 and up
              </div>
              <div className={styles.highlight}>
                <strong>Scale:</strong> 6-inch
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
