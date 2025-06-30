
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Teacher, Course, Grade } from '@/types';

interface AppContextType {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  grades: Grade[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  updateStudent: (id: number, student: Partial<Student>) => void;
  deleteStudent: (id: number) => void;
  deleteTeacher: (id: number) => void;
  deleteCourse: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 1,
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    course: 'Développement Web',
    level: 'Niveau 2',
    average: 15.2,
    status: 'Actif',
    joinDate: '2023-09-15'
  },
  {
    id: 2,
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    course: 'Marketing Digital',
    level: 'Niveau 1',
    average: 13.8,
    status: 'Actif',
    joinDate: '2023-10-01'
  },
  {
    id: 3,
    name: 'Sophie Laurent',
    email: 'sophie.laurent@email.com',
    course: 'Développement Web',
    level: 'Niveau 3',
    average: 16.5,
    status: 'Actif',
    joinDate: '2023-08-20'
  },
  {
    id: 4,
    name: 'Thomas Durand',
    email: 'thomas.durand@email.com',
    course: 'Comptabilité',
    level: 'Niveau 2',
    average: 12.1,
    status: 'En pause',
    joinDate: '2023-09-10'
  }
];

const initialTeachers: Teacher[] = [
  {
    id: 1,
    name: 'Dr. Jean Dupont',
    email: 'jean.dupont@ecole.com',
    speciality: 'Développement Web',
    courses: ['HTML/CSS', 'JavaScript', 'React'],
    phone: '01 23 45 67 89',
    status: 'Actif'
  },
  {
    id: 2,
    name: 'Prof. Claire Martin',
    email: 'claire.martin@ecole.com',
    speciality: 'Marketing Digital',
    courses: ['SEO', 'Social Media', 'Analytics'],
    phone: '01 23 45 67 90',
    status: 'Actif'
  }
];

const initialCourses: Course[] = [
  {
    id: 1,
    name: 'Développement Web',
    description: 'Formation complète en développement web moderne',
    duration: '12 mois',
    level: 'Débutant à Avancé',
    studentsCount: 25
  },
  {
    id: 2,
    name: 'Marketing Digital',
    description: 'Stratégies marketing digitales et réseaux sociaux',
    duration: '8 mois',
    level: 'Intermédiaire',
    studentsCount: 18
  },
  {
    id: 3,
    name: 'Comptabilité',
    description: 'Gestion comptable et financière',
    duration: '10 mois',
    level: 'Débutant',
    studentsCount: 15
  }
];

const initialGrades: Grade[] = [
  {
    id: 1,
    studentId: 1,
    studentName: 'Marie Dubois',
    course: 'Développement Web',
    subject: 'HTML/CSS',
    grade: 16.5,
    coefficient: 2,
    date: '2024-01-15',
    teacher: 'Dr. Jean Dupont'
  },
  {
    id: 2,
    studentId: 1,
    studentName: 'Marie Dubois',
    course: 'Développement Web',
    subject: 'JavaScript',
    grade: 14.0,
    coefficient: 3,
    date: '2024-01-20',
    teacher: 'Dr. Jean Dupont'
  },
  {
    id: 3,
    studentId: 2,
    studentName: 'Pierre Martin',
    course: 'Marketing Digital',
    subject: 'SEO',
    grade: 15.5,
    coefficient: 2,
    date: '2024-01-18',
    teacher: 'Prof. Claire Martin'
  },
  {
    id: 4,
    studentId: 3,
    studentName: 'Sophie Laurent',
    course: 'Développement Web',
    subject: 'React',
    grade: 17.0,
    coefficient: 3,
    date: '2024-01-22',
    teacher: 'Dr. Jean Dupont'
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [grades, setGrades] = useState<Grade[]>(initialGrades);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: Date.now() };
    setStudents(prev => [...prev, newStudent]);
  };

  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    const newTeacher = { ...teacher, id: Date.now() };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const addCourse = (course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: Date.now() };
    setCourses(prev => [...prev, newCourse]);
  };

  const addGrade = (grade: Omit<Grade, 'id'>) => {
    const newGrade = { ...grade, id: Date.now() };
    setGrades(prev => [...prev, newGrade]);
  };

  const updateStudent = (id: number, studentUpdate: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...studentUpdate } : s));
  };

  const deleteStudent = (id: number) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const deleteTeacher = (id: number) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  return (
    <AppContext.Provider value={{
      students,
      teachers,
      courses,
      grades,
      addStudent,
      addTeacher,
      addCourse,
      addGrade,
      updateStudent,
      deleteStudent,
      deleteTeacher,
      deleteCourse
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
