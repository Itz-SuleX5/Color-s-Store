import { useEffect, useState } from "react";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

  useEffect(() => {
    fetch(`${supabaseUrl}/rest/v1/categories`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    })
      .then((res) => res.json())
      .then(setCategories);
  }, [supabaseUrl, supabaseKey]);

  return categories;
}