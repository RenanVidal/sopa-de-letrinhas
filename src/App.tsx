import { useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Cards from './Components/Cards';


function App() {
  
  const [search, setSearch] = useState ('');
    
  const listItens = data.map(item => 
    <Cards item={item} /> 
  );

  return (
    <main className={app.card}>
      <input
        className={app.searchBar}
        value={search}
        onChange={e => setSearch(e.currentTarget.value)}
      />
      {listItens}
    </main>
  );
}

export default App;

