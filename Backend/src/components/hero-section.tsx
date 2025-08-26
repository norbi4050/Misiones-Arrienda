"use client"

import { useState } from "react"
import { EnhancedSearchBar } from "@/components/enhanced-search-bar"
import { PropertyMap } from "@/components/property-map"

interface SearchFilters {
  location: string
  propertyType: string
  minPrice: string
  maxPrice: string
}

export function HeroSection() {
  const [searchResults, setSearchResults] = useState<SearchFilters | null>(null)

  const handleSearch = (filters: SearchFilters) => {
    setSearchResults(filters)
    console.log("Buscando propiedades con filtros:", filters)
    
    // Scroll a la sección de propiedades
    const propertiesSection = document.getElementById('propiedades')
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Mock properties for the map - in real app, this would come from API
  const mockProperties = [
    {
      id: "1",
      title: "Casa moderna en Posadas",
      description: "Hermosa casa moderna con todas las comodidades",
      price: 120000,
      city: "Posadas",
      province: "Misiones",
      latitude: -27.3621,
      longitude: -55.9008,
      images: ["/placeholder-house-1.jpg"],
      featured: true,
      bedrooms: 3,
      bathrooms: 2,
      garages: 1,
      area: 150,
      propertyType: "HOUSE" as const,
      listingType: "SALE" as const,
      status: "AVAILABLE" as const,
      address: "Av. Mitre 1234",
      postalCode: "3300",
      yearBuilt: 2020,
      amenities: ["Piscina", "Jardín", "Parrilla"],
      features: ["Cocina moderna", "Pisos de cerámica", "Aire acondicionado"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      agent: {
        id: "agent1",
        name: "Juan Pérez",
        phone: "+54 376 123456",
        email: "juan@example.com",
        rating: 4.8
      }
    },
    {
      id: "2", 
      title: "Departamento céntrico en Oberá",
      description: "Departamento céntrico con excelente ubicación",
      price: 85000,
      city: "Oberá",
      province: "Misiones",
      latitude: -27.4878,
      longitude: -55.1199,
      images: ["/placeholder-apartment-1.jpg"],
      featured: false,
      bedrooms: 2,
      bathrooms: 1,
      garages: 0,
      area: 80,
      propertyType: "APARTMENT" as const,
      listingType: "SALE" as const,
      status: "AVAILABLE" as const,
      address: "San Martín 567",
      postalCode: "3360",
      yearBuilt: 2018,
      amenities: ["Portero", "Ascensor"],
      features: ["Balcón", "Cocina integrada"],
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      agent: {
        id: "agent2",
        name: "María García",
        phone: "+54 376 654321",
        email: "maria@example.com",
        rating: 4.5
      }
    }
  ]

  return (
    <section className="relative">
      {/* Simplified Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Encuentra tu propiedad ideal en Misiones
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
              Casas, departamentos y locales comerciales en alquiler y venta
            </p>
          </div>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-6xl mx-auto">
            <EnhancedSearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              🗺️ Explora propiedades en el mapa
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visualiza todas las propiedades disponibles en Misiones. 
              Haz clic en los marcadores para ver detalles de cada propiedad.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <PropertyMap 
              properties={mockProperties}
              height="500px"
              onPropertyClick={(property) => {
                console.log("Clicked property:", property.title)
                // Could redirect to property detail page
                window.location.href = `/property/${property.id}`
              }}
            />
          </div>
          
          {/* Map Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-900 mb-2">Ubicaciones Precisas</h3>
              <p className="text-sm text-gray-600">
                Cada propiedad está marcada con su ubicación exacta en el mapa
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-900 mb-2">Precios Visibles</h3>
              <p className="text-sm text-gray-600">
                Ve los precios directamente en el mapa sin necesidad de hacer clic
              </p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Propiedades Destacadas</h3>
              <p className="text-sm text-gray-600">
                Las propiedades destacadas se resaltan con colores especiales
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results Display */}
      {searchResults && (
        <div className="bg-blue-50 py-4">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-blue-800">
                🎯 Búsqueda activa: {searchResults.location && `📍 ${searchResults.location}`}
                {searchResults.propertyType && ` 🏠 ${searchResults.propertyType}`}
                {searchResults.minPrice && ` 💰 Desde $${parseInt(searchResults.minPrice).toLocaleString()}`}
                {searchResults.maxPrice && ` 💎 Hasta $${parseInt(searchResults.maxPrice).toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
