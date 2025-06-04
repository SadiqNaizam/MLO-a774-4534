import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle } from 'lucide-react'; // Icons for quantity or add

interface MenuItemCardProps {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  // currencySymbol?: string; // e.g., "$"
  onAddToCart: (item: { id: string | number; name: string; price: number }) => void;
  // Optional: if customization is needed before adding
  // onCustomize?: (id: string | number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  // currencySymbol = '$',
  onAddToCart,
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCart = () => {
    onAddToCart({ id, name, price });
    // Potentially show a toast notification here
    // import { useToast } from "@/hooks/use-toast"; const { toast } = useToast();
    // toast({ title: `${name} added to cart` });
  };

  return (
    <Card className="flex flex-col md:flex-row w-full overflow-hidden transition-shadow hover:shadow-lg">
      {imageUrl && (
        <div className="md:w-1/3 aspect-video md:aspect-auto bg-gray-100 flex-shrink-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-md md:text-lg font-semibold">{name}</CardTitle>
          {description && <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>}
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0 flex-grow">
          <p className="text-md font-bold text-orange-600">${price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-3 md:p-4 pt-0">
          <Button className="w-full md:w-auto" onClick={handleAddToCart} size="sm">
            <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          {/* Or an "Add" button that opens a dialog for customization */}
          {/* {onCustomize && <Button variant="outline" onClick={() => onCustomize(id)}>Customize</Button>} */}
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemCard;