import Image from 'next/image'
import Link from 'next/link'
export default function MainProduct({ isHome, product, index, width=500, height=500 }) {
    const grid = isHome ? `A${index + 1} items-center` : `productCard`
    const nameStyle = isHome ? `productName` : `productCardName`
    const priceStyle = isHome ? `productPrice` : `productCardPrice`
    return (
        <div key={product._id} className={`${grid} flex justify-center`}>
            <Link href={`/product/${product._id}`}>
                <div className='absolute top-0 left-0'>
                    <h3 className={`bg-black ${nameStyle}`}>{product.title}</h3>
                    <p className={`bg-black ${priceStyle}`}>{product.price} ARS</p>
                </div>
                <Image priority src={(product.code == 'NIKEAF107LV8EMB' && isHome) ? product.thumbnail[2]:product.thumbnail[0]} width={width} height={height} alt={product.title}/>
            </Link>
        </div>
    )
}