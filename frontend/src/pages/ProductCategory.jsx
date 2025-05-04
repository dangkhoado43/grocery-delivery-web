import React from "react";
import { useAppContext } from "../contexts/AppContext";

const ProductCategory = () => {
    const { products } = useAppContext();

    return <div>ProductCategory</div>;
};

export default ProductCategory;
