import React, { useState } from 'react';
import { useArticles } from "../context/ArticlesContext";
import { convertTimestampToDate } from "../config/article";


export default function List() {
  const { articles } = useArticles();
  const [activeTab, setActiveTab] = useState('Published');

  const publishedArticles = articles.filter(
    (article) => article.status === "published"
  );
  const publishedCount = publishedArticles.length;

  const drafts = articles.filter(
    (article) => article.status.trim().toLowerCase() === "draft"
  );
  const draftCount = drafts.length;

  const tabs = [
    { name: "Published", count: publishedCount },
    { name: "Drafts", count: draftCount },
  ];

  return (
    <div className="mx-auto max-w-6xl  px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-2xl divide-neutral-200 divide-y">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                aria-current={activeTab === tab.name ? "page" : undefined}
                className={`flex whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium 
                  ${activeTab === tab.name ? 'border-yellow-600 text-yellow-600' : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700'}`}
              >
                {tab.name}
                <span
                  className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block 
                    ${activeTab === tab.name ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-900'}`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
        {/* Content */}
        <div className="mx-auto divide-neutral-200 divide-y">
          {(activeTab === 'Published' ? publishedArticles : drafts).map((post) => (
            <article
              key={post._id}
              className="flex mx-auto flex-col items-start justify-between py-6 cursor-pointer hover:bg-neutral-100"
            >
              <h3 className="text-base font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href={post.href}>{post.title}</a>
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                {post.description}
              </p>
              <div className="flex items-center gap-x-4 text-xs leading-6">
                <time dateTime={post.updatedAt} className="text-gray-500">
                  {convertTimestampToDate(post.updatedAt).datetime}
                </time>
              </div>
              <div className="flex gap-2">
                {post.categories.map((category) => (
                  <span key={category} className="font-medium text-xs leading-6 text-neutral-400">
                    {category}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
