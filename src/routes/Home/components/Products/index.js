import React, { useState } from 'react';
// import FilterPanel from './FilterPanel/FilterPanel';
import FilterPanel from './component/Home/FilterPanel';



function Products() {
    const [brands, setBrands] = useState([
    { id: 1, checked: false, label: 'Apple' },
    { id: 2, checked: false, label: 'Samsung' },
    { id: 3, checked: false, label: 'Oppo' },
    ]);

    return (
        <div>
            <FilterPanel brands={brands} />
        </div>
    )
}

export default Products