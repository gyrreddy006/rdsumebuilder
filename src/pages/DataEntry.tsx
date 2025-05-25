import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight, PlusCircle, X, Save } from 'lucide-react';
import { usePortfolio, UserData } from '../context/PortfolioContext';

const DataEntry = () => {
  const { userData, setUserData, resumeFile, setResumeFile, selectedTemplate } = usePortfolio();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isUploading, setIsUploading] = useState(false);

  // Add an empty experience field
  const addExperience = () => {
    setUserData({
      ...userData,
      experiences: [
        ...userData.experiences,
        { company: '', position: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  // Remove an experience field
  const removeExperience = (index: number) => {
    const updatedExperiences = [...userData.experiences];
    updatedExperiences.splice(index, 1);
    setUserData({
      ...userData,
      experiences: updatedExperiences
    });
  };

  // Add an empty education field
  const addEducation = () => {
    setUserData({
      ...userData,
      education: [
        ...userData.education,
        { institution: '', degree: '', field: '', startDate: '', endDate: '' }
      ]
    });
  };

  // Remove an education field
  const removeEducation = (index: number) => {
    const updatedEducation = [...userData.education];
    updatedEducation.splice(index, 1);
    setUserData({
      ...userData,
      education: updatedEducation
    });
  };

  // Add an empty project field
  const addProject = () => {
    setUserData({
      ...userData,
      projects: [
        ...userData.projects,
        { title: '', description: '', technologies: [], link: '', image: '' }
      ]
    });
  };

  // Remove a project field
  const removeProject = (index: number) => {
    const updatedProjects = [...userData.projects];
    updatedProjects.splice(index, 1);
    setUserData({
      ...userData,
      projects: updatedProjects
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string,
    index?: number,
    field?: string
  ) => {
    const { name, value } = e.target;

    if (section && typeof index === 'number' && field) {
      // Handle nested objects (experiences, education, projects)
      const updatedSection = [...userData[section as keyof UserData]] as any[];
      updatedSection[index] = {
        ...updatedSection[index],
        [field]: value
      };

      setUserData({
        ...userData,
        [section]: updatedSection
      });
    } else {
      // Handle direct properties
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  // Handle skills input (comma-separated)
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setUserData({
      ...userData,
      skills: skillsArray
    });
  };

  // Handle project technologies input (comma-separated)
  const handleTechnologiesChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const technologiesArray = e.target.value.split(',').map(tech => tech.trim());
    const updatedProjects = [...userData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      technologies: technologiesArray
    };

    setUserData({
      ...userData,
      projects: updatedProjects
    });
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      
      // Simulate parsing the resume (in a real application, you would use a proper PDF parsing library)
      setIsUploading(true);
      setTimeout(() => {
        // This is just a mockup of what would happen after parsing
        // In a real application, you would extract this data from the resume
        setUserData({
          ...userData,
          name: 'John Doe',
          title: 'Full Stack Developer',
          about: 'Passionate developer with 5+ years of experience building web applications.',
          email: 'john.doe@example.com',
          skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'CSS', 'HTML'],
          experiences: [
            {
              company: 'Tech Solutions Inc.',
              position: 'Senior Developer',
              startDate: '2020-01',
              endDate: 'Present',
              description: 'Leading development of web applications using React and Node.js.'
            }
          ],
          education: [
            {
              institution: 'University of Technology',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              startDate: '2012-09',
              endDate: '2016-05'
            }
          ]
        });
        setIsUploading(false);
      }, 2000);
    }
  };

  const handleContinue = () => {
    navigate('/generate');
  };

  if (!selectedTemplate) {
    navigate('/templates');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Add Your Information</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below or upload your resume to automatically populate your portfolio.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Resume Upload</h2>
              <div className="relative">
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="resume-upload"
                  className="flex items-center space-x-2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-300"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Resume/LinkedIn PDF</span>
                </label>
              </div>
            </div>
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">Parsing document...</p>
              </div>
            )}
            {resumeFile && !isUploading && (
              <div className="mt-4 flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium">{resumeFile.name}</p>
                  <p className="text-xs text-gray-500">Successfully parsed</p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {['personal', 'skills', 'experience', 'education', 'projects'].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={userData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                    About Me
                  </label>
                  <textarea
                    id="about"
                    name="about"
                    rows={4}
                    value={userData.about}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={userData.linkedin}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      value={userData.github}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  id="skills"
                  value={userData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="JavaScript, React, Node.js, CSS, HTML"
                />
                {userData.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-8">
                {userData.experiences.map((experience, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      onClick={() => removeExperience(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <h3 className="font-medium mb-4">Experience #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          value={experience.company}
                          onChange={(e) => handleInputChange(e, 'experiences', index, 'company')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Position
                        </label>
                        <input
                          type="text"
                          value={experience.position}
                          onChange={(e) => handleInputChange(e, 'experiences', index, 'position')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={experience.startDate}
                          onChange={(e) => handleInputChange(e, 'experiences', index, 'startDate')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={experience.endDate}
                          onChange={(e) => handleInputChange(e, 'experiences', index, 'endDate')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Present"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={experience.description}
                        onChange={(e) => handleInputChange(e, 'experiences', index, 'description')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="flex items-center space-x-2 text-blue-600 font-medium"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Experience</span>
                </button>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-8">
                {userData.education.map((edu, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      onClick={() => removeEducation(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <h3 className="font-medium mb-4">Education #{index + 1}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institution
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleInputChange(e, 'education', index, 'institution')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleInputChange(e, 'education', index, 'degree')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleInputChange(e, 'education', index, 'field')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => handleInputChange(e, 'education', index, 'startDate')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => handleInputChange(e, 'education', index, 'endDate')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="flex items-center space-x-2 text-blue-600 font-medium"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Education</span>
                </button>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-8">
                {userData.projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                    <button
                      onClick={() => removeProject(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    <h3 className="font-medium mb-4">Project #{index + 1}</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleInputChange(e, 'projects', index, 'title')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => handleInputChange(e, 'projects', index, 'description')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Technologies Used (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={project.technologies.join(', ')}
                        onChange={(e) => handleTechnologiesChange(e, index)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Link
                        </label>
                        <input
                          type="url"
                          value={project.link}
                          onChange={(e) => handleInputChange(e, 'projects', index, 'link')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Project Image URL
                        </label>
                        <input
                          type="url"
                          value={project.image}
                          onChange={(e) => handleInputChange(e, 'projects', index, 'image')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProject}
                  className="flex items-center space-x-2 text-blue-600 font-medium"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>Add Project</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            <span>Generate Portfolio</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataEntry;