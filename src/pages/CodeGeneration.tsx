import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Copy, Check, RefreshCw, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { generatePortfolioCode } from '../utils/codeGenerator';

const CodeGeneration = () => {
  const { userData, selectedTemplate, generatedCode, setGeneratedCode } = usePortfolio();
  const [activeTab, setActiveTab] = useState('preview');
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState({ html: false, css: false, js: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedTemplate) {
      navigate('/templates');
      return;
    }

    // Generate the code
    setIsGenerating(true);
    const code = generatePortfolioCode(userData, selectedTemplate);
    setGeneratedCode(code);
    setIsGenerating(false);
  }, [userData, selectedTemplate, setGeneratedCode, navigate]);

  const handleCopyCode = (type: 'html' | 'css' | 'js') => {
    navigator.clipboard.writeText(generatedCode[type]);
    setCopied({ ...copied, [type]: true });
    setTimeout(() => {
      setCopied({ ...copied, [type]: false });
    }, 2000);
  };

  const handleDownloadCode = (type: 'html' | 'css' | 'js') => {
    const element = document.createElement('a');
    const file = new Blob([generatedCode[type]], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `portfolio.${type}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadAll = () => {
    handleDownloadCode('html');
    setTimeout(() => handleDownloadCode('css'), 500);
    setTimeout(() => handleDownloadCode('js'), 1000);
  };

  const getPreviewContent = () => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${userData.name} - Portfolio</title>
        <style>${generatedCode.css}</style>
      </head>
      <body>
        ${generatedCode.html}
        <script>${generatedCode.js}</script>
      </body>
      </html>
    `;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Portfolio is Ready!</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Preview your portfolio and download the code to host it anywhere you want.
        </p>
      </div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center py-12">
          <RefreshCw className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <h2 className="text-xl font-semibold mb-2">Generating Your Portfolio</h2>
          <p className="text-gray-600">This will only take a moment...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'html'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('html')}
              >
                HTML
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'css'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('css')}
              >
                CSS
              </button>
              <button
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === 'js'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('js')}
              >
                JavaScript
              </button>
            </nav>
          </div>

          <div className="p-4">
            {activeTab === 'preview' && (
              <div className="h-[600px] border border-gray-200 rounded-lg">
                <iframe
                  srcDoc={getPreviewContent()}
                  className="w-full h-full"
                  title="Portfolio Preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {(activeTab === 'html' || activeTab === 'css' || activeTab === 'js') && (
              <div className="relative">
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => handleCopyCode(activeTab as 'html' | 'css' | 'js')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied[activeTab as 'html' | 'css' | 'js'] ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDownloadCode(activeTab as 'html' | 'css' | 'js')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors"
                    title="Download file"
                  >
                    <Download className="h-5 w-5" />
                  </button>
                </div>
                <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto text-sm h-[600px]">
                  <code>{generatedCode[activeTab as 'html' | 'css' | 'js']}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {!isGenerating && (
        <div className="flex justify-center">
          <button
            onClick={handleDownloadAll}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            <Layers className="h-5 w-5" />
            <span>Download All Files</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeGeneration;