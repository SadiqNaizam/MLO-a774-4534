import React from 'react';
import { Progress } from '@/components/ui/progress'; // Example: use shadcn Progress
import { CheckCircle, RefreshCw, Truck, Package, Home } from 'lucide-react'; // Example icons

type OrderStatus = 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface OrderStatusStep {
  key: OrderStatus;
  label: string;
  icon: React.ElementType;
  completed?: boolean;
  active?: boolean;
}

interface InteractiveOrderStatusTrackerProps {
  currentStatus: OrderStatus;
  estimatedDeliveryTime?: string; // e.g., "5:30 PM"
}

const InteractiveOrderStatusTracker: React.FC<InteractiveOrderStatusTrackerProps> = ({
  currentStatus,
  estimatedDeliveryTime,
}) => {
  console.log("Rendering InteractiveOrderStatusTracker, status:", currentStatus);

  const statuses: OrderStatusStep[] = [
    { key: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
    { key: 'preparing', label: 'Preparing Your Order', icon: RefreshCw }, // Using RefreshCw for 'in progress' feel
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Home },
  ];

  const currentStatusIndex = statuses.findIndex(s => s.key === currentStatus);
  const progressValue = currentStatusIndex >=0 ? ((currentStatusIndex + 1) / statuses.length) * 100 : 0;

  const updatedStatuses = statuses.map((status, index) => ({
    ...status,
    completed: index < currentStatusIndex,
    active: index === currentStatusIndex,
  }));


  if (currentStatus === 'cancelled') {
    return (
        <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold text-red-700">Order Cancelled</h3>
            <p className="text-sm text-red-600">We're sorry, this order has been cancelled.</p>
        </div>
    );
  }


  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Order Status</h3>
        {estimatedDeliveryTime && <p className="text-sm text-gray-600">Estimated Delivery: {estimatedDeliveryTime}</p>}
      </div>

      {/* Simple Progress Bar */}
      <Progress value={progressValue} className="mb-6 h-2" />

      {/* Detailed Steps */}
      <div className="flex justify-between text-center">
        {updatedStatuses.map((status) => (
          <div key={status.key} className="flex-1">
            <div className={`mx-auto mb-2 w-10 h-10 rounded-full flex items-center justify-center
                            ${status.completed || status.active ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              <status.icon className="w-5 h-5" />
            </div>
            <p className={`text-xs font-medium ${status.active ? 'text-green-600' : status.completed ? 'text-gray-700' : 'text-gray-500'}`}>
              {status.label}
            </p>
          </div>
        ))}
      </div>
      {/* Potentially add more details here, like driver info if status is 'out_for_delivery' */}
    </div>
  );
};

export default InteractiveOrderStatusTracker;