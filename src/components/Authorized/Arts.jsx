import { Link } from "react-router-dom";

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 4,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  // More posts...
];

export default function Arts() {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div>
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between border-b border-gray-200 pt-6 p-4 cursor-pointer hover:bg-neutral-100"
            >
              <div className="flex gap-4">
                <div className="">
                  <div className="group relative">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {post.description}
                    </p>

                    {/* <Link
                      to={post.category.href}
                      className="relative z-10 rounded-full bg-neutral-200 px-3 py-1.5 font-medium text-xs leading-6 text-neutral-600 hover:bg-neutral-200"
                    >
                      {post.category.title}
                    </Link> */}
                  </div>
                  <div className="relative mt-4 flex items-center gap-x-4">
                    <img
                      src={post.author.imageUrl}
                      alt=""
                      className="h-10 w-10 rounded-lg bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-x-4 text-xs leading-6">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                  </div>
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-36 lg:shrink-0 h-32">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// {/* <div className="mx-auto  px-4 pt-8 sm:px-6 lg:px-8">
//               <div className="flex">
//                 <h1 className="flex-1 text-2xl font-bold text-gray-900">
//                   Photos
//                 </h1>
//                 <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
//                   <button
//                     type="button"
//                     className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
//                   >
//                     <Bars4Icon className="h-5 w-5" aria-hidden="true" />
//                     <span className="sr-only">Use list view</span>
//                   </button>
//                   <button
//                     type="button"
//                     className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
//                   >
//                     <Squares2X2IconMini
//                       className="h-5 w-5"
//                       aria-hidden="true"
//                     />
//                     <span className="sr-only">Use grid view</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Tabs */}
//               <div className="mt-3 sm:mt-2">
//                 <div className="sm:hidden">
//                   <label htmlFor="tabs" className="sr-only">
//                     Select a tab
//                   </label>
//                   {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
//                   <select
//                     id="tabs"
//                     name="tabs"
//                     className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-inset focus:ring-yellow-600"
//                     defaultValue="Recently Viewed"
//                   >
//                     <option>Recently Viewed</option>
//                     <option>Recently Added</option>
//                     <option>Favorited</option>
//                   </select>
//                 </div>
//                 <div className="hidden sm:block">
//                   <div className="flex items-center border-b border-gray-200">
//                     <nav
//                       className="-mb-px flex flex-1 space-x-6 xl:space-x-8"
//                       aria-label="Tabs"
//                     >
//                       {tabs.map((tab) => (
//                         <a
//                           key={tab.name}
//                           href={tab.href}
//                           aria-current={tab.current ? "page" : undefined}
//                           className={classNames(
//                             tab.current
//                               ? "border-yellow-500 text-yellow-600"
//                               : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
//                             "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
//                           )}
//                         >
//                           {tab.name}
//                         </a>
//                       ))}
//                     </nav>
//                     <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">
//                       <button
//                         type="button"
//                         className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
//                       >
//                         <Bars4Icon className="h-5 w-5" aria-hidden="true" />
//                         <span className="sr-only">Use list view</span>
//                       </button>
//                       <button
//                         type="button"
//                         className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
//                       >
//                         <Squares2X2IconMini
//                           className="h-5 w-5"
//                           aria-hidden="true"
//                         />
//                         <span className="sr-only">Use grid view</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Gallery */}
//               <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
//                 <h2 id="gallery-heading" className="sr-only">
//                   Recently viewed
//                 </h2>
//                 <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//                   {files.map((file) => (
//                     <li key={file.name} className="relative">
//                       <div
//                         className={classNames(
//                           file.current
//                             ? "ring-2 ring-yellow-500 ring-offset-2"
//                             : "focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100",
//                           "aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100"
//                         )}
//                       >
//                         <img
//                           src={file.source}
//                           alt=""
//                           className={classNames(
//                             file.current ? "" : "group-hover:opacity-75",
//                             "pointer-events-none object-cover"
//                           )}
//                         />
//                         <button
//                           type="button"
//                           className="absolute inset-0 focus:outline-none"
//                         >
//                           <span className="sr-only">
//                             View details for {file.name}
//                           </span>
//                         </button>
//                       </div>
//                       <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
//                         {file.name}
//                       </p>
//                       <p className="pointer-events-none block text-sm font-medium text-gray-500">
//                         {file.size}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </section>
//             </div> */}
