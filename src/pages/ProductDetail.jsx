import { useParams } from 'react-router-dom'
import StagePlaceholder from '../components/StagePlaceholder.jsx'
import { products } from '../data/catalog.js'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((item) => item.id === id)

  return (
    <StagePlaceholder
      title={product?.name ?? 'Product details'}
      note="Gallery, quantity selection and add-to-cart come next. Product details and prices are placeholders."
    />
  )
}
