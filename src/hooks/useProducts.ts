import { useQuery } from "react-query"

export function UseProducts() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    const fetchProducts = async () => {
    const response = await fetch(`${supabaseUrl}/rest/v1/products?select=*,categories(name,color)`, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  })
    if(!response.ok){
      throw new Error('Error fetching products');
    }
    return response.json();
};

  const {
    data: products = [],
    isLoading,
    isError,
    error, 
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return{
    products,
    isLoading,
    isError,
    error,
    refetch
  };
}
      
    



