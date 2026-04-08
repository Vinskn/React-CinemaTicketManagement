import { useQuery } from "@tanstack/react-query";

export const useSearchData = (query: string) => {
   
    return useQuery({
        queryKey: ["search", query],
        queryFn: () => searchData(query),
        enabled: !!query,
    });
};

const searchData = async (query: string) => {
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=d592fe1a`);
    const data = await response.json();
    return data.Search;
};
