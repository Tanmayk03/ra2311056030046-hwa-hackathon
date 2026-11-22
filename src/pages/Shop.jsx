import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import PageHero from '../components/PageHero.jsx'
import RealProductCard from '../components/RealProductCard.jsx'
import { productOrder, realProducts } from '../data/realProducts.js'

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'name-asc', label: 'Name: A to Z' },
  { id: 'name-desc', label: 'Name: Z to A' },
]

const filters = [
  { id: 'all', label: 'All products' },
  { id: 'comfort', label: 'Comfort & enrichment' },
  { id: 'lighting', label: 'Smart lighting' },
  { id: 'voice', label: 'Voice companion' },
]

const productFilter = {
  habi: 'comfort',
  pawctrl: 'lighting',
  vox: 'voice',
}

export default function Shop() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase()

    const filtered = productOrder
      .map((slug) => realProducts[slug])
      .filter((product) => {
        const inCategory = category === 'all' || productFilter[product.slug] === category
        const haystack = [
          product.name,
          product.fullName,
          product.category,
          product.tagline,
          product.oneLiner,
          product.description,
        ]
          .join(' ')
          .toLowerCase()
        return inCategory && (!needle || haystack.includes(needle))
      })

    if (sort === 'name-asc') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'name-desc') return [...filtered].sort((a, b) => b.name.localeCompare(a.name))
    return filtered
  }, [category, query, sort])

  return (
    <>
      <PageHero
        eyebrow="The collection"
        title="Shop the collection"
        intro="Explore HABI, PAWCTRL and VOX. Product details are proposed and pricing is coming soon."
      />

      <section className="page-shell py-12 sm:py-16">
        <div className="card-surface p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="w-full lg:max-w-sm">
              <label htmlFor="shop-search" className="eyebrow">
                Search
              </label>
              <div className="relative mt-2">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-blue"
                  aria-hidden="true"
                />
                <input
                  id="shop-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  className="w-full rounded-full border border-brand-light bg-brand-pale py-3 pl-11 pr-4 font-medium text-brand-navy placeholder:text-brand-navy/45"
                />
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <label htmlFor="shop-sort" className="eyebrow flex items-center gap-2">
                <SlidersHorizontal size={14} aria-hidden="true" /> Sort
              </label>
              <select
                id="shop-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="mt-2 w-full rounded-full border border-brand-light bg-white px-5 py-3 font-bold text-brand-navy sm:w-56"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
                aria-pressed={category === item.id}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  category === item.id
                    ? 'bg-brand-blue text-white shadow-soft'
                    : 'bg-brand-pale text-brand-navy hover:bg-brand-light'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-brand-navy/70" aria-live="polite">
            {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
          </p>
          {(category !== 'all' || query) && (
            <button
              type="button"
              onClick={() => {
                setCategory('all')
                setQuery('')
              }}
              className="text-sm font-bold text-brand-blue underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <RealProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="card-surface mt-5 p-12 text-center">
            <p className="font-display text-2xl font-extrabold">Nothing here yet</p>
            <p className="mt-2 text-brand-navy/70">
              No products match those filters. Try another category or search term.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
