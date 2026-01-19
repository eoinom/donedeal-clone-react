import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className='w-full bg-white shadow flex items-center justify-between px-6 py-3 sticky top-0 z-20'>
      <div className='flex items-center gap-2'>
        <Link href='/'>
          <Image
            src='/logos/donedeal-logo-cars.svg'
            alt='DoneDeal Logo'
            width={120}
            height={32}
          />
        </Link>
      </div>
      <ul className='flex gap-6 text-base font-medium text-gray-700'>
        <li>
          <Link
            href='/buy'
            className='hover:text-blue-600'
          >
            Buy
          </Link>
        </li>
        <li>
          <a
            href='#'
            className='hover:text-blue-600'
          >
            Sell
          </a>
        </li>
        <li>
          <a
            href='#'
            className='hover:text-blue-600'
          >
            Research
          </a>
        </li>
        <li>
          <a
            href='#'
            className='hover:text-blue-600'
          >
            Find a dealership
          </a>
        </li>
      </ul>
      <div className='flex gap-3'>
        <button className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'>
          Place Ad
        </button>
        <button className='border border-blue-600 text-blue-600 px-4 py-1 rounded hover:bg-blue-50'>
          Sign up / Login
        </button>
      </div>
    </nav>
  );
}
