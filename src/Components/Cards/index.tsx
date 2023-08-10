import card from './card.module.css';

export default function Card({ item }) {
  return (
    <div className={card.card}>
        <div className={card.heading}>
          <h1 className={card.title}>{item.product_name}</h1>
          <p>Categoria: {item.product_subcategory}</p>
        </div>
        <div className={card.baseboard}>
          <p>Preço: R$ {item.price}</p>
        </div>
    </div>
  )
}
