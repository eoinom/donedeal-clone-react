import Image from 'next/image';
import { Car } from '../types';

type CarAdvertProps = {
  car: Car;
};

export default function CarAdvert({ car }: CarAdvertProps) {
  return (
    <div
      key={car.id}
      className='flex flex-col sm:flex-row w-full bg-white rounded shadow p-4'
    >
      <Image
        src={car.image}
        alt={car.title}
        width={180}
        height={120}
        className='w-full h-68 sm:w-90 object-cover rounded'
      />
      <div className='flex flex-col w-full sm:w-[calc(100%-22.5rem)] gap-y-3 p-4 pr-0 pb-0'>
        <div className='text-xl font-semibold'>{car.title}</div>
        <div className='text-sm text-gray-500'>
          {car.year} • {car.fuelType} • {car.location}
        </div>
        <div className='flex justify-between mt-auto'>
          <div className='text-3xl text-[#222831] font-semibold'>
            €{car.price.toLocaleString()}
          </div>
          <div>
            {/* Heart icon for adding as a favourite */}
            <button
              type='button'
              aria-label='Add to favourites'
              className='overflow-hidden rounded-3xl bg-white shadow-[0px_2px_8px_#6086e63d] p-3'
            >
              <svg
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
                data-testid='save'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.6'
                  d='M17.048 3C13.667 3 12 6.333 12 6.333S10.333 3 6.952 3C4.205 3 2.03 5.299 2.001 8.042c-.058 5.694 4.516 9.743 9.53 13.146a.833.833 0 00.938 0c5.013-3.403 9.587-7.452 9.53-13.146C21.972 5.299 19.796 3 17.049 3v0z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
