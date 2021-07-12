import Link from 'next/link';

const Nav = () => {
  const navItems = [
    { path: '/', text: 'Home' },
    { path: '', text: 'STYLES' },
    { path: '/styles', text: 'All styles' },
    { path: '/styles/add', text: 'Add a style' },
    { path: '', text: 'SONGS' },
    { path: '/songs', text: 'All songs' },
    { path: '/songs/add', text: 'Add a song' },
    { path: '/songs/search', text: 'Song search' },
  ];

  return (
    <div className='absolute inset-y-0 left-0 w-40 p-4 mt-10 navMenu'>
      <ul className='text-sm'>
        {navItems.map((navItem, index) =>
          navItem.path ? (
            <li className={index > 0 ? 'ml-2' : ''} key={index}>
              <Link href={navItem.path}>{navItem.text}</Link>
            </li>
          ) : (
            <div key={index} className='cursor-default w-28 category'>
              <div className='absolute z-10 flex justify-center w-28'>
                <div className='px-2 text-xs bg-white'>{navItem.text}</div>
              </div>
            </div>
          )
        )}
      </ul>
    </div>
  );
};

export default Nav;
