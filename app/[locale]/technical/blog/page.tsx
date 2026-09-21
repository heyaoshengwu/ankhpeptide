interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: string;
  category: string;
  readTime: string;
  date: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Emerging Applications of Peptides in Drug Discovery",
    excerpt: "Peptides are increasingly recognized as valuable therapeutic agents. This article explores recent advances in peptide-based drug development and future directions.",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Scientific Officer",
    category: "Drug Discovery",
    readTime: "12 min read",
    date: "2026-05-05",
    featured: true
  },
  {
    id: "2",
    title: "The Rise of Cyclic Peptides in Targeted Therapy",
    excerpt: "Cyclic peptides offer improved stability and target affinity compared to linear peptides. Learn about recent breakthroughs in cyclic peptide therapeutics.",
    author: "Dr. Michael Roberts",
    authorRole: "Research Director",
    category: "Therapeutics",
    readTime: "10 min read",
    date: "2026-04-28"
  },
  {
    id: "3",
    title: "Peptide-Based Vaccines: A New Frontier",
    excerpt: "Synthetic peptide vaccines represent a promising approach for infectious diseases and cancer immunotherapy. Current progress and challenges discussed.",
    author: "Dr. Emily Zhang",
    authorRole: "Immunology Lead",
    category: "Vaccines",
    readTime: "14 min read",
    date: "2026-04-20"
  },
  {
    id: "4",
    title: "AI-Assisted Peptide Design: Transforming Discovery",
    excerpt: "Machine learning algorithms are revolutionizing how we design novel peptides with improved properties and target specificity.",
    author: "Dr. James Wilson",
    authorRole: "Computational Biology",
    category: "Technology",
    readTime: "8 min read",
    date: "2026-04-15"
  },
  {
    id: "5",
    title: "Peptide Stability in Biological Systems",
    excerpt: "Understanding and improving peptide stability is crucial for therapeutic applications. Key strategies and recent research developments.",
    author: "Dr. Lisa Park",
    authorRole: "Biochemistry Lead",
    category: "Research",
    readTime: "11 min read",
    date: "2026-04-08"
  },
  {
    id: "6",
    title: "Large-Scale Peptide Manufacturing: Challenges and Solutions",
    excerpt: "Scaling up peptide synthesis for commercial production involves unique challenges. Industry best practices and technological advances.",
    author: "Dr. Robert Kim",
    authorRole: "Manufacturing Director",
    category: "Manufacturing",
    readTime: "9 min read",
    date: "2026-04-01"
  }
];

const categories = ["All Posts", "Drug Discovery", "Therapeutics", "Vaccines", "Technology", "Research", "Manufacturing"];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="technical-blog py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Technical Blog</h1>
          <p className="text-xl text-gray-600">
            Insights and updates from our scientific team on peptide research and industry developments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {featuredPost && (
          <article className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                  Featured
                </span>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium ml-2 mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                <p className="text-blue-100 mb-6 text-lg">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold">{featuredPost.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{featuredPost.author}</p>
                    <p className="text-sm text-blue-200">{featuredPost.authorRole}</p>
                  </div>
                  <span className="text-blue-200 ml-auto">{featuredPost.date}</span>
                </div>
              </div>
            </div>
          </article>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {regularPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-400 text-sm">{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">{post.author.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>
                <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-700">
                  Read More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
            Load More Posts
          </button>
        </div>
      </div>
    </div>
  );
}