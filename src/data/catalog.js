// Placeholder catalogue. Names and prices are unconfirmed and are shown as
// placeholders throughout the UI until real product data is supplied.
export const categories = [
  { id: 'all', label: 'All goodies' },
  { id: 'foraging', label: 'Foraging' },
  { id: 'play', label: 'Play' },
  { id: 'calm', label: 'Calm & comfort' },
]

export const products = [
  {
    id: 'placeholder-forage',
    name: 'Placeholder enrichment item',
    category: 'foraging',
    price: null,
    image: null,
    description: 'Product details and photography to be confirmed.',
  },
  {
    id: 'placeholder-play',
    name: 'Placeholder play item',
    category: 'play',
    price: null,
    image: null,
    description: 'Product details and photography to be confirmed.',
  },
  {
    id: 'placeholder-calm',
    name: 'Placeholder comfort item',
    category: 'calm',
    price: null,
    image: null,
    description: 'Product details and photography to be confirmed.',
  },
]

export const formatPrice = (price) =>
  price == null ? 'Price to be confirmed' : `$${price.toFixed(2)}`
