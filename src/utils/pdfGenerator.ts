
import jsPDF from 'jspdf';
import { Student, Grade } from '@/types';

export const generateStudentBulletin = (student: Student, grades: Grade[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('EduPro Manager', 20, 20);
  doc.setFontSize(16);
  doc.text('Bulletin de Notes', 20, 35);
  
  // Student info
  doc.setFontSize(12);
  doc.text(`Étudiant: ${student.name}`, 20, 55);
  doc.text(`Email: ${student.email}`, 20, 65);
  doc.text(`Filière: ${student.course}`, 20, 75);
  doc.text(`Niveau: ${student.level}`, 20, 85);
  doc.text(`Moyenne générale: ${student.average}/20`, 20, 95);
  
  // Grades table
  const studentGrades = grades.filter(g => g.studentName === student.name);
  
  if (studentGrades.length > 0) {
    doc.text('Détail des notes:', 20, 115);
    
    let yPosition = 135;
    doc.text('Matière', 20, yPosition);
    doc.text('Note', 80, yPosition);
    doc.text('Coef.', 120, yPosition);
    doc.text('Date', 150, yPosition);
    
    yPosition += 10;
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;
    
    studentGrades.forEach((grade) => {
      doc.text(grade.subject, 20, yPosition);
      doc.text(`${grade.grade}/20`, 80, yPosition);
      doc.text(grade.coefficient.toString(), 120, yPosition);
      doc.text(grade.date, 150, yPosition);
      yPosition += 10;
    });
  }
  
  // Footer
  doc.setFontSize(10);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, 20, 280);
  
  // Save the PDF
  doc.save(`bulletin_${student.name.replace(/\s+/g, '_')}.pdf`);
};

export const generateGradesReport = (grades: Grade[], students: Student[]) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('EduPro Manager', 20, 20);
  doc.setFontSize(16);
  doc.text('Rapport de Notes', 20, 35);
  
  // Summary
  doc.setFontSize(12);
  doc.text(`Total des notes: ${grades.length}`, 20, 55);
  doc.text(`Nombre d'étudiants: ${students.length}`, 20, 65);
  doc.text(`Date de génération: ${new Date().toLocaleDateString('fr-FR')}`, 20, 75);
  
  // Grades table
  let yPosition = 95;
  doc.text('Étudiant', 20, yPosition);
  doc.text('Matière', 70, yPosition);
  doc.text('Note', 120, yPosition);
  doc.text('Date', 150, yPosition);
  
  yPosition += 10;
  doc.line(20, yPosition, 190, yPosition);
  yPosition += 10;
  
  grades.forEach((grade) => {
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 30;
    }
    
    doc.text(grade.studentName, 20, yPosition);
    doc.text(grade.subject, 70, yPosition);
    doc.text(`${grade.grade}/20`, 120, yPosition);
    doc.text(grade.date, 150, yPosition);
    yPosition += 10;
  });
  
  // Save the PDF
  doc.save('rapport_notes.pdf');
};
