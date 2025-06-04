import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react'; // Icons for rating and delivery time

interface RestaurantPreviewCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  reviewCount?: number; // e.g., 200
  cuisineTypes: string[]; // e.g., ["Italian", "Pizza"]
  deliveryTimeEstimate: string; // e.g., "25-35 min"
  onClick?: (id: string | number) => void;
  // promotions?: string[]; // e.g. ["20% OFF", "Free Delivery"]
}

const RestaurantPreviewCard: React.FC<RestaurantPreviewCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  reviewCount,
  cuisineTypes,
  deliveryTimeEstimate,
  onClick,
}) => {
  console.log("Rendering RestaurantPreviewCard:", name);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className="w-full overflow-hidden transition-all hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
    >
      <CardHeader className="p-0">
        <div className="aspect-video bg-gray-100">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      </CardHeader>
      <CardContent className="p-3 space-y-1.5">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <div className="flex items-center text-sm text-gray-600 space-x-2">
          <span className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" /> {rating.toFixed(1)}
            {reviewCount && ` (${reviewCount})`}
          </span>
          <span className="text-gray-300">•</span>
          <span className="truncate">{cuisineTypes.join(', ')}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center text-sm">
         <Badge variant="outline" className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-gray-500" /> {deliveryTimeEstimate}
         </Badge>
         {/* Example: Promotion badge */}
         {/* {promotions && promotions[0] && <Badge variant="destructive">{promotions[0]}</Badge>} */}
      </CardFooter>
    </Card>
  );
};

export default RestaurantPreviewCard;