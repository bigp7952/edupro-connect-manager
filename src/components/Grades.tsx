
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AddGradeForm } from '@/components/forms/AddGradeForm';
import { useApp } from '@/contexts/AppContext';
import { generateGradesReport, generateStudentBulletin } from '@/utils/pdfGenerator';
import { toast } from '@/hooks/use-toast';

export const Grades = () => {
  const { students, grades, courses } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddGradeForm, setShowAddGradeForm] = useState(false);

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || grade.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const calculateStudentAverages = () => {
    return students.map(student => {
      const studentGrades = grades.filter(g => g.studentName === student.name);
      if (studentGrades.length === 0) return { ...student, calculatedAverage: 0, trend: '0' };
      
      const totalPoints = studentGrades.reduce((sum, grade) => sum + (grade.grade * grade.coefficient), 0);
      const totalCoefficients = studentGrades.reduce((sum, grade) => sum + grade.coefficient, 0);
      const calculatedAverage = totalPoints / totalCoefficients;
      
      return {
        ...student,
        calculatedAverage: Math.round(calculatedAverage * 10) / 10,
        trend: calculatedAverage > student.average ? `+${(calculatedAverage - student.average).toFixed(1)}` : `${(calculatedAverage - student.average).toFixed(1)}`
      };
    });
  };

  const studentAverages = calculateStudentAverages();

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600';
    if (grade >= 14) return 'text-blue-600';
    if (grade >= 12) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleExportPDF = () => {
    generateGradesReport(grades, students);
    toast({
      title: 'Export réussi',
      description: 'Le rapport PDF a été téléchargé',
    });
  };

  const handleGenerateBulletin = (student: any) => {
    generateStudentBulletin(student, grades);
    toast({
      title: 'Bulletin généré',
      description: `Le bulletin de ${student.name} a été téléchargé`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            Notes & Bulletins
          </h2>
          <p className="text-muted-foreground mt-1">Gestion des évaluations et bulletins</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportPDF}>
            <Download size={20} />
            Export PDF
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowAddGradeForm(true)}
          >
            <Plus size={20} />
            Ajouter Note
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Moyenne Générale</p>
              <p className="text-2xl font-bold text-gray-900">
                {grades.length > 0 ? (grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1) : '0'}/20
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Notes Saisies</p>
              <p className="text-2xl font-bold text-gray-900">{grades.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bulletins Disponibles</p>
              <p className="text-2xl font-bold text-gray-900">{students.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Taux Réussite</p>
              <p className="text-2xl font-bold text-gray-900">
                {grades.length > 0 ? Math.round((grades.filter(g => g.grade >= 12).length / grades.length) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Grades */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Notes Récentes</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher..."
                    className="pl-10 w-48"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="all">Tous</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.name}>{course.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredGrades.slice(0, 10).map((grade) => (
                <div key={grade.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{grade.studentName}</h4>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{grade.subject}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{grade.course} • {grade.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getGradeColor(grade.grade)}`}>
                      {grade.grade}/20
                    </p>
                    <p className="text-xs text-muted-foreground">Coef. {grade.coefficient}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Averages */}
        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="text-xl font-semibold mb-4">Moyennes Étudiants</h3>
          <div className="space-y-4">
            {studentAverages.map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.course}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${getGradeColor(student.calculatedAverage)}`}>
                    {student.calculatedAverage || 0}
                  </p>
                  <p className={`text-xs ${
                    student.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {student.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => {
              studentAverages.forEach(student => {
                handleGenerateBulletin(student);
              });
            }}
          >
            Générer Tous les Bulletins
          </Button>
        </div>
      </div>

      <AddGradeForm 
        open={showAddGradeForm} 
        onClose={() => setShowAddGradeForm(false)} 
      />
    </div>
  );
};
