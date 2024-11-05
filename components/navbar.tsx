import Link from "next/link";

function NavbarItem({
  name,
  icon,
  link,
  number,
}: {
  name: string;
  icon: string;
  link: string;
  number?: number;
}) {
  return (
    <Link href={link}>
      <li className="flex items-center px-3 rounded-lg transition-all py-2 hover:bg-black hover:text-white">
        <i className={"fas text-xl flex-[0.7] " + icon}></i>
        <span className="font-semibold flex-[2]">{name}</span>
        <span className="flex-1 flex justify-end">
          {number && (
            <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {number}
            </span>
          )}
        </span>
      </li>
    </Link>
  );
}

export default function Navbar() {
  return (
    <nav className="mb-8">
      <ul>
        <NavbarItem name="Feed" link="#" icon="fa-rss" />
        <NavbarItem name="Profile" link="/profile" icon="fa-user" />
        <NavbarItem
          name="Friends"
          link="#"
          icon="fa-user-friends"
          number={25}
        />
        <NavbarItem name="Community" link="#" icon="fa-users" />
      </ul>
    </nav>
  );
}
