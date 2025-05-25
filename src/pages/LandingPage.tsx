import React from 'react';
import { Link } from 'react-router-dom';
import { Code, File, Layout, Download } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-3xl">
            Build Your Professional Portfolio Website in Minutes
          </h1>
          <p className="text-xl mb-8 max-w-2xl opacity-90">
            Select a template, add your information, and download your custom portfolio website code instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/templates"
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
            <a
              href="#how-it-works"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="h-10 w-10 text-blue-600 mb-4" />,
                title: 'Choose a Template',
                description:
                  'Browse our collection of professionally designed portfolio templates and select the one that best represents your style.',
              },
              {
                icon: <File className="h-10 w-10 text-blue-600 mb-4" />,
                title: 'Add Your Information',
                description:
                  'Fill out the form with your details or upload your resume or LinkedIn profile PDF to automatically populate your portfolio.',
              },
              {
                icon: <Download className="h-10 w-10 text-blue-600 mb-4" />,
                title: 'Get Your Code',
                description:
                  'Preview your portfolio and download the complete HTML, CSS, and JavaScript code to host it anywhere you want.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Professional Templates',
                description: 'Choose from multiple professionally designed templates optimized for showcasing your skills and projects.',
              },
              {
                title: 'Responsive Design',
                description: 'All templates are fully responsive and look great on any device, from mobile phones to large desktop screens.',
              },
              {
                title: 'Resume Parsing',
                description: 'Upload your resume or LinkedIn profile PDF to automatically extract your information and populate your portfolio.',
              },
              {
                title: 'Customizable',
                description: 'Easily customize colors, fonts, and layouts to match your personal brand and style preferences.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Portfolio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Start building your professional online presence today with our easy-to-use portfolio builder.
          </p>
          <Link
            to="/templates"
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors duration-300 shadow-lg inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;