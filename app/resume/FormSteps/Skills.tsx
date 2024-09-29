import { useState, useEffect } from 'react';

interface SkillsProps {
  onChange: (data: { skills: string[] }) => void;
}

const Skills = ({ onChange }: SkillsProps) => {
  const [skills, setSkills] = useState<string[]>(['']);

  useEffect(() => {
    onChange({ skills });
  }, [skills, onChange]); // Added onChange to the dependency array

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, '']);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Skills</h2>
      {skills.map((skill, index) => (
        <div className="mb-4" key={index}>
          <input
            type="text"
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Skill"
          />
        </div>
      ))}
      <button onClick={addSkill} className="bg-blue-600 text-white p-2 rounded">Add Skill</button>
    </div>
  );
};

export default Skills;
