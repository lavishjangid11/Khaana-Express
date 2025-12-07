import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <section className="explore-menu" id="explore-menu">
      <h1 className="explore-title">Explore our Menu</h1>
      <p className="explore-menu-text">Discover delicious options crafted to satisfy every craving.</p>

      <div className="explore-menu-list">
        {Array.isArray(menu_list) && menu_list.length > 0 ? (
          menu_list.map((item, index) => (
            <div onClick={() => setCategory(prev=> prev===item.menu_name ? 'All' : item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category===item.menu_name ? "active" : ""} src={item.menu_image} alt={item.menu_name} />
              <p>{item.menu_name}</p>
            </div>
          ))
        ) : (
          <p className="no-items">No menu items available.</p>
        )}
      </div>
    </section>
  )
}

export default ExploreMenu