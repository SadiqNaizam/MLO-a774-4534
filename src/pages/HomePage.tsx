import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Input } from '@/components/ui/input';
import Carousel from '@/components/Carousel';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RestaurantPreviewCard from '@/components/RestaurantPreviewCard';
import FilterChip from '@/components/FilterChip';
import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import { Search } from 'lucide-react';

const placeholderCarouselSlides = [
  { id: 'promo1', content: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', altText: 'Delicious Pasta Promotion' },
  { id: 'promo2', content: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80', altText: 'Spicy Pizza Deal' },
  { id: 'promo3', content: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80', altText: 'Fresh Salad Offer' },
];

const placeholderRestaurants = [
  { id: '1', name: 'Mama Mia Pizzeria', imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=60', rating: 4.5, reviewCount: 150, cuisineTypes: ['Italian', 'Pizza'], deliveryTimeEstimate: '25-35 min' },
  { id: '2', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=60', rating: 4.8, reviewCount: 210, cuisineTypes: ['Japanese', 'Sushi'], deliveryTimeEstimate: '30-40 min' },
  { id: '3', name: 'Burger Barn', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=60', rating: 4.2, reviewCount: 180, cuisineTypes: ['American', 'Burgers'], deliveryTimeEstimate: '20-30 min' },
  { id: '4', name: 'Curry House', imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=60', rating: 4.6, reviewCount: 195, cuisineTypes: ['Indian', 'Curry'], deliveryTimeEstimate: '35-45 min' },
  { id: '5', name: 'Healthy Bites', imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=60', rating: 4.3, reviewCount: 120, cuisineTypes: ['Healthy', 'Salads'], deliveryTimeEstimate: '25-35 min' },
];

const placeholderFilters = [
  { label: 'All', value: 'all' },
  { label: 'Pizza', value: 'pizza' },
  { label: 'Sushi', value: 'sushi' },
  { label: 'Burgers', value: 'burgers' },
  { label: 'Indian', value: 'indian' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Offer', value: 'offer' },
];

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  console.log('HomePage loaded');

  const handleSearch = (term: string) => {
    console.log('Searching for:', term);
    // Implement search logic or navigation to search results page
  };

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    console.log('Filter activated:', value);
    // Implement filter logic for restaurants
  };

  const handleRestaurantClick = (id: string | number) => {
    navigate(`/restaurants/${id}`);
  };
  
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={0} onSearch={handleSearch} />
      
      <main className="flex-grow">
        {/* Hero Section with Search and Carousel */}
        <section className="py-8 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Your Favorite Food, Delivered Fast
              </h1>
              <p className="text-gray-600 mt-2">
                Discover local restaurants and enjoy delicious meals at home.
              </p>
            </div>
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-8 relative">
              <Input
                type="search"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full p-4 pl-12 text-lg rounded-lg shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <Button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </form>
            <Carousel slides={placeholderCarouselSlides} />
          </div>
        </section>

        {/* Filter Chips Section */}
        <section className="py-6 sticky top-16 bg-white z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-3 sr-only">Filter by Cuisine</h2>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-2 pb-2">
                {placeholderFilters.map((filter) => (
                  <FilterChip
                    key={filter.value}
                    label={filter.label}
                    value={filter.value}
                    isActive={activeFilter === filter.value}
                    onClick={() => handleFilterClick(filter.value)}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </section>

        {/* Restaurant Grid Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Popular Restaurants
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {placeholderRestaurants.map((restaurant) => (
                <RestaurantPreviewCard
                  key={restaurant.id}
                  {...restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                View All Restaurants
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;