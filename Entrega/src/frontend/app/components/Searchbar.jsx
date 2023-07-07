import { useRouter } from 'next/navigation'
import { SearchIcon } from './Icons'
export default function Searchbar() {
    const router = useRouter()
    const handleSubmit = (e) => {
        e.preventDefault()
        const search = e.target.search.value
        if (search.length < 0) return
        router.push(`/search?product=${search}`)
    }

    return (
        <div className="flex justify-center mr-20">
            <form onSubmit={handleSubmit} className="flex">
                <input name="search" type="text" className="searchbar pl-5 text-md text-zinc-500 border border-zinc-500 :" placeholder="Search for products..." />
                <SearchIcon style={'searchIcon'} />
            </form>
        </div>
    )
}