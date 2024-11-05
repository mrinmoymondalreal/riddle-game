export default function Post() {
  return (
    <div className="flex w-max ml-auto">
      <div className="border flex-1 flex p-4 px-6 rounded-lg">
        <img
          src={"https://placehold.co/40x40"}
          alt="Profile picture of Shigeru Minamoto"
          className="h-10 max-w-full rounded-full mr-4"
        />
        <div className="w-full space-y-1">
          <a href="#" className="group flex items-center ">
            <span className="group-hover:underline font-medium">
              Mrinmoy Mondal
            </span>
            <span className="text-sm text-gray-600">&nbsp;- 12 Jun, 2024</span>
          </a>
          <div>
            <div className="message">Hello World</div>
            <div className="rounded-md overflow-hidden">
              <img src="https://placehold.co/400x400" alt="" />
            </div>
          </div>
          <div id="actions" className="flex justify-between w-full">
            <div className="flex">
              <div className="flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-black/40 gap-x-2">
                <i className="fas fa-arrow-up"></i>
                <span>24</span>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center hover:bg-black/30 aspect-square h-8 rounded-full">
                <i className="fas fa-copy"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
