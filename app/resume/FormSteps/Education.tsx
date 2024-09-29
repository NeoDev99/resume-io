// app/resume/FormSteps/Education.tsx

import { useState } from 'react';
import { Education as EducationType } from '../types'; // Adjust import path

interface EducationProps {
  onChange: (data: { education: EducationType[] }) => void;
}

const Education = ({ onChange }: EducationProps) => {
  const [education, setEducation] = useState<EducationType[]>([{ degree: '', school: '', startDate: '', endDate: '' }]);

  const handleEducationChange = (index: number, field: keyof EducationType, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
    onChange({ education: updatedEducation });
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', school: '', startDate: '', endDate: '' }]);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Education</h2>
      {education.map((edu, index) => (
        <div className="mb-4" key={index}>
          <input
            type="text"
            value={edu.degree}
            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Degree"
          />
          <input
            type="text"
            value={edu.school}
            onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="School"
          />
          <input
            type="text"
            value={edu.startDate}
            onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="Start Date"
          />
          <input
            type="text"
            value={edu.endDate}
            onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-2"
            placeholder="End Date"
          />
        </div>
      ))}
      <button onClick={addEducation} className="bg-blue-600 text-white p-2 rounded">Add Education</button>
    </div>
  );
};

export default Education;
