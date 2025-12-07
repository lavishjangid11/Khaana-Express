import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = () => {

    const baseUrl = 'http://localhost:4000';
    const [list, setList] = useState([]);

    useEffect(() => {
      let mounted = true;
      const fetchList = async () => {
        try {
          const response = await axios.get(`${baseUrl}/api/food/list`);
          if (!mounted) return;
          if (response.data && response.data.success) {
            setList(response.data.data || []);
          } else {
            toast.error('Failed to fetch list');
          }
        } catch (err) {
          console.error(err);
          if (mounted) toast.error('Failed to fetch list');
        }
      };

      fetchList();
      return () => { mounted = false; };
    }, []);

    const removeFood = async (foodId) => {
      try {
        const response = await axios.post(`${baseUrl}/api/food/remove`, { id: foodId });
        if (response.data && response.data.success) {
          // remove from local list without refetching
          setList(prev => prev.filter(i => (i._id || i.id) !== foodId));
          toast.success('Food item removed successfully');
        } else {
          toast.error('Failed to remove food item');
        }
      } catch (err) {
        console.error(err);
        toast.error('Failed to remove food item');
      }
    }

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return (
              <div key={item._id || item.id || index} className="list-table-format">
                <img src={`${baseUrl}/image/`+item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id || item.id)} className='cursor'>X</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List