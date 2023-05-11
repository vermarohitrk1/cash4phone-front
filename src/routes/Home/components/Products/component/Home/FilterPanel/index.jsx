import React from 'react';
// import { categoryList, ratingList } from '../../../constants';
import CheckboxProton from '../../common/CheckboxProton';
import CheckboxRam from '../../common/CheckboxRam/CheckboxRam';
import CheckboxInternalStorage from '../../common/CheckboxInternalStorage/CheckboxInternalStorage';
// import FilterListToggle from '../../common/FilterListToggle';
import SliderProton from '../../common/SliderProton';
import './styles.css';

const FilterPanel = ({
  // selectedCategory,
  // selectCategory,
  // selectedRating,
  selectedPrice,
  // selectRating,
  brands,
  ram,
  internalStorage,
  changeChecked,
  handleRamChanged,
  handleInternalStorageChanged,
  changePrice,
}) => (
  <div className='filterPanel'>
    <div className='input-group' className='filter_panel_head'>
      <p className='label'>Filters</p>
      <a href="" className='label' className='labelP'>Reset</a>
    </div>
    <hr></hr>

    <div className='input-group'>
      <p className='label'>Brands</p>
      <div className='content'>
        {brands.map((brand) => (
          <CheckboxProton
            key={brand.id}
            brand={brand}
            changeChecked={changeChecked}
          />
        ))}
      </div>
    </div>
    <hr />

    <div className='input-group'>
      <p className='label'>Ram</p>
      <div className='content'>
      {ram.map((item) => (
          <CheckboxRam
            key={item.id}
            item={item}
            handleRamChanged={handleRamChanged}
          />
        ))}
      </div>
    </div>
    <hr />

    <div className='input-group'>
      <p className='label'>InternalStorage</p>
      <div className='content'>
      {internalStorage.map((item) => (
          <CheckboxInternalStorage
            key={item.id}
            item={item}
            handleInternalStorageChanged={handleInternalStorageChanged}
          />
        ))}
      </div>
    </div>
    <hr />

    <div className='input-group'>
      <p className='label-range'>Price Range</p>
      <div className="content">
        <SliderProton value={selectedPrice} changePrice={changePrice} />
      </div>
    </div>
    {/* <div className='input-group'>
      <p className='label'>Star Rating</p>
      <FilterListToggle
        options={ratingList}
        value={selectedRating}
        selectToggle={selectRating}
      />
    </div> */}
  </div>
);

export default FilterPanel;
