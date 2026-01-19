import Image from 'next/image';
import { mockCars } from './data/mockCars';
import { mockDealers } from './data/mockDealers';
import { mockCategories } from './data/mockCategories';

export default function Home() {
  return (
    <div className='min-h-screen bg-zinc-50 font-sans'>
      {/* Hero Section */}
      <section className='relative w-full h-64 bg-gray-200 flex items-center justify-center'>
        <Image
          src='/banner/motor-large.jpeg'
          alt='Hero Car'
          fill
          style={{ objectFit: 'cover', opacity: 1 }}
        />
        <div className='absolute z-10 text-center'>
          <h1 className='text-4xl font-bold text-white drop-shadow-lg'>
            Buying a car should feel this good
          </h1>
          <div className='mt-4 bg-white/90 rounded-lg p-4 inline-block'>
            {/* Simple Search/Filter Form */}
            <form className='flex gap-2'>
              <select className='p-2 rounded border'>
                <option>All Makes</option>
                {[...new Set(mockCars.map((car) => car.make))].map((make) => (
                  <option key={make}>{make}</option>
                ))}
              </select>
              <select className='p-2 rounded border'>
                <option>All Models</option>
                {[...new Set(mockCars.map((car) => car.model))].map((model) => (
                  <option key={model}>{model}</option>
                ))}
              </select>
              <button
                type='submit'
                className='bg-blue-600 text-white px-4 py-2 rounded'
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Browse by Category</h2>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {mockCategories.map((cat) => (
            <div
              key={cat.id}
              className='flex flex-col items-center p-4 bg-white rounded shadow'
            >
              <Image
                src={cat.icon}
                alt={cat.name}
                width={40}
                height={40}
              />
              <span className='mt-2 font-medium'>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Dealers Section */}
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Featured Dealers</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {mockDealers
            .filter((d) => d.featured)
            .map((dealer) => (
              <div
                key={dealer.id}
                className='flex items-center bg-white rounded shadow p-4'
              >
                <Image
                  src={dealer.logo}
                  alt={dealer.name}
                  width={60}
                  height={60}
                  className='rounded-full'
                />
                <div className='ml-4'>
                  <div className='font-bold'>{dealer.name}</div>
                  <div className='text-sm text-gray-500'>
                    Stock: {dealer.stock}
                  </div>
                  <div className='text-sm text-gray-500'>
                    Location: {dealer.location}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Recent Ads Section */}
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Recent Ads</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {mockCars.map((car) => (
            <div
              key={car.id}
              className='bg-white rounded shadow p-4 flex flex-col items-center'
            >
              <Image
                src={car.image}
                alt={car.title}
                width={180}
                height={120}
                className='rounded'
              />
              <div className='mt-2 font-bold'>{car.title}</div>
              <div className='text-sm text-gray-500'>
                {car.year} • {car.make} • {car.model}
              </div>
              <div className='text-blue-600 font-semibold mt-1'>
                €{car.price.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
