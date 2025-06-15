import { Metadata } from "next"
import { getProductsList } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import CloudPawsClient from "./CloudPawsClient"

export const metadata: Metadata = {
  title: "CloudPaws - Where Exceptional Cats Rest",
  description: "Handcrafted luxury blankets for the modern feline",
}

export default async function HomePage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const pricedProducts = await getProductsList({
    countryCode,
    pageParam: 0,
  })
  
  const region = await getRegion(countryCode)

  return <CloudPawsClient products={pricedProducts.response.products} region={region} />
}
