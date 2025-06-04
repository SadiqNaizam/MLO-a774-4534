import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using Badge as a base for chip
import { X } from 'lucide-react'; // Optional: for a clear/remove icon

interface FilterChipProps {
  label: string;
  isActive?: boolean;
  onClick?: (label: string) => void;
  onRemove?: (label: string) => void; // Optional: if chips can be removed
  value: string | number;
}

const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive = false,
  onClick,
  onRemove,
  value
}) => {
  console.log("Rendering FilterChip:", label, "Active:", isActive);

  const handleClick = () => {
    if (onClick) {
      onClick(label); // Or pass value
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onClick if chip itself is clickable
    if (onRemove) {
      onRemove(label); // Or pass value
    }
  };

  return (
    <Badge
      variant={isActive ? 'default' : 'outline'}
      className={`cursor-pointer transition-colors py-1.5 px-3 rounded-full text-sm
                  ${isActive ? 'bg-orange-500 text-white hover:bg-orange-600' : 'hover:bg-gray-100 border-gray-300'}`}
      onClick={handleClick}
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
      role="checkbox"
      aria-checked={isActive}
    >
      {label}
      {isActive && onRemove && (
        <button
          onClick={handleRemoveClick}
          className="ml-1.5 -mr-1 p-0.5 rounded-full hover:bg-orange-400 focus:outline-none focus:ring-1 focus:ring-white"
          aria-label={`Remove filter ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </Badge>
  );
};

export default FilterChip;