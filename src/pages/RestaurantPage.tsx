import React, { useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Star, Clock, Info, Utensils, MessageSquare } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";


// Placeholder data for a single restaurant
const placeholderRestaurantDetails = {
  id: '1',
  name: 'Mama Mia Pizzeria',
  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80', // Large hero image
  logoUrl: 'https://via.placeholder.com/100/FF8C00/FFFFFF?Text=MMP',
  rating: 4.5,
  reviewCount: 150,
  cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
  deliveryTimeEstimate: '25-35 min',
  address: '123 Pizza Lane, Foodville',
  operationalHours: 'Mon-Sun: 11:00 AM - 10:00 PM',
  description: 'Authentic Italian pizzeria serving classic and gourmet pizzas, fresh pasta, and delicious appetizers. We use only the freshest ingredients.',
  menu: {
    appetizers: [
      { id: 'm1', name: 'Garlic Bread with Cheese', description: 'Toasted bread with garlic butter and mozzarella.', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=60' },
      { id: 'm2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 8.50, imageUrl: 'https://images.unsplash.com/photo-1572441718043-78cf59a7096f?auto=format&fit=crop&w=400&q=60' },
    ],
    pizzas: [
      { id: 'm3', name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, and basil.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=60' },
      { id: 'm4', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni and mozzarella.', price: 14.50, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=400&q=60' },
      { id: 'm5', name: 'Veggie Supreme Pizza', description: 'Assorted fresh vegetables and mozzarella.', price: 15.00, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=60' },
    ],
    pastas: [
      { id: 'm6', name: 'Spaghetti Bolognese', description: 'Rich meat sauce with spaghetti.', price: 13.50, imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e7e90dd4?auto=format&fit=crop&w=400&q=60' },
    ],
  },
  reviews: [
    { id: 'r1', userName: 'FoodieFan123', rating: 5, comment: 'Best pizza in town! The crust was perfect.' },
    { id: 'r2', userName: 'PastaLover', rating: 4, comment: 'Great spaghetti, very authentic. Delivery was quick.' },
  ]
};

type MenuItem = { id: string | number; name: string; price: number; };

const RestaurantPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<MenuItem[]>([]); // Simple cart state for this page
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);


  // In a real app, you'd fetch restaurant details based on restaurantId
  const restaurant = placeholderRestaurantDetails; // Using placeholder

  console.log('RestaurantPage loaded for ID:', restaurantId);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => [...prevCart, item]);
    toast({
        title: `${item.name} added to cart!`,
        description: `Price: $${item.price.toFixed(2)}`,
    });
    console.log('Added to cart:', item);
  };

  const openCustomizationDialog = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setIsCustomizationDialogOpen(true);
  };

  if (!restaurant) {
    return <div>Restaurant not found.</div>; // Or a proper not found component
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu cartItemCount={cart.length} />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <section className="bg-white py-3 border-b">
            <div className="container mx-auto px-4">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><RouterLink to="/">Home</RouterLink></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild><RouterLink to="/restaurants">Restaurants</RouterLink></BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </section>

        {/* Restaurant Hero Section */}
        <section className="relative h-64 md:h-80 bg-gray-300">
          <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 pb-6">
            <div className="flex items-end space-x-4">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-lg">
                    <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
                    <AvatarFallback>{restaurant.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white shadow-text">{restaurant.name}</h1>
                    <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="default" className="bg-yellow-400 text-black text-sm">
                            <Star className="w-4 h-4 mr-1" /> {restaurant.rating.toFixed(1)} ({restaurant.reviewCount} reviews)
                        </Badge>
                        <Badge variant="secondary" className="text-sm">
                            <Clock className="w-4 h-4 mr-1" /> {restaurant.deliveryTimeEstimate}
                        </Badge>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        {/* Tabs for Menu, Reviews, Info */}
        <section className="container mx-auto px-4 py-8">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:w-1/2 mb-6">
              <TabsTrigger value="menu"><Utensils className="w-4 h-4 mr-2 inline-block"/>Menu</TabsTrigger>
              <TabsTrigger value="reviews"><MessageSquare className="w-4 h-4 mr-2 inline-block"/>Reviews</TabsTrigger>
              <TabsTrigger value="info"><Info className="w-4 h-4 mr-2 inline-block"/>Info</TabsTrigger>
            </TabsList>

            <TabsContent value="menu">
              <div className="space-y-8">
                {Object.entries(restaurant.menu).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-semibold capitalize mb-4 text-gray-800">{category}</h2>
                    <ScrollArea className="h-auto" style={{ maxHeight: 'calc(100vh - 300px)'}}> {/* Adjust maxHeight as needed */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(items as MenuItem[]).map(item => (
                           <MenuItemCard 
                             key={item.id}
                             {...item}
                             // onAddToCart={() => handleAddToCart(item)} // Using dialog for customization example
                             onAddToCart={() => openCustomizationDialog(item)} // Example: trigger dialog
                           />
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Reviews</h2>
                {restaurant.reviews.map(review => (
                  <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center mb-1">
                      <h3 className="font-semibold text-gray-700">{review.userName}</h3>
                      <Badge variant="outline" className="ml-2 text-yellow-500 border-yellow-500">
                        <Star className="w-3 h-3 mr-1" /> {review.rating}/5
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                  </div>
                ))}
                {restaurant.reviews.length === 0 && <p className="text-gray-500">No reviews yet for this restaurant.</p>}
              </div>
            </TabsContent>

            <TabsContent value="info">
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Restaurant Information</h2>
                <div>
                    <h3 className="font-medium text-gray-700">Cuisine Types:</h3>
                    <p className="text-gray-600">{restaurant.cuisineTypes.join(', ')}</p>
                </div>
                 <div>
                    <h3 className="font-medium text-gray-700">Address:</h3>
                    <p className="text-gray-600">{restaurant.address}</p>
                </div>
                 <div>
                    <h3 className="font-medium text-gray-700">Hours:</h3>
                    <p className="text-gray-600">{restaurant.operationalHours}</p>
                </div>
                 <div>
                    <h3 className="font-medium text-gray-700">About:</h3>
                    <p className="text-gray-600">{restaurant.description}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Cart Summary / Proceed Button (Sticky or fixed) - Example */}
        {cart.length > 0 && (
            <div className="sticky bottom-0 bg-white p-4 shadow-t-lg border-t">
                <div className="container mx-auto flex justify-between items-center">
                    <p className="font-semibold text-lg">{cart.length} items in cart - Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
                    <Button size="lg" onClick={() => navigate('/cart')}>
                        View Cart & Checkout
                    </Button>
                </div>
            </div>
        )}

        {/* Item Customization Dialog Example */}
        {selectedMenuItem && (
            <Dialog open={isCustomizationDialogOpen} onOpenChange={setIsCustomizationDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Customize {selectedMenuItem.name}</DialogTitle>
                <DialogDescription>
                    Make changes to your item here. Click add to cart when you're done.
                </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {/* Placeholder for customization options */}
                    <p>Customization options for {selectedMenuItem.name} would go here (e.g., size, toppings, spice level).</p>
                    <p className="font-bold mt-2">Price: ${selectedMenuItem.price.toFixed(2)}</p>
                </div>
                <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => {
                    handleAddToCart(selectedMenuItem);
                    setIsCustomizationDialogOpen(false);
                }}>Add to Cart</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
        )}


      </main>
      <Footer />
    </div>
  );
};

export default RestaurantPage;