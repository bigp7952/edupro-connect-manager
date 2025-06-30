
export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  level: string;
  average: number;
  status: 'Actif' | 'En pause';
  joinDate: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  speciality: string;
  courses: string[];
  phone: string;
  status: 'Actif' | 'Inactif';
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  level: string;
  studentsCount: number;
}

export interface Grade {
  id: number;
  studentId: number;
  studentName: string;
  course: string;
  subject: string;
  grade: number;
  coefficient: number;
  date: string;
  teacher: string;
}
