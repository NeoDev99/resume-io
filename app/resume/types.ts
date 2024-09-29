export interface FormData {
    name: string;
    email: string;
    phone: string;
    experiences: WorkExperience[];
    education: Education[];
    skills: string[];
}

export interface WorkExperience {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
}

export interface Education {
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
}
