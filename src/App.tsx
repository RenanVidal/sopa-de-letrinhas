import { data } from './data';
import app from './app.module.css';


function cards() {
  
    // const valor = data.map(item => {
    //   return (
    //     <div className={app.title}>
    //       <h1>{data[0].product_name}</h1>
    //     </div>
    //   )
    // });

    const item = data[0];

    return (
      <div className={app.card}>
        <h1 className={app.title}>{item.product_name}</h1>
        <p>{item.product_category}</p>
        <p>{item.product_subcategory}</p>
        <p>{item.price}</p>
      </div>
    )
}

export default function App() {
  return (
    <section>
      
    </section>
  );
}

