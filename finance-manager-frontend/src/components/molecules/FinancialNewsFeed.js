import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:4008/api/news-feed';

const FinancialNewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError('Failed to fetch news feed.');
      }
      setLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="rounded-2xl shadow-xl bg-white/40 backdrop-blur-md p-6 w-full max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Personalized Financial News Feed</h2>
      <div className="mb-4 text-gray-700">Stay informed with curated news and tips tailored to your financial journey.</div>
      {loading && <div className="text-blue-600">Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      <ul className="space-y-6">
        {articles.map(article => (
          <li key={article.id} className="p-4 rounded-xl bg-white/70 shadow flex flex-col md:flex-row md:items-center gap-4 border-l-4 border-blue-400">
            <img src={article.image} alt={article.title} className="w-24 h-24 object-cover rounded-lg shadow" />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 text-lg mb-1">{article.title}</div>
              <div className="text-xs text-gray-500 mb-2">{article.summary}</div>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition text-xs">
                Read More
              </a>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-gray-600 text-sm">
        <span>Tip: Check your news feed regularly for new ways to save, invest, and grow!</span>
      </div>
    </div>
  );
};

export default FinancialNewsFeed;
