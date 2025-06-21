import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export default function useSurahNames() {
    const getSurahName=()=> axios.get("https://quranapi.pages.dev/api/surah.json")
    let surahNames=useQuery({
      queryKey:['SurahNames'],
      queryFn:getSurahName,
      select:(data)=>data?.data,
      retry:true,
      retryDelay:3000,
      staleTime:Infinity,
      refetchOnWindowFocus:"always"
  
  
    })
    return surahNames
}
