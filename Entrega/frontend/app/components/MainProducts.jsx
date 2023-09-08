import MainProduct from './MainProduct'


async function getProducts() {
  const response = await fetch('http://localhost:8080/api/products')
  const data = await response.json()
  return data.payload.slice(0, 3)
}

export default async function MainProducts() {
  const products = await getProducts()
  return (
    <section>
      <div className="flex flex-col container md:grid">
        {products.map((product, index) => {
          return (
            <MainProduct product={product} index={index} isHome={true} key={product.code} />
          )
        })}
      </div>
    </section>

  )
}
