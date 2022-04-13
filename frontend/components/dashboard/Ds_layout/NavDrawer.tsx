import * as React from 'react';

const lgStyle = {
  flexGrow: 1,
  background: "-webkit-linear-gradient(180deg, rgba(230, 0, 40, 0.723958) 0%, #F4B30B 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  TextFillColor: 'transparent',
  letterSpacing: '0.1rem',
  fontSize: 33,
  fontWeight: 800,
  fontStyle: 'normal',
  fontFamily: 'Caveat Brush',
} as const;

type Props = {
  children: React.ReactNode;
};

export default function NavDrawer({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/> 
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none ">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div> 
          <div className="flex-1 px-2 mx-2" style={lgStyle}>HACKERMIT</div>
          <div className="flex-none lg:block">
            {/*<ul className="menu menu-horizontal">
              <li><a>Navbar Item 1</a></li>
              <li><a>Navbar Item 2</a></li>
            </ul>*/}
          </div>
        </div>
        <main>{children}</main>
      </div> 
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-52 bg-base-100">
          <li>
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>            
            </label>
          </li>
          <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                Sidebar Item 1
              </a>
          </li>
          <li><a>Sidebar Item 2</a></li>
          <li>
            <div className="dropdown dropdown-right dropdown-hover">
              <label tabIndex={0} className="text m-1">Hover</label>
              <ul tabIndex={0} className="ml-2 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
