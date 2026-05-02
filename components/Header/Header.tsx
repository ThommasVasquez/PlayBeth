import styles from './Header.module.css';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

const NAV_ITEMS = [
  { name: 'Newborn', subItems: ['Onesies', 'Sets', 'Blankets'] },
  { name: 'Baby Gear', subItems: ['Strollers', 'Car Seats', 'Carriers'] },
  { name: 'Nursery', subItems: ['Furniture', 'Decor', 'Bedding'] },
  { name: 'Gifts', subItems: ['Registry', 'Gift Cards', 'Best Sellers'] },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const searchOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSubMenu) {
      gsap.fromTo(megaMenuRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [activeSubMenu]);

  useEffect(() => {
    if (isSearchOpen) {
      gsap.fromTo(searchOverlayRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'expo.out' }
      );
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logoGroup}>
            <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
            <Link href="/" className={styles.logo}>
              <img src="/images/logo_playbeth_final_outlined.png" alt="PlayBeth!" className={styles.logoImage} />
            </Link>
          </div>

          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.name} 
                className={styles.navItem}
                onMouseEnter={() => setActiveSubMenu(item.name)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <span className={styles.navLink}>{item.name}</span>
                {activeSubMenu === item.name && (
                  <div ref={megaMenuRef} className={styles.megaMenu}>
                    <div className={styles.megaMenuContent}>
                      <h3>{item.name}</h3>
                      <ul>
                        {item.subItems.map((sub) => (
                          <li key={sub}>
                            <Link href={`/category/${sub.toLowerCase().replace(/ /g, '-')}`}>{sub}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={() => setIsSearchOpen(true)}><Search size={20} /></button>
            <button className={styles.actionBtn}><User size={20} /></button>
            <button className={styles.actionBtn}>
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>0</span>
            </button>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div ref={searchOverlayRef} className={styles.searchOverlay}>
          <button className={styles.closeSearch} onClick={() => setIsSearchOpen(false)}><X size={40} /></button>
          <div className={styles.searchContainer}>
            <h2>Find something for your little one</h2>
            <div className={styles.searchInputWrapper}>
              <input type="text" placeholder="Search for onesies, nursery gear..." autoFocus />
              <Search className={styles.searchIcon} size={30} />
            </div>
            <div className={styles.popularSearches}>
              <span>Popular:</span>
              <button>Organic Cotton</button>
              <button>Newborn Sets</button>
              <button>Gift Ideas</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
