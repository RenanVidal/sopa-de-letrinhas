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
  const [filteredList, setFilteredList] = useState({});
  const [dataNew, setDataNew] = useState(dataBases);
  const [ check, setCheck] = useState(null);
  
  const handleFilter = (e) => {
    setSearch(e.currentTarget.value);
    const filtered = dataNew.filter(list => list.product_name.toUpperCase() === e.currentTarget.value.toUpperCase());
    setFilteredList(filtered);
  }

  const handleFilterMenu = (e) => {
    const newFilter = dataBases.filter(newList => newList.product_category.toUpperCase() === e.currentTarget.value.toUpperCase())
    setDataNew(newFilter);
    setCheck(e.currentTarget.value);
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
          <li>Categoria</li>
          {listCategory.map((item) => {
            return (
              <li key={item.product_category}>
                <label>
                  <input 
                    type="checkbox" 
                    className={app.chkInp} 
                    value={item.product_category}
                    checked = {check === item.product_category}
                    onClick={handleFilterMenu}
                  />
                  {item.product_category}
                </label>
                <ul>
                </ul>
              </li>
            )
          })}
        </ul>
      </aside>
      {search === '' ? dataNew.map(item =>
        <Card item={item} />
      ) : filteredList.map(item =>
        <Card item={item} />
      )}
    </main>
  );
}