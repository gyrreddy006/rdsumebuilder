import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { usePortfolio, TemplateData } from '../context/PortfolioContext';

const TemplateSelection = () => {
  const { selectedTemplate, setSelectedTemplate } = usePortfolio();
  const navigate = useNavigate();
  
  // Template options
  const templates: TemplateData[] = [
    {
      id: 'minimal',
      name: 'Minimal',
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Clean, minimalist design with a focus on content and readability.'
    },
    {
      id: 'creative',
      name: 'Creative',
      thumbnail: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Bold, artistic layout ideal for designers and creative professionals.'
    },
    {
      id: 'professional',
      name: 'Professional',
      thumbnail: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Classic, business-oriented design perfect for corporate roles.'
    },
    {
      id: 'developer',
      name: 'Developer',
      thumbnail: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Tech-focused layout with code styling and project showcases.'
    },
    {
      id: 'modern',
      name: 'Modern',
      thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Contemporary design with smooth animations and trendy elements.'
    },
    {
      id: 'academic',
      name: 'Academic',
      thumbnail: 'https://images.pexels.com/photos/5428002/pexels-photo-5428002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Structured layout ideal for researchers, professors, and students.'
    }
  ];

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/data-entry');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select a template that best represents your style and professional identity. You'll be able to customize it in the next step.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedTemplate(template)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate?.id === template.id && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors duration-300 ${
              selectedTemplate
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;