
import React from 'react';
import { DEFAULT_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">CTR <span className="gradient-text">Masterclass</span></h1>
          <p className="text-gray-400">The latest research on YouTube growth and visual design.</p>
        </div>
        <div className="flex space-x-2">
          {['All', 'Design', 'Case Studies', 'AI News'].map(cat => (
            <button key={cat} className="px-4 py-1.5 rounded-full border border-white/5 text-sm hover:bg-white hover:text-black transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {DEFAULT_POSTS.map(post => (
          <div key={post.id} className="glass rounded-3xl overflow-hidden border-white/5 group cursor-pointer hover:border-blue-500/50 transition-all">
            <div className="aspect-video overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-xs text-blue-400 font-bold uppercase tracking-widest">
                <span>{post.category}</span>
                <span className="text-gray-500">{post.date}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center text-xs text-gray-500">
                <div className="w-6 h-6 rounded-full bg-gray-800 mr-2"></div>
                By {post.author}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
