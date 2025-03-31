import React, { useCallback, useState } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { Popover, PopoverTrigger,PopoverContent  } from './ui/popover'
import { Book } from '@/lib/types'
import axios from 'axios'
import SearchResultItem from './SearchResultItem'

const Header = () => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [searchData, setSearchData] = useState<Book[] | undefined>()
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const debouncedSearch = useCallback((value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const newTimeoutId = setTimeout(async () => {
      if (value) {
        try {
          const response = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${value}`
          )
          const data = response.data
          setSearchData(data)
          setPopoverOpen(true)
        } catch (error) {
          console.log(error)
        }
      } else {
        setSearchData(undefined)
        setPopoverOpen(false)
      }
    }, 300)

    setTimeoutId(newTimeoutId)
  }, [timeoutId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== '') {
      debouncedSearch(e.target.value)
    }
  }

  return (
    <Popover open={popoverOpen}>
    <div className='w-[65%] h-20 bg-transparent border-b-2 border-neutral-100 flex items-center justify-end !mb-8'>
        <div className='h-1/2 relative min-w-80 rounded-md bg-neutral-200'>
            <PopoverTrigger className='h-full w-full' >
            <Input onChange={handleInputChange} placeholder='Search for Books' className='w-70 border-0 h-full bg-neutral-200 rounded-r-none border-r border-r-neutral-400 !pl-4' />
            <SearchIcon className='absolute top-1/2 right-2 -translate-y-1/2 h-6 w-6 cursor-pointer text-neutral-500 active:text-black' />
            </PopoverTrigger>
        </div>
            <PopoverContent className='max-h-150 w-125 overflow-y-scroll flex flex-col bg-neutral-100' sideOffset={5}>
              {searchData?.length && searchData.length > 0 ? (
                searchData.map((book) => (
                  <SearchResultItem book={book} key={book.id} />
                ))
              ) : (
                <div className="flex items-center justify-center text-center h-30 w-full">No Results Found</div>
              )}
            </PopoverContent>
    </div>
          </Popover>
  )
}

export default Header