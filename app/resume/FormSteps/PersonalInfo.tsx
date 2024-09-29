import { useState, useEffect } from "react";

interface PersonalInfoProps {
  onChange: (data: { name: string; email: string; phone: string }) => void;
}

const PersonalInfo = ({ onChange }: PersonalInfoProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Include onChange in the dependency array
  useEffect(() => {
    onChange({ name, email, phone });
  }, [name, email, phone, onChange]); // Added onChange here

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="mb-4">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded w-full p-2"
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
