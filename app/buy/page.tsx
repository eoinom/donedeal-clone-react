'use client';

import { Suspense, use } from 'react';
import CarAdvert from './CarAdvert';
import { fetchMockCars } from '../data/mockCars';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Create the promise outside the component so it's stable across renders
const carsPromise = fetchMockCars();

function CarList() {
  // The use hook suspends the component until the promise resolves
  const cars = use(carsPromise);

  return (
    <>
      {cars.map((car) => (
        <CarAdvert
          key={car.id}
          car={car}
        />
      ))}
    </>
  );
}

export default function Buy() {
  return (
    <div className='min-h-screen bg-zinc-50 font-sans'>
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Cars to buy</h2>
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className='w-full lg:w-64'>Filters</div>
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
                <CarList />
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
