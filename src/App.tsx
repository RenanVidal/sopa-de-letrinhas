import { data } from './data';
import app from './app.module.css';
import Cards from './Components/Cards';


function App() {
  
      const listItens = data.map(item => 
        <Cards item={item} /> 
      );

     return (
        <main className={app.card}>
          {listItens}
        </main>
     );

}
export default App;

