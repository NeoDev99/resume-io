import { FormData } from '@/app/resume/types'; // Adjust the import path if needed

interface ResumePreviewProps {
    data: FormData; // Define the type for the data prop
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
    return (
      <>
      <h2 className="text-xl font-bold my-4">Resume Preview</h2>
      <div className="p-4 border border-gray-300 rounded">
        <div>
          <h3 className="font-bold">{data.name}</h3>
          <p>Email: {data.email}</p>
          <p>Phone: {data.phone}</p>

          <h4 className="font-bold mt-4">Experience</h4>
          {data.experiences.map((experience, index) => (
            <p key={index}>
              {experience.title} at {experience.company} ({experience.startDate} - {experience.endDate})
            </p>
          ))}

          <h4 className="font-bold mt-4">Education</h4>
          {data.education.map((edu, index) => (
            <p key={index}>
              {edu.degree} from {edu.school} ({edu.startDate} - {edu.endDate})
            </p>
          ))}

          <h4 className="font-bold mt-4">Skills</h4>
          <div>
            {data.skills.map((skill, index) => (
              <p key={index}>{skill}</p> // Display each skill on a new line
            ))}
          </div>
        </div>
      </div>
      </>
    );
};

export default ResumePreview;
