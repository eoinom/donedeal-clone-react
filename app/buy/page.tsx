'use client';

import { Suspense, use, useDeferredValue, useState } from 'react';
import CarAdvert from './CarAdvert';
import { fetchMockCars } from '../data/mockCars';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Create the promise outside the component so it's stable across renders
const carsPromise = fetchMockCars();

type CarListProps = {
  searchTerm?: string;
  maxPrice?: number;
  fuelType?: string;
};

const FUEL_TYPES = Object.freeze(['Petrol', 'Diesel', 'Hybrid', 'Electric']);

function CarList({ searchTerm, maxPrice, fuelType }: CarListProps) {
  // The use hook suspends the component until the promise resolves
  const cars = use(carsPromise);

  const filteredCars = searchTerm
    ? cars.filter((car) =>
        car.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : cars;

  const filteredByPriceCars =
    maxPrice !== undefined
      ? filteredCars.filter((car) => car.price <= maxPrice)
      : filteredCars;

  const filteredByFuelTypeCars =
    fuelType && fuelType !== 'All'
      ? filteredByPriceCars.filter((car) => car.fuelType === fuelType)
      : filteredByPriceCars;
  return (
    <>
      {filteredByFuelTypeCars.map((car) => (
        <CarAdvert
          key={car.id}
          car={car}
        />
      ))}
    </>
  );
}

export default function Buy() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchInput = useDeferredValue(searchTerm);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [fuelType, setFuelType] = useState<string | undefined>(undefined);

  const onMaxPriceChange = (price: number | undefined) => {
    if (price === undefined || isNaN(price)) {
      setMaxPrice(undefined);
      return;
    }
    setMaxPrice(price);
  };

  return (
    <div className='min-h-screen bg-zinc-50 font-sans'>
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Cars to buy</h2>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='w-full lg:w-64'>
            <h2>Filters</h2>
            <div className='flex flex-col gap-y-4 bg-white rounded shadow mt-4 p-4'>
              {/* Search car titles by text input */}
              <div>
                <label
                  htmlFor='search'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Search
                </label>
                <input
                  type='text'
                  id='search'
                  name='search'
                  placeholder='Search by title'
                  className='w-full p-2 border border-gray-300 rounded'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Filter by maximum price (number input) */}
              <div>
                <label
                  htmlFor='maxPrice'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Max Price €
                </label>
                <input
                  type='text'
                  id='maxPrice'
                  name='maxPrice'
                  inputMode='numeric'
                  pattern='\d*'
                  autoComplete='off'
                  maxLength={10}
                  placeholder='e.g. 20,000'
                  className='w-full p-2 border border-gray-300 rounded'
                  value={maxPrice !== undefined ? `€${maxPrice}` : ''}
                  onChange={(e) =>
                    onMaxPriceChange(
                      e.target.value
                        ? Number(e.target.value.replace(/[^0-9]/g, ''))
                        : undefined,
                    )
                  }
                />
              </div>
              {/* Filter by fuel type */}
              <div>
                <label
                  htmlFor='fuelType'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Fuel Type
                </label>
                <select
                  id='fuelType'
                  name='fuelType'
                  className='w-full p-2 border border-gray-300 rounded bg-white'
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option key={'All'}>{'All'}</option>
                  {FUEL_TYPES.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full justify-center gap-6'>
            <Suspense
              fallback={
                <div className='text-2xl text-center font-semibold mt-12'>
                  Loading car adverts...
                </div>
              }
            >
              <ErrorBoundary
                fallback={
                  <div className='text-2xl text-center font-semibold mt-12'>
                    Failed to load car adverts. Please try again later.
                  </div>
                }
              >
                <CarList
                  searchTerm={deferredSearchInput}
                  maxPrice={maxPrice}
                  fuelType={fuelType}
                />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
