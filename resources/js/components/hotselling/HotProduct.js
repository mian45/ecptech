import React, { useState } from "react";
import "./HotProduct.scss"
const HotProduct = () => {
    const hotproducts=[{
        id:1,
        name:"Double-Gauss lens",
        sales:"230 sales"
    },
    {
        id:2,
        name:"Inverted telephoto (retrofocus)",
        sales:"130 sales"
    },
    {
        id:3,
        name:"Frazier lens.",
        sales:"300 sales"
    }
]
    return (
        <div className="hot-product">
            <p className='staff-label'>Hot Selling Products</p>
            <ul>
                {
                    hotproducts.map((product, index)=>{
                        return <li>
                        <span className="product-count">{product.id}</span>
                        <div>
                            <p className="product-name">{product.name}</p>
                            <p className="sales">{product.sales}</p>
                        </div>
                    </li>
                    })
                }
               
            </ul>
        </div>
    )
}

export default HotProduct