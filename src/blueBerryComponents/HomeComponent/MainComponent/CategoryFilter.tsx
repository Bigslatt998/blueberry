import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './CategoryFilter.css'


const CategoryFilter = () => {
  const [CurrentPage, setCurrentPage] = useState<string>('All')
  
  return (
<div className='CategoryFilt'>
      <ul>
        <li><NavLink to='' className={` 'Cate' ${CurrentPage === 'All' ? 'active' : ''}`}  
        onClick={() => setCurrentPage("All")}>All</NavLink></li>
        <li><NavLink to='snacks&spice' className={`${CurrentPage === 'snacks&spice' ? 'active' : ''}`}  
        onClick={() => setCurrentPage("snacks&spice")}>Snacks & Spices</NavLink></li>
        <li><NavLink to='fruit' className={`${CurrentPage === 'fruit' ? 'active' : ''}`}  
        onClick={() => setCurrentPage("fruit")}>Fruits</NavLink></li>
        <li><NavLink to='vegetable' className={`${CurrentPage === 'vegetable' ? 'active' : ''}`}  
        onClick={() => setCurrentPage("vegetable")}>Vegetables</NavLink></li>
      </ul>
    </div>
  )
}

export default CategoryFilter;