import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  education: string;
  skills: string;
}

interface ResumeFormProps {
  onChange: (data: FormData) => void; // Specify the type for the onChange function
}

const ResumeForm = ({ onChange }: ResumeFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onChange(updatedFormData); // Pass updated data to parent
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resume Form</h2>
      <form>
        <div className="mb-4">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} // Ensure handleChange is used here
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Experience</label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label>Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
          />
        </div>
      </form>
    </div>
  );
};

export default ResumeForm;
