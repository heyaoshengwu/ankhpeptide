interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Understanding Peptide Purity Grades and Applications",
    excerpt: "A comprehensive guide to different purity levels available for research peptides and how to select the appropriate grade for your application.",
    category: "Peptide Science",
    readTime: "8 min read",
    date: "2026-04-15"
  },
  {
    id: "2",
    title: "Solid-Phase Peptide Synthesis: Principles and Best Practices",
    excerpt: "Learn the fundamentals of SPPS, including resin selection, coupling strategies, and common pitfalls to avoid during synthesis.",
    category: "Synthesis Methods",
    readTime: "12 min read",
    date: "2026-04-10"
  },
  {
    id: "3",
    title: "Peptide Stability and Storage Guidelines",
    excerpt: "Essential recommendations for storing peptides to maintain integrity, including temperature, humidity, and reconstitution tips.",
    category: "Laboratory Practices",
    readTime: "6 min read",
    date: "2026-04-05"
  },
  {
    id: "4",
    title: "HPLC Purification Techniques for Complex Peptides",
    excerpt: "Advanced techniques for purifying difficult peptides, including gradient optimization and fraction collection strategies.",
    category: "Analytical Methods",
    readTime: "10 min read",
    date: "2026-03-28"
  },
  {
    id: "5",
    title: "Peptide Modifications: A Technical Overview",
    excerpt: "Comprehensive coverage of common peptide modifications including phosphorylation, acetylation, and cyclization methods.",
    category: "Peptide Engineering",
    readTime: "15 min read",
    date: "2026-03-20"
  },
  {
    id: "6",
    title: "Mass Spectrometry Analysis of Peptides",
    excerpt: "Guide to peptide characterization using MS techniques, including sample preparation and data interpretation.",
    category: "Analytical Methods",
    readTime: "9 min read",
    date: "2026-03-15"
  }
];

const categories = ["All", "Peptide Science", "Synthesis Methods", "Laboratory Practices", "Analytical Methods", "Peptide Engineering"];

export default function KnowledgePage() {
  return (
    <div className="knowledge-base py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive collection of scientific articles and technical resources.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-sm">{article.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.date}</span>
                  <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700">
                    Read Article
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}