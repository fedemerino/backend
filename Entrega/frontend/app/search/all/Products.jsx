import MainProduct from "@/app/components/MainProduct"
import { SkewLoader } from "react-spinners"
export default function Products({ products }) {
    return <>
        {
            products.length > 0 ?
                products.map((product, index) => {
                    return (
                        <MainProduct product={product} index={index} width={300} height={300} />
                    )

                }) : <SkewLoader/>
        }
        </>

}