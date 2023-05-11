import React from 'react';
import ListItem from './ListItem';
import { Link } from 'react-router-dom';
import './styles.css';

const List = ({ list }) => {
  
  return (<div className='list-wrap'>
    {list.map((item) => (
      <a href={`/product/${item.id}`}>
        <ListItem key={item.id} item={item} />
      </a>

    ))}
  </div>)
};

export default List;
