"use client"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D]">
      <div className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-light mb-8">
          Where Exceptional<br />Cats Rest
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Handcrafted luxury blankets for the modern feline
        </p>
        <button className="bg-[#6B46C1] hover:bg-[#5B3BA3] text-white px-12 py-4 rounded-full">
          View Collection
        </button>
        <p className="mt-12 text-sm text-gray-500">
          Trusted by 10,000+ discerning cat parents
        </p>
      </div>
    </div>
  )
}
