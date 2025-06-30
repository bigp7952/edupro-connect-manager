
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Grades = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const grades = [
    {
      id: 1,
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
      studentName: 'Sophie Laurent',
      course: 'Développement Web',
      subject: 'React',
      grade: 17.0,
      coefficient: 3,
      date: '2024-01-22',
      teacher: 'Dr. Jean Dupont'
    }
  ];

  const studentAverages = [
    { name: 'Marie Dubois', course: 'Développement Web', average: 15.2, trend: '+0.8' },
    { name: 'Pierre Martin', course: 'Marketing Digital', average: 13.8, trend: '-0.2' },
    { name: 'Sophie Laurent', course: 'Développement Web', average: 16.5, trend: '+1.2' },
    { name: 'Thomas Durand', course: 'Comptabilité', average: 12.1, trend: '-0.5' }
  ];

  const courses = ['all', 'Développement Web', 'Marketing Digital', 'Comptabilité'];

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-600';
    if (grade >= 14) return 'text-blue-600';
    if (grade >= 12) return 'text-orange-600';
    return 'text-red-600';
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
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={20} />
            Export PDF
          </Button>
          <Button className="flex items-center gap-2">
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
              <p className="text-2xl font-bold text-gray-900">14.2/20</p>
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
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bulletins Générés</p>
              <p className="text-2xl font-bold text-gray-900">42</p>
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
              <p className="text-2xl font-bold text-gray-900">87%</p>
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
                  {courses.filter(c => c !== 'all').map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {grades.map((grade) => (
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
                  <p className={`text-lg font-bold ${getGradeColor(student.average)}`}>
                    {student.average}
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
          
          <Button variant="outline" className="w-full mt-4">
            Générer Bulletins
          </Button>
        </div>
      </div>
    </div>
  );
};
