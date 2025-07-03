import { useQuery, useInfiniteQuery } from "react-query";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Variable global para mantener el conteo total
let cachedTotalCount = null;

const fetchProductsPaginated = async ({ queryKey }) => {
  const [, page, limit] = queryKey;
  const offset = page * limit;
  
  try {
    
    const productsResponse = await fetch(
      `${supabaseUrl}/rest/v1/products?select=*,categories(name,color)&order=id.desc&limit=${limit}&offset=${offset}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!productsResponse.ok) {
      throw new Error(`Error fetching products: ${productsResponse.status}`);
    }

    const products = await productsResponse.json();
    console.log(`Página ${page}: ${products.length} productos obtenidos`);

    
    if (cachedTotalCount === null) {
      const countResponse = await fetch(
        `${supabaseUrl}/rest/v1/products?select=count`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      if (countResponse.ok) {
        const countData = await countResponse.json();
        cachedTotalCount = countData.length > 0 ? countData[0].count : 0;
        console.log('Total count obtenido:', cachedTotalCount);
      }
    }

    return {
      products,
      totalCount: cachedTotalCount || 0,
      totalPages: cachedTotalCount ? Math.ceil(cachedTotalCount / limit) : 1
    };
    
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    throw error;
  }
};

  const fetchProductsScrolled = async ({ pageParam = 0,queryKey }) => {
    const [, limit] = queryKey;

    const offset = pageParam * (limit as number);

    try{
      const productsResponse = await fetch(
        `${supabaseUrl}/rest/v1/products?select=*,categories(name,color)&order=id.desc&limit=${limit}&offset=${offset}`,
        {
          headers: {
            apiKey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      if (!productsResponse.ok){
        throw new Error('Error fetching products: ${productsResponse.status');
      }

      const products = await productsResponse.json();

      return{
        products,
        nextCursor: products.length > 0 ? pageParam + 1 : undefined,
      };
    } catch (error) {
      console.error('Error in fetchProductsScrolled:', error);
      throw error;
    }
  };


  export function UseProductsPaginated(page = 0, limit = 10) {
  const { data: products = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: fetchProductsPaginated,
    keepPreviousData: true, 
  });

  return { products, isLoading, isError, error, refetch };
}

export function useProductsScrolled(limit=16) {
  const {data: products, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status,} = useInfiniteQuery(['productsScrolled', limit], fetchProductsScrolled,{
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  }
);return {products, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status};}
      
    



