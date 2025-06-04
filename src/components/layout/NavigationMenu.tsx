import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Search, UserCircle } from 'lucide-react';

interface NavigationMenuProps {
  cartItemCount?: number;
  onSearch?: (searchTerm: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ cartItemCount = 0, onSearch }) => {
  console.log("Rendering NavigationMenu");

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = event.currentTarget.search.value;
    if (onSearch) {
      onSearch(searchTerm);
    }
    console.log("Search submitted:", searchTerm);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand Name */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          FoodDash
        </Link>

        {/* Search Bar - Centered for medium screens and up */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
            <div className="relative">
              <Input
                type="search"
                name="search"
                placeholder="Search restaurants or dishes..."
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </form>
        </div>

        {/* Actions: Cart, Account */}
        <div className="flex items-center space-x-3">
          {/* Search Icon for small screens */}
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
            <Search className="h-6 w-6" />
          </Button>

          <Link to="/cart" aria-label="Shopping Cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/account" aria-label="User Account">
            <Button variant="ghost" size="icon">
              <UserCircle className="h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
      {/* Optional: Mobile Search Bar expansion */}
    </nav>
  );
};

export default NavigationMenu;