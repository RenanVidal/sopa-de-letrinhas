import { Children, useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Card from './Components/Cards';

const dataBases = [...data];
const filteredCategories = dataBases.map(item => item.product_category);
const setCategory = new Set(filteredCategories); 
const listCategory = [...setCategory];

export default function App() {
 

  const [search, setSearch] = useState ('');
  const [filteredList, setFilteredList] = useState(dataBases);
  const [inputChecked, setInputChecked] = useState(null);
  const [subcategoryItem, setSubcategoryItem] = useState([]);

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
    if (event.currentTarget.value || event.currentTarget.value === "") {
      setFilteredList(dataNew);
      return;
    }
    const filtered = dataNew.filter(list => 
      list.product_name.toLowerCase().startsWith(
        event.currentTarget.value.toLowerCase()
      )
    );
    setFilteredList(filtered);
  }

  const handleFilterMenu: React.MouseEventHandler<HTMLInputElement> = (event) => {
    const clickedFilter = event.currentTarget.value;
    if (inputChecked !== clickedFilter) { 
      const newFilter =
      dataBases.filter(newList => newList.product_category.toLowerCase() === clickedFilter.toLowerCase())
      setFilteredList(newFilter);
      setInputChecked(clickedFilter);
      const subcategoryItens = dataBases.filter(itens => itens.product_category.toLowerCase() === clickedFilter.toLowerCase());
      const filteredSubcategories = subcategoryItens.map(item => item.product_subcategory);
      const setSubcategory = new Set(filteredSubcategories);
      const listSubcategory = [...setSubcategory]
      setSubcategoryItem(listSubcategory);
    } else { 
      setInputChecked(null);
      setFilteredList(dataBases);
      setSubcategoryItem([]);
    }
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
          {listCategory.map((category) => {
            return (
              <li key={category}>
                <label>
                  <input 
                    type="checkbox" 
                    className={app.chkInp} 
                    value={category}
                    checked={inputChecked === category}
                    onClick={handleFilterMenu}
                  />
                  {category}
                </label>
                <ul>
                  {subcategoryItem.map((subcategory) =>
                    <label>
                      <input 
                        type="checkbox" 
                        className={app.chkInp} 
                        value={subcategory}
                        checked={inputChecked === subcategory}  
                        onClick={handleFilterMenu}
                      />
                      {subcategory}
                    </label>
                  )}
                </ul>
              </li>
            )
          })}
        </ul>
      </aside>
      {filteredList.map(item =>
        <Card item={item} />
      )}
    </main>
  );
}