"use client"; // This line makes the component a Client Component

import { useState } from 'react';
import PersonalInfo from './FormSteps/PersonalInfo';
import WorkExperience from './FormSteps/WorkExperience';
import Education from './FormSteps/Education';
import Skills from './FormSteps/Skills';
import ResumePreview from '@/components/ResumePreview';
import { FaDownload, FaPrint, FaEnvelope } from 'react-icons/fa'; // Import the icons
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FormData } from '@/app/resume/types'; // Assuming this is where your types are

const steps = ['Personal Information', 'Work Experience', 'Education', 'Skills'];

const ResumePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    experiences: [], // Array to hold work experiences
    education: [],   // Array to hold education details
    skills: [],      // Array for skills
  });

  // Function to handle data changes from all form sections
  const handleDataChange = (data: Partial<FormData>) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handlePrint = () => {
    const printContent = document.getElementById('resume-content'); // Only the resume content
    const WindowPrint = window.open('', '',);

    if (WindowPrint && printContent) {
      WindowPrint.document.write('<html><head><title>Print Resume</title>');
      WindowPrint.document.write('<style>@media print { body { margin: 0; padding: 0; } }</style>');
      WindowPrint.document.write('</head><body>');
      WindowPrint.document.write(printContent.innerHTML);
      WindowPrint.document.write('</body></html>');
      WindowPrint.document.close();
      WindowPrint.focus();

      setTimeout(() => {
        WindowPrint.print();
        WindowPrint.close();
      }, 500); // 500ms delay, adjust if necessary
    }
  };

  const handleDownload = () => {
    const input = document.getElementById('resume-content'); // Target only the resume content
    if (input) {
      // Clone the content and remove unwanted elements/styles
      const clonedContent = input.cloneNode(true) as HTMLElement;
  
      // Remove the "Resume Preview" heading if it exists (cast as HTMLElement)
      const previewHeading = clonedContent.querySelector('h1, h2, .preview-heading') as HTMLElement | null;
      if (previewHeading) {
        previewHeading.remove(); // Remove the heading element
      }
  
      // Remove any borders by setting the style to none
      clonedContent.style.border = 'none'; // Remove borders
      clonedContent.querySelectorAll('*').forEach((el) => {
        if ((el as HTMLElement).style) {
          (el as HTMLElement).style.border = 'none'; // Remove borders from all inner elements
        }
      });
  
      // Hide any other elements you don't want in the PDF (like footers, buttons, etc.)
      clonedContent.querySelectorAll('.no-print').forEach((el) => {
        if ((el as HTMLElement).style) {
          (el as HTMLElement).style.display = 'none'; // Hide elements with "no-print" class
        }
      });
  
      // Append the cloned content to the body temporarily
      document.body.appendChild(clonedContent);
  
      // Convert the cloned content to canvas for PDF generation
      html2canvas(clonedContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('resume.pdf'); // Save only the resume content as a PDF
  
        // Remove the cloned content from the document after download
        document.body.removeChild(clonedContent);
      });
    }
  };

  const handleEmail = () => {
    // Logic to handle email (could be using a service)
    alert('Email functionality to be implemented!');
  };

  // Common button styles
  const buttonStyles = "flex flex-col items-center justify-center bg-teal-500 text-white p-2 rounded hover:bg-teal-600 transition duration-300 w-32";

  return (
    <div className="container mx-auto flex">
      <div className="w-2/3 p-4">
        {currentStep === 0 && <PersonalInfo onChange={handleDataChange} />}
        {currentStep === 1 && <WorkExperience onChange={handleDataChange} />}
        {currentStep === 2 && <Education onChange={handleDataChange} />}
        {currentStep === 3 && <Skills onChange={handleDataChange} />}
        
        <div className="flex justify-between mt-4">
          {currentStep > 0 && (
            <button onClick={handlePrevStep} className="bg-gray-300 p-2 rounded">Back</button>
          )}
          {currentStep < steps.length - 1 ? (
            <button onClick={handleNextStep} className="bg-blue-500 text-white p-2 rounded">Next</button>
          ) : (
            <button onClick={() => alert('Resume submitted!')} className="bg-green-500 text-white p-2 rounded">Submit</button>
          )}
        </div>
      </div>

      {/* Resume preview and buttons */}
      <div className="w-1/3 px-4" id="resume-preview">
        {/* Wrap only the resume content in a div */}
        <div id="resume-content">
          <ResumePreview data={resumeData} />
        </div>
        <div className="flex justify-between mt-4 pb-4">
          <button onClick={handleDownload} className={buttonStyles}>
            <FaDownload className="mb-2" />
            Download
          </button>
          <button onClick={handlePrint} className={buttonStyles}>
            <FaPrint className="mb-2" />
            Print
          </button>
          <button onClick={handleEmail} className={buttonStyles}>
            <FaEnvelope className="mb-2" />
            Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
