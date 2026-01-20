'use client';

import {
  Suspense,
  use,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import CarAdvert from './CarAdvert';
import { fetchMockCars } from '../data/mockCars';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Create the promise outside the component so it's stable across renders
const carsPromise = fetchMockCars();

const FUEL_TYPES = Object.freeze(['Petrol', 'Diesel', 'Hybrid', 'Electric']);

type SortOption = {
  text: string;
  value: 'price-asc' | 'price-desc';
};

const SORT_OPTIONS: SortOption[] = [
  { text: 'Price: Low to High', value: 'price-asc' },
  { text: 'Price: High to Low', value: 'price-desc' },
];

type CarListProps = {
  searchTerm?: string;
  maxPrice?: number;
  fuelType?: string;
  sortOption?: SortOption;
  onCarResultsChange?: (count: number) => void;
};

function CarList({
  searchTerm,
  maxPrice,
  fuelType,
  sortOption,
  onCarResultsChange,
}: CarListProps) {
  // The use hook suspends the component until the promise resolves
  const cars = use(carsPromise);

  const filteredAndSortedCars = cars
    .filter((car) =>
      searchTerm
        ? car.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true,
    )
    .filter((car) => (maxPrice ? car.price <= maxPrice : true))
    .filter((car) =>
      fuelType && fuelType !== 'All' ? car.fuelType === fuelType : true,
    )
    .sort((a, b) => {
      if (sortOption?.value === 'price-asc') {
        return a.price - b.price;
      } else if (sortOption?.value === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  useEffect(() => {
    if (onCarResultsChange) {
      onCarResultsChange(filteredAndSortedCars.length);
    }
  }, [filteredAndSortedCars, onCarResultsChange]);

  return (
    <>
      {filteredAndSortedCars.length > 0 ? (
        filteredAndSortedCars.map((car) => (
          <CarAdvert
            key={car.id}
            car={car}
          />
        ))
      ) : (
        <div className='text-center text-gray-600 mt-12'>
          <p>No cars found!</p>
          <p>Please adjust your filters.</p>
        </div>
      )}
    </>
  );
}

export default function Buy() {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchInput = useDeferredValue(searchTerm);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [fuelType, setFuelType] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS[0]);
  const [carResultsNumber, setCarResultsNumber] = useState(0);

  const onMaxPriceChange = (price: number | undefined) => {
    if (price === undefined || isNaN(price)) {
      setMaxPrice(undefined);
      return;
    }
    setMaxPrice(price);
  };

  const onCarResultsChange = useCallback((count: number) => {
    setCarResultsNumber(count);
  }, []);

  return (
    <div className='min-h-screen bg-zinc-50 font-sans'>
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-4xl font-semibold mb-8'>Cars to buy</h2>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='w-full lg:w-64'>
            <h2 className='text-2xl font-semibold'>Filters</h2>
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
                  value={fuelType}
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
          <div className='flex flex-col w-full gap-6'>
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
                <div className='flex justify-between items-center'>
                  <div className='text-lg font-medium text-gray-700'>
                    Showing {carResultsNumber} ad
                    {carResultsNumber !== 1 ? 's' : ''} for{' '}
                    {deferredSearchInput
                      ? `"${deferredSearchInput}"`
                      : 'All Cars'}{' '}
                    in Ireland
                  </div>
                  <div className='flex items-center text-sm text-gray-500'>
                    <label htmlFor='select-sort'>Sort by: </label>
                    <select
                      id='select-sort'
                      className='ml-2 p-1 border border-gray-300 rounded bg-white'
                      value={sortOption.value}
                      onChange={(e) =>
                        setSortOption(
                          SORT_OPTIONS.find(
                            (option) => option.value === e.target.value,
                          )!,
                        )
                      }
                    >
                      {SORT_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <CarList
                  searchTerm={deferredSearchInput}
                  maxPrice={maxPrice}
                  fuelType={fuelType}
                  sortOption={sortOption}
                  onCarResultsChange={onCarResultsChange}
                />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
