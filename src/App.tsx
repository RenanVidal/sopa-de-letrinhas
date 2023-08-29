import { Children, useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Card from './Components/Cards';

const dataBases = data.map(item => item);
const setCategory = new Set();
const setSubcategory = new Set();

const listCategory = dataBases.filter((listUnique) => {
  const duplicateInList =setCategory.has(listUnique.product_category);
  setCategory.add(listUnique.product_category);
  return !duplicateInList;
}) 

const listSubcategory = dataBases.filter((listSub) => {
  const duplicateInListSub = setSubcategory.has(listSub.product_subcategory);
  setSubcategory.add(listSub.product_subcategory);
  return !duplicateInListSub;
})

export default function App() {
  
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
      <aside className={app.filters}>
        <ul className={app.list}>
          {listCategory.map((item) => {
            return (
              <li>
                <p><input type="checkbox" className={app.chkInp}/>{item.product_category}</p>
                <ul>
                  
                </ul>
              </li>
            )
          })}
        </ul>
      </aside>
      {search === '' ? dataBases.map(item =>
        <Card item={item} />
      ) : filteredList.map(item =>
        <Card item={item} />
      )}
    </main>
  );
}