interface DropdownMenuProps {
    items: string[];
    show: boolean;
  }
  
 export  const DropdownMenu: React.FC<DropdownMenuProps> = ({ items, show }) => {
    if (!show) return null;
  
    return (
      <div className="absolute z-10 -translate-x-1/2 left-1/2 bottom-full mb-2 w-48 rounded-md bg-gradient-to-b from-neutral-950 to-neutral-900 border border-[#2E3030] shadow-lg overflow-hidden">
        {items.map((item, index) => (
          <button
            key={index}
            className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-[#1E1E1E] border-b border-[#2E3030] last:border-b-0"
          >
            {item}
          </button>
        ))}
      </div>
    );
  };
  