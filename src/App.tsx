import { useState } from 'react';
import { data } from './data';
import app from './app.module.css';
import Card from './Components/Cards';
import SearchBar from './Components/SearchBar';
import FilterMenu from './Components/FilterMenu';

const dataBases = [...data];
const filteredCategories = dataBases.map(item => item.product_category);
const setCategory = new Set(filteredCategories); 
const listCategory = [...setCategory];

export default function App() {

  const [search, setSearch] = useState ('');
  const [filteredList, setFilteredList] = useState(dataBases);
  const [categoryChecked, setCategoryChecked] = useState<string | null>(null);
  const [subcategoryChecked, setSubcategoryChecked] = useState<string | null>("");
  const [subcategoryItem, setSubcategoryItem] = useState <string[] | null>([]);
  const [previousDatabase, setPreviusDatabase] = useState <string | null>(null);

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
    
    if (event.currentTarget.value === "") {
      if(previousDatabase !== null) {
        setFilteredList(previousDatabase);
      } else {
        console.log(event.currentTarget.value);
        setFilteredList(dataBases);
        return filteredList;
      }
    } else {
      const filtered = filteredList.filter(list => 
        list.product_name.toLowerCase().includes(
          event.currentTarget.value.toLowerCase()
        )
      );
      if (filtered !== null) {
        setFilteredList(filtered);
      } else {
        return filteredList
      }
    }
  }

  // Verificar o database intermediario

  const handleFilterCategory: React.MouseEventHandler<HTMLInputElement> = (event) => {
    
    const clickedFilter: string = event.currentTarget.value;
    
    if (categoryChecked !== clickedFilter) { 
      
      const newFilter =
      dataBases.filter(newList => newList.product_category.toLowerCase() === clickedFilter.toLowerCase())
      setFilteredList(newFilter);
      setCategoryChecked(clickedFilter);
      setPreviusDatabase(newFilter);

      const subcategoryItens = dataBases.filter(itens => itens.product_category.toLowerCase() === clickedFilter.toLowerCase());
      const filteredSubcategories = subcategoryItens.map(item => item.product_subcategory);
      const setSubcategory = new Set(filteredSubcategories);
      const listSubcategory = [...setSubcategory]
      setSubcategoryItem(listSubcategory);

    } else { 
      
      setCategoryChecked(null);
      setFilteredList(dataBases);
      setSubcategoryItem([]);
      setPreviusDatabase(null);
    
    }

  }

  const handleFilterSubcategory: React.MouseEventHandler<HTMLInputElement> = (event) => {
    
    const clickedFilter = event.currentTarget.value;
    
    if (subcategoryChecked !== clickedFilter) { 
      
      const newFilter =
        filteredList.filter(newList => 
          newList.product_subcategory.toLowerCase() === clickedFilter.toLowerCase());
      setFilteredList(newFilter);
      setSubcategoryChecked(clickedFilter);
    
    } else { 
      
      setSubcategoryChecked(null);
      setFilteredList(previousDatabase);
    
    }

  } 

  return (
    
    <main className={app.card}>
      
      <SearchBar 
        style={app.searchBar} 
        search={search} 
        handleFilter={handleFilter}  
      />
      
      <aside className={app.filters}>
      
        <ul className={app.list}>
          <FilterMenu 
            categories={listCategory} 
            styles={app.inputCheckbox} 
            selectedCategory={categoryChecked} 
            handleFilterCategory={handleFilterCategory} 
            subcategories={subcategoryItem} 
            selectedSubcategory={subcategoryChecked} 
            handleFilterSubcategory={handleFilterSubcategory}
          />
        </ul>

      </aside>
      
      {filteredList.map(item =>
        <Card item={item} />
      )}

    </main>

  );
}