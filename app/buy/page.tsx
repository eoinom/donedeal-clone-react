import CarAdvert from './CarAdvert';
import { mockCars } from '../data/mockCars';

export default function Buy() {
  return (
    <div className='min-h-screen bg-zinc-50 font-sans'>
      <section className='max-w-5xl mx-auto py-8'>
        <h2 className='text-2xl font-semibold mb-4'>Cars to buy</h2>
        <div className='flex flex-col gap-6'>
          {mockCars.map((car) => (
            <CarAdvert
              key={car.id}
              car={car}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
