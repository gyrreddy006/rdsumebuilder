import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our portfolio data
export interface UserData {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
  skills: string[];
  experiences: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    image: string;
  }[];
}

export interface TemplateData {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

interface PortfolioContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  selectedTemplate: TemplateData | null;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateData | null>>;
  resumeFile: File | null;
  setResumeFile: React.Dispatch<React.SetStateAction<File | null>>;
  generatedCode: {
    html: string;
    css: string;
    js: string;
  };
  setGeneratedCode: React.Dispatch<React.SetStateAction<{
    html: string;
    css: string;
    js: string;
  }>>;
  resetPortfolio: () => void;
}

const defaultUserData: UserData = {
  name: '',
  title: '',
  about: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  linkedin: '',
  github: '',
  twitter: '',
  skills: [],
  experiences: [],
  education: [],
  projects: []
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState({
    html: '',
    css: '',
    js: ''
  });

  const resetPortfolio = () => {
    setUserData(defaultUserData);
    setSelectedTemplate(null);
    setResumeFile(null);
    setGeneratedCode({
      html: '',
      css: '',
      js: ''
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        userData,
        setUserData,
        selectedTemplate,
        setSelectedTemplate,
        resumeFile,
        setResumeFile,
        generatedCode,
        setGeneratedCode,
        resetPortfolio
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};