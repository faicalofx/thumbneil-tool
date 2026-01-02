
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <h1 className="text-5xl font-black mb-8">About <span className="gradient-text">StatStream</span></h1>
      
      <div className="prose prose-invert max-w-none space-y-8 text-gray-300 leading-relaxed">
        <p className="text-xl">
          StatStream was born out of frustration. As creators ourselves, we spent hundreds of hours designing thumbnails only to see them fail on the home page. We realized that while design is subjective, <strong>clicks are data.</strong>
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Our Expertise</h2>
          <p>
            Our team consists of veteran YouTube strategists, data scientists, and UI/UX specialists who have collectively managed over 200M subscribers worth of channel growth. We've distilled years of A/B testing data into a proprietary AI model that understands human visual psychology.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="p-8 glass rounded-2xl border-white/5">
            <h3 className="text-white font-bold text-xl mb-4">Experience</h3>
            <p className="text-sm">Over 15 years in digital marketing and video content distribution analytics.</p>
          </div>
          <div className="p-8 glass rounded-2xl border-white/5">
            <h3 className="text-white font-bold text-xl mb-4">Trust</h3>
            <p className="text-sm">Trusted by 100+ agencies to validate thumbnail concepts before expensive production.</p>
          </div>
        </section>

        <p>
          We believe every creator deserves an objective second opinion. StatStream AI isn't here to replace the designer; it's here to give the designer the edge they need in an increasingly competitive algorithm.
        </p>
      </div>
    </div>
  );
};

export default About;
