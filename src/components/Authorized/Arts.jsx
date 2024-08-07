import { useArticles } from "../../context/ArticlesContext";
import { convertTimestampToDate } from "../../config/article";

export default function Arts() {
  const {articles} = useArticles();
  const publishedArticles = articles.filter(article => article.status === "published");

  // console.log(articles);
  return (
    <div className="mx-auto max-w-6xl lg:px-8">
      <div className="mx-auto max-w-2xl divide-neutral-200 divide-y">
      {publishedArticles.map((post) => (
          <article
            key={post._id}
            className="flex mx-auto max-w-xl flex-col items-start justify-between pt-6 p-4 cursor-pointer hover:bg-neutral-100"
          >
            <div className="flex gap-4">
                <div className="group relative">
                  <div className="relative mb-2 flex items-center gap-x-2">
                    <img
                      src={post.author.image}
                      alt=""
                      className="h-6 w-6 rounded-lg bg-gray-50"
                    />
                    <div className="text-xs leading-6">
                      <p className="font-medium text-gray-500">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                    </div>
                  </div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                  <div className="flex gap-2">
                    {
                      post.categories.map((category) => (
                        <span
                          key={category}
                          className="font-medium text-xs leading-6 text-neutral-400 "
                        >
                          {category}
                        </span>
                      ))
                    }
                  </div>
                </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-x-4 text-xs leading-6">
                  <time dateTime={post.updatedAt} className="text-gray-500">
                    {convertTimestampToDate(post.updatedAt).date}
                  </time>
                </div>
                <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-36 lg:shrink-0 h-28">
                  <img
                    src={post.coverImage}
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
  );
}
