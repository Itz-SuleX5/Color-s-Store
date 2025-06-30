import {useEffect, useState} from "react";

export function UseProducts() {
    const [products, setProducts] = useState([]);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    const fetchProducts = () => {
      fetch(`${supabaseUrl}/rest/v1/products?select=*,categories(name,color)`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error(err));
};
    

    useEffect(() => {
      fetchProducts();
    }, [supabaseUrl, supabaseKey]);
return { products, refetch: fetchProducts};
}


