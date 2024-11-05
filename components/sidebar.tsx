export function FSBItem({
  name,
  link,
  image,
}: {
  name: string;
  link: string;
  image?: string;
}) {
  return (
    <a href={link} className="group">
      <li className="flex items-center mb-4">
        <img
          src={image || "https://placehold.co/32x32"}
          alt="Profile picture of Shigeru Minamoto"
          className="w-8 h-8 rounded-full mr-4"
        />
        <span className="group-hover:underline">{name}</span>
      </li>
    </a>
  );
}

export function FollowingSideBar() {
  return (
    <div>
      <h2 className="font-semibold mb-4">Followings</h2>
      <ul>
        <FSBItem
          name="Shigeru Minamoto"
          image="https://placehold.co/32x32"
          link=""
        />
        <FSBItem
          name="Charlie Zaplin"
          image="https://placehold.co/32x32"
          link=""
        />
        <FSBItem
          name="Pope Prancis"
          image="https://placehold.co/32x32"
          link=""
        />
        <FSBItem
          name="Donald Grump"
          image="https://placehold.co/32x32"
          link=""
        />
        <FSBItem
          name="Elvis Parsley"
          image="https://placehold.co/32x32"
          link=""
        />
      </ul>
    </div>
  );
}

export function TSBItem({ name, link }: { name: string; link: string }) {
  return (
    <a href={link} className="group">
      <li className="flex items-center mb-4">
        <span className="group-hover:underline">{name}</span>
        <span className="text-xs text-gray-600">&nbsp;- Entertainment</span>
      </li>
    </a>
  );
}

export function TrendingSideBar() {
  return (
    <div className="mb-8">
      <h2 className="font-semibold mb-4">Trending</h2>
      <ul>
        <TSBItem name="#ShigeruMinamoto" link="" />
        <TSBItem name="Charlie Zaplin" link="" />
        <TSBItem name="Pope Prancis" link="" />
        <TSBItem name="Donald Grump" link="" />
        <TSBItem name="Elvis Parsley" link="" />
      </ul>
    </div>
  );
}
