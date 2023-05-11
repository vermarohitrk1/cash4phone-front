import React, { useEffect, useState } from 'react';
import EmptyView from '../../component/common/EmptyView';
import FilterPanel from '../../component/Home/FilterPanel';
import List from '../../component/Home/List';
import SearchBar from '../../component/Home/SearchBar';
import { dataList } from '../../constants';
import './styles.css';

const Home = ({ phones }) => {

  const [phonesFound, setPhonesFound] = useState(false);
  // console.log("Phones received are ", phones);
  function keygen () {
    phones.forEach(element => {
      element['key'] = element.id;
    });
    // setPhonesFound(true);
  }

  phones && keygen();

  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);

  const [brands, setBrands] = useState([
    { id: 1, checked: false, label: 'Apple' },
    { id: 2, checked: false, label: 'Samsung' },
    { id: 3, checked: false, label: 'Oppo' },
    { id: 4, checked: false, label: 'OnePlus' },
  ]);

  const [ram, setRam] = useState([
    { id: 1, checked: false, label: '2GB' },
    { id: 2, checked: false, label: '4GB' },
    { id: 3, checked: false, label: '6GB' },
    { id: 4, checked: false, label: '8GB' },
    { id: 5, checked: false, label: '12GB' },
  ]);

  const [internalStorage, setInternalStorage] = useState([
    { id: 1, checked: false, label: '16GB' },
    { id: 2, checked: false, label: '32GB' },
    { id: 3, checked: false, label: '64GB' },
    { id: 4, checked: false, label: '128GB' },
    { id: 5, checked: false, label: '256GB' },
    { id: 6, checked: false, label: '512GB' },
    { id: 7, checked: false, label: '1TB' },
  ]);


  const [list, setList] = useState(phones);
  const [resultsFound, setResultsFound] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  // const handleSelectCategory = (event, value) =>
  //   !value ? null : setSelectedCategory(value);

  // const handleSelectRating = (event, value) =>
  //   !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const cusinesStateList = brands;
    const changeCheckedbrands = cusinesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setBrands(changeCheckedbrands);
  };

  const handleRamChanged = (id) => {
    const ramStateList = ram;
    const changeCheckRam = ramStateList.map((item) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setRam(changeCheckRam);
  }

  const handleInternalStorageChanged = (id) => {
    const internalStorageList = internalStorage;
    const changeInternalStorage = internalStorageList.map((item) => 
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setInternalStorage(changeInternalStorage);
  }

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {

    let updatedList = dataList;

    // Rating Filter
    // if (selectedRating) {
    //   updatedList = updatedList.filter(
    //     (item) => parseInt(item.rating) === parseInt(selectedRating)
    //   );
    // }

    // Category Filter
    // if (selectedCategory) {
    //   updatedList = updatedList.filter(
    //     (item) => item.category === selectedCategory
    //   );
    // }

    // brand Filter
    const brandsChecked = brands
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());

    if (brandsChecked.length) {
      updatedList = updatedList.filter((item) =>
        brandsChecked.includes(item.brand)
      );
    }

    // ram filter
    const ramChecked = ram
      .filter((item) => item.checked)
      .map((item) => item.label.toLocaleLowerCase());

    if(ramChecked.length) {
      updatedList = updatedList.filter((item) =>
        ramChecked.includes(item.ram)
      );
    }

    // internal Storage filter
    const internalStorageChecked = internalStorage
      .filter((item) => item.checked)
      .map((item) => item.label.toLocaleLowerCase());

    if(internalStorageChecked.length) {
      updatedList = updatedList.filter((item) =>
        internalStorageChecked.includes(item.internalStorage)
      );
    }

    // Search Filter
    if (searchInput) {
      updatedList = updatedList.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.marked_price >= minPrice && item.marked_price <= maxPrice
    );

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  // }, [selectedRating, selectedCategory, brands, searchInput, selectedPrice]);
  }, [internalStorage, ram, brands, searchInput, selectedPrice]);

  return (
    <div className='home'>
      {/* Search Bar */}
      <SearchBar
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
      />
      <div className='home_panelList-wrap'>
        {/* Filter Panel */}
        <div className='home_panel-wrap'>
          <FilterPanel
            // selectedCategory={selectedCategory}
            // selectCategory={handleSelectCategory}
            // selectedRating={selectedRating}
            selectedPrice={selectedPrice}
            // selectRating={handleSelectRating}
            brands={brands}
            ram={ram}
            internalStorage={internalStorage}
            changeChecked={handleChangeChecked}
            handleRamChanged={handleRamChanged}
            handleInternalStorageChanged={handleInternalStorageChanged}
            changePrice={handleChangePrice}
          />
        </div>
        {/* List & Empty View */}
        <div className='home_list-wrap'>
          {resultsFound && phones ? <List list={phones} /> : <EmptyView />}
        </div>
      </div>
    </div>
  );
};

export default Home;
