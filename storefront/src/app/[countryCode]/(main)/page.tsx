import { Metadata } from "next"
import { getCollectionsList } from "@/lib/data/collections"
import { getProductsList } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { useState, useEffect } from "react"
import { ShoppingCart, Leaf, Award, Heart, ArrowRight } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "CloudPaws - Where Exceptional Cats Rest",
  description: "Handcrafted luxury blankets for the modern feline",
}

export default async function HomePage({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  // Fetch real products from your Medusa backend
  const { products } = await getProductsList({
    pageParam: 0,
    queryParams: { limit: 3 },
    countryCode,
  })
  
  const region = await getRegion(countryCode)

  return <CloudPawsLuxury products={products} region={region} />
}

// Convert to client component
"use client"

function CloudPawsLuxury({ products, region }: any) {
  const [scrollY, setScrollY] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Keep all the useEffect hooks from v0 code here...
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("products-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const addToCart = (productId: string) => {
    setCartCount((prev) => prev + 1)
    // TODO: Actually add to Medusa cart
  }

  // Transform Medusa products to match v0 format
  const formattedProducts = products?.slice(0, 3).map((product: any) => ({
    id: product.id,
    name: product.title,
    price: product.variants[0]?.calculated_price?.calculated_amount 
      ? (product.variants[0].calculated_price.calculated_amount / 100).toFixed(0)
      : 90,
    image: product.thumbnail || "/placeholder.svg?height=600&width=600",
    collection: product.collection?.title || "Signature Series",
    availability: Math.floor(Math.random() * 3) + 2, // Random 2-4 for now
  })) || []

  const renderAvailabilityDots = (available: number, total = 5) => {
    return (
      <div className="flex gap-1 justify-center mt-2">
        {[...Array(total)].map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < available ? "bg-[#6B46C1]" : "bg-gray-200"}`} />
        ))}
      </div>
    )
  }

  // PASTE THE REST OF YOUR V0 COMPONENT HERE (the return statement with all the JSX)
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 ? "bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#E8E5FF]/30" : "bg-transparent"
        }`}
      >
        {/* ... rest of your v0 JSX ... */}
      </nav>

      {/* ... ALL THE REST OF YOUR V0 JSX GOES HERE ... */}
    </div>
  )
}
