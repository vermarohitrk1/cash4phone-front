import React from 'react';
import './styles.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import iphone12mini from '../../../../constants/phones/iphone-12-mini.jpeg'

const ListItem = ({
  item: { image, model, marked_price, refurbished_status }, 
}) => {
  switch (refurbished_status) {
    case "A" || "a":
      refurbished_status = "Refurbished Superb"
      break;
    
      case "B" || "b":
        refurbished_status = "Refurbished Good"
        break;
      
      case "C" || "c":
        refurbished_status = "Refurbished Average"
        break;
      
      case "D" || "d":
        refurbished_status = "Refurbished Functional"
        break;
  
    default:
      break;
  }
  return (
  <div className='listItem-wrap'>
    <div className="image_container">
      <img src={iphone12mini} alt="phone_image" />
    </div>
    <footer>
      <header>
        <h4>{model}</h4>
        <span><ShoppingCartIcon /></span>
      </header>
      <p>
      {
        
      }
        <b>{refurbished_status}</b>
      </p>
      <p>
        <b>₹​{marked_price}</b>
      </p>
    </footer>
  </div>
)};

export default ListItem;
