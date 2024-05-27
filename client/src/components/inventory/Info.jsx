import React from 'react'

function Info() {
    const categories=["xuv",'sedan']
  return (
    <div>
        <div>
            <p>Cars In Selected CateGory</p>
            <p>5</p>
        </div>
        <div>
            <p>Total In Inventory</p>
            <p>6</p>
        </div>
        <div>
            <select>
                <option value={null}>All Categories</option>
                {
                    categories.map((item,index)=>(<option value={item}>{item.toUpperCase()}</option>))
                }
            </select>
        </div>
    </div>
  )
}

export default Info