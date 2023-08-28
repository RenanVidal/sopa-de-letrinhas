import { useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Card from './Components/Cards';

const dataBases = data.map(item => item);

function App() {
  
  const [search, setSearch] = useState ('');
  const [filteredList, setFilteredLid] = useState({});
  
  const handleFilter = (e) => {
    setSearch(e.currentTarget.value);
    const filtered = dataBases.filter(list => list.product_name.toUpperCase() === search.toUpperCase());
    setFilteredLid(filtered);
  }

  return (
    <main className={app.card}>
      <input
        className={app.searchBar}
        value={search}
        onChange={handleFilter}
      />
      {search === '' ? dataBases.map(item =>
        <Card item={item} />
      ) : filteredList.map(item =>
        <Card item={item} />
      )}
    </main>
  );
}

export default App;

