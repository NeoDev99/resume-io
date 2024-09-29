// app/resume/FormSteps/WorkExperience.tsx

import { useState } from 'react';
import { WorkExperience as WorkExperienceType } from '../types'; // Adjust import path

interface WorkExperienceProps {
  onChange: (data: { experiences: WorkExperienceType[] }) => void;
}

const WorkExperience = ({ onChange }: WorkExperienceProps) => {
  const [experiences, setExperiences] = useState<WorkExperienceType[]>([{ title: '', company: '', startDate: '', endDate: '' }]);

  const handleExperienceChange = (index: number, field: keyof WorkExperienceType, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
    onChange({ experiences: updatedExperiences });
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', startDate: '', endDate: '' }]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      {experiences.map((experience, index) => (
        <div className="mb-4" key={index}>
          <input
            type="text"
            value={experience.title}
            onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Job Title"
          />
          <input
            type="text"
            value={experience.company}
            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="Company"
          />
          <input
            type="text"
            value={experience.startDate}
            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="Start Date"
          />
          <input
            type="text"
            value={experience.endDate}
            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="End Date"
          />
        </div>
      ))}
      <button onClick={addExperience} className="bg-blue-600 text-white p-2 rounded">Add Experience</button>
    </div>
  );
};

export default WorkExperience;
