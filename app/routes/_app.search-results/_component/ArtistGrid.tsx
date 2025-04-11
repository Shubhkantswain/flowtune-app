import { useState } from 'react';

export default function ArtistsGrid() {
    const [artists] = useState([
        {
          id: 1,
          name: 'Imran Khan',
          role: 'Artist',
          image: 'https://m.media-amazon.com/images/I/41s1sa+DhML._SX354_SY354_BL0_QL100__UX250_FMwebp_QL85_.jpg'
        },
        {
          id: 2,
          name: 'Ikka',
          role: 'Artist',
          image: 'https://m.media-amazon.com/images/I/41s1sa+DhML._SX354_SY354_BL0_QL100__UX250_FMwebp_QL85_.jpg'
        },
        {
          id: 3,
          name: 'Imagine Dragons',
          role: 'Artist',
          image: 'https://m.media-amazon.com/images/I/41s1sa+DhML._SX354_SY354_BL0_QL100__UX250_FMwebp_QL85_.jpg'
        },
        {
          id: 4,
          name: 'Indresh Upadhyay',
          role: 'Artist',
          image: 'https://m.media-amazon.com/images/I/41s1sa+DhML._SX354_SY354_BL0_QL100__UX250_FMwebp_QL85_.jpg'
        },
        {
          id: 5,
          name: 'Ikky',
          role: 'Artist',
          image: 'https://m.media-amazon.com/images/I/41s1sa+DhML._SX354_SY354_BL0_QL100__UX250_FMwebp_QL85_.jpg'
        }
      ]);

  return (
    <div className="text-white p-6 w-full">
      <h2 className="text-2xl font-bold mb-6">Artists</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {artists.map((artist) => (
          <div key={artist.id} className="flex flex-col items-center group cursor-pointer">
            <div className="relative mb-4 overflow-hidden rounded-full">
              <img 
                src={artist.image} 
                alt={artist.name}
                className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium text-center text-lg">{artist.name}</h3>
            <p className="text-gray-400 text-sm text-center">{artist.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}