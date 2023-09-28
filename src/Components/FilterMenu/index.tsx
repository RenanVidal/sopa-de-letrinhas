import { useState } from 'react';

export default function FilterMenu ({categories, styles, selectedCategory, handleFilterCategory, subcategories, selectedSubcategory, handleFilterSubcategory }) {
  return (
    <>
      <li>Categoria</li>
        
        {categories.map((category: string) => {
          return (
                
            <li key={category}>
              <label>
                <input 
                  type="checkbox" 
                  className={styles} 
                  value={category}
                  checked={selectedCategory === category}
                  onClick={handleFilterCategory}
                />
                {category}
              </label>
                  
              {selectedCategory === category ? 
                <ul>
                  {subcategories !== null ?
                    subcategories.map((subcategory: string) =>
                      <label>
                        <input 
                          type="checkbox" 
                          className={styles} 
                          value={subcategory}
                          checked={selectedSubcategory === subcategory}  
                          onClick={handleFilterSubcategory}
                        />
                        {subcategory}
                      </label>
                  ): null}
                </ul> : null
              }

            </li>
          );
        })}
    </>    
  )
}