import styles from './ProductCard.module.css';
import { ViewTransitionLink } from '../ViewTransitionLink';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  brand: string;
}

export default function ProductCard({ id, name, price, image, brand }: ProductCardProps) {
  return (
    <ViewTransitionLink href={`/product/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={image} 
          alt={name} 
          style={{ viewTransitionName: `product-img-${id}` } as any}
        />
        <div className={styles.badge}>In Stock</div>
      </div>
      <div className={styles.info}>
        <span className={styles.brand}>{brand}</span>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price}</p>
        <button className={styles.addToCart}>Add to Cart</button>
      </div>
    </ViewTransitionLink>
  );
}
