import { useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Cards from './Components/Cards';
import Card from './Components/Cards';


function App() {
  
  const [search, setSearch] = useState ('');
  const [filteredList, setFilteredLid] = useState({});
    
  const listItens = data.map(item => 
    <Cards item={item} /> 
  );

  const handleFilter = (e) => {
    setSearch(e.currentTarget.value);
    const filtered = data.filter(list => list.product_name === search);
    setFilteredLid(filtered);
  }

  return (
    <main className={app.card}>
      <input
        className={app.searchBar}
        value={search}
        onChange={handleFilter}
      />
      {search === '' ? listItens : filteredList.map(item =>
          <Card item={item} />
        )
      }
    </main>
  );
}

export default App;

