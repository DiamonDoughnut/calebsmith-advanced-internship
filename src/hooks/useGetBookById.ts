import { Book } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useGetBookById(id: string) {
    const [loading, isLoading] = useState(true)
    const [data, setData] = useState<Book>()
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        async function fetchData(id: string) {
            isLoading(true)
            try {
                const res = await axios.get(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`)
                const data: Book = res.data
                setData(data)
                isLoading(false)
            } catch (e) {
                setError(e)
                isLoading(false)
            }
        }
        fetchData(id)
    }, [id])
    
    return { data, loading, error }
}