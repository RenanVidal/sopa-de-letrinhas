import card from './card.module.css';

export default function Card({ item }) {
  return (
    <section className={card.card}>
        <h1 className={card.title}>{item.product_name}</h1>
        <p>Categoria: {item.product_subcategory}</p>
        <p>Preço: {item.price}</p>
    </section>
  )
}
