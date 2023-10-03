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

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.currentTarget.value);
    
    if (event.currentTarget.value === "") {
        console.log(event.currentTarget.value);
        setFilteredList(dataBases);
        return filteredList;
    } else {
      const filtered = filteredList.filter(list => 
        list.product_name.toLowerCase().includes(
          event.currentTarget.value.toLowerCase()
        )
      );
      setFilteredList(filtered);  
    }
  }

  // Após realizar a busca pela barra de busca ao ser apagado seu conteudo a mesma deve exibir os cartões de acordo com o que era exibido antes da busca;
  //Ao ser desmarcada uma subcategoria essa deve exibir os cards de acordo com sua categoria pai

  const handleFilterCategory: React.MouseEventHandler<HTMLInputElement> = (event) => {
    
    const clickedFilter: string = event.currentTarget.value;
    
    if (categoryChecked !== clickedFilter) { 
      
      const newFilter =
      dataBases.filter(newList => newList.product_category.toLowerCase() === clickedFilter.toLowerCase())
      setFilteredList(newFilter);
      setCategoryChecked(clickedFilter);

      const subcategoryItens = dataBases.filter(itens => itens.product_category.toLowerCase() === clickedFilter.toLowerCase());
      const filteredSubcategories = subcategoryItens.map(item => item.product_subcategory);
      const setSubcategory = new Set(filteredSubcategories);
      const listSubcategory = [...setSubcategory]
      setSubcategoryItem(listSubcategory);

    } else { 
      
      setCategoryChecked(null);
      setFilteredList(dataBases);
      setSubcategoryItem([]);
    
    }

  }

  const handleFilterSubcategory: React.MouseEventHandler<HTMLInputElement> = (event) => {
    
    const clickedFilter = event.currentTarget.value;
    
    if (subcategoryChecked !== clickedFilter) { 
      
      const newFilter =
        dataBases.filter(newList => 
          newList.product_subcategory.toLowerCase() === clickedFilter.toLowerCase());
      setFilteredList(newFilter);
      setSubcategoryChecked(clickedFilter);
    
    } else { 
      
      setSubcategoryChecked(null);
      setFilteredList(dataBases);
    
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