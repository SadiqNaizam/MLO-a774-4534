import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import InteractiveOrderStatusTracker, { OrderStatus } from '@/components/InteractiveOrderStatusTracker'; // Assuming OrderStatus type is exported
import DeliveryMapView from '@/components/DeliveryMapView';
import { Package, HelpCircle, MessageSquare } from 'lucide-react';

// Mock order data
const mockOrderData = {
  orderId: 'ORD123456789',
  status: 'out_for_delivery' as OrderStatus,
  estimatedDeliveryTime: '4:30 PM - 4:45 PM',
  items: [
    { name: 'Margherita Pizza', quantity: 1 },
    { name: 'Coke Can', quantity: 4 },
  ],
  deliveryAddress: '123 Main St, Anytown, CA 90210',
  restaurantName: 'Mama Mia Pizzeria',
  courier: {
    name: 'John D.',
    vehicle: 'Blue Scooter - XYZ 123',
    // eta: '15 minutes' // More specific ETA for map
  }
};


const ActiveOrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  // In a real app, fetch order details based on orderId
  const order = { ...mockOrderData, orderId: orderId || mockOrderData.orderId };

  console.log('ActiveOrderTrackingPage loaded for Order ID:', order.orderId);

  // Calculate progress based on current status
  const statusSteps: OrderStatus[] = ['confirmed', 'preparing', 'out_for_delivery', 'delivered'];
  const currentStatusIndex = statusSteps.indexOf(order.status);
  const progressPercentage = currentStatusIndex !== -1 ? ((currentStatusIndex + 1) / statusSteps.length) * 100 : 0;


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
           <Package className="mx-auto h-12 w-12 text-orange-500 mb-2" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Track Your Order</h1>
          <p className="text-gray-600 mt-1">Order ID: <span className="font-semibold text-orange-600">{order.orderId}</span></p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Status Tracker & Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Order Status</CardTitle>
                <CardDescription>
                  Estimated Delivery: <span className="font-semibold text-orange-600">{order.estimatedDeliveryTime}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveOrderStatusTracker currentStatus={order.status} estimatedDeliveryTime={order.estimatedDeliveryTime} />
                 {/* Overall Progress Bar - could be redundant if tracker has one */}
                <div className="mt-6">
                    <Label htmlFor="order-progress" className="text-sm font-medium text-gray-700">Overall Progress</Label>
                    <Progress id="order-progress" value={progressPercentage} className="w-full mt-1 h-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Order Details</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700">Items:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {order.items.map(item => (
                      <li key={item.name}>{item.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Delivering To:</h4>
                  <p className="text-gray-600">{order.deliveryAddress}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">From:</h4>
                  <p className="text-gray-600">{order.restaurantName}</p>
                </div>
                 {order.status === 'out_for_delivery' && order.courier && (
                    <div>
                        <h4 className="font-semibold text-gray-700">Your Courier:</h4>
                        <p className="text-gray-600">{order.courier.name} on a {order.courier.vehicle}</p>
                    </div>
                 )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Map View & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <DeliveryMapView 
              placeholderText={
                order.status === 'out_for_delivery' 
                ? "Tracking courier location..." 
                : "Map will be active when order is out for delivery."
              }
            />
            <Card>
              <CardHeader><CardTitle>Need Help?</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <HelpCircle className="mr-2 h-4 w-4" /> Contact Support
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message Restaurant
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  If there are any issues with your order, please contact us immediately.
                </p>
              </CardContent>
               <CardFooter>
                  <Button variant="default" className="w-full" onClick={() => alert('Order cancellation requested. (Mock functionality)')}>
                    Request Order Cancellation
                  </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
         <div className="mt-12 text-center">
            <Button variant="link" asChild>
                <RouterLink to="/">Back to Homepage</RouterLink>
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ActiveOrderTrackingPage;