import React from 'react';
import { ExploreItem } from '~/types';

interface ExploreSearchItemProps {
  item: ExploreItem;
  index: string;
}

const ExploreSearchItem: React.FC<ExploreSearchItemProps> = ({ item }) => {
  return (
    <div
      className={`
        ${item.color} 
        rounded-lg p-4 h-28 
        relative overflow-hidden cursor-pointer 
        transition-transform hover:scale-105 shadow-lg
      `}
    >
      <div className="flex flex-col justify-between h-full">
        <h2 className="text-base font-semibold">{item.title}</h2>
        <div className="
          bg-white/20 backdrop-blur-2xl 
          w-14 h-14 flex items-center justify-center 
          rounded-md transform rotate-12 absolute bottom-2 right-2
        ">
          {item.svg}
        </div>
      </div>
    </div>
  );
};

export default ExploreSearchItem;
