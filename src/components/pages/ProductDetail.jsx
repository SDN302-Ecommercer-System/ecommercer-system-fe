import { useParams } from "react-router-dom"
import MainLayout from "../MainLayout"

const ProductDetail = () => {
    const {id} = useParams();
  return (
    <MainLayout>
      <div>
        <h1>Detail of product {id}</h1>
      </div>
    </MainLayout>
  )
}

export default ProductDetail
