import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X, Tag, AlertCircle, Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  // variant?: string; // e.g. "Large", "Spicy"
}

const initialCartItems: CartItem[] = [
  { id: 'm3', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=100&q=60' },
  { id: 'm1', name: 'Garlic Bread with Cheese', price: 6.99, quantity: 2, imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=100&q=60' },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<boolean | null>(null); // null: not tried, true: success, false: fail
  const navigate = useNavigate();

  console.log('CartPage loaded');

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      // Optional: confirm removal or just remove
      setCartItems(cartItems.filter(item => item.id !== id));
      return;
    }
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setPromoApplied(true);
      // Apply discount logic here
    } else if (promoCode.trim() === '') {
      setPromoApplied(null);
    }
    else {
      setPromoApplied(false);
    }
    console.log('Promo code applied:', promoCode);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoApplied === true ? subtotal * 0.10 : 0; // Example 10% discount
  const taxes = (subtotal - discount) * 0.08; // Example 8% tax
  const deliveryFee = cartItems.length > 0 ? 5.00 : 0; // Example fixed delivery fee
  const total = subtotal - discount + taxes + deliveryFee;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-800">Your Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl text-gray-600 mb-2">Your cart is empty.</p>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Button onClick={() => navigate('/')} size="lg">Start Shopping</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-700">{item.name}</h3>
                        {/* {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>} */}
                        <p className="text-orange-600 font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="h-8 w-8">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input 
                          type="number" 
                          value={item.quantity} 
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-12 h-8 text-center border-0 focus-visible:ring-0"
                          min="1"
                        />
                        <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="h-8 w-8">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold text-gray-800 w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Separator />

                {/* Promo Code Section */}
                <div className="flex flex-col sm:flex-row items-end space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="flex-grow w-full sm:w-auto">
                     <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                    <Input 
                      id="promoCode"
                      type="text" 
                      placeholder="Enter promo code" 
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoApplied(null); }}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleApplyPromoCode} className="w-full sm:w-auto">
                    <Tag className="mr-2 h-4 w-4"/> Apply
                  </Button>
                </div>
                {promoApplied === true && (
                  <Alert variant="default" className="bg-green-50 border-green-300 text-green-700">
                    <AlertCircle className="h-4 w-4 !text-green-700" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Promo code "SAVE10" applied successfully. You get a 10% discount!</AlertDescription>
                  </Alert>
                )}
                {promoApplied === false && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Invalid Code</AlertTitle>
                    <AlertDescription>The promo code you entered is not valid or has expired.</AlertDescription>
                  </Alert>
                )}

                {/* Order Summary */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-gray-600"><p>Subtotal:</p><p>${subtotal.toFixed(2)}</p></div>
                  {discount > 0 && <div className="flex justify-between text-green-600"><p>Discount (10%):</p><p>-${discount.toFixed(2)}</p></div>}
                  <div className="flex justify-between text-gray-600"><p>Taxes (8%):</p><p>${taxes.toFixed(2)}</p></div>
                  <div className="flex justify-between text-gray-600"><p>Delivery Fee:</p><p>${deliveryFee.toFixed(2)}</p></div>
                  <Separator />
                  <div className="flex justify-between font-bold text-xl text-gray-800"><p>Total:</p><p>${total.toFixed(2)}</p></div>
                </div>
              </div>
            )}
          </CardContent>
          {cartItems.length > 0 && (
            <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t">
                <Button variant="outline" onClick={() => navigate('/')} className="w-full sm:w-auto">
                    Continue Shopping
                </Button>
                <Button size="lg" onClick={() => navigate('/checkout')} className="w-full sm:w-auto">
                    Proceed to Checkout
                </Button>
            </CardFooter>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;