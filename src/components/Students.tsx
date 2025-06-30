
import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Students = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const students = [
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

  const courses = ['all', 'Développement Web', 'Marketing Digital', 'Comptabilité'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || student.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            Gestion des Étudiants
          </h2>
          <p className="text-muted-foreground mt-1">Gérez les inscriptions et suivez les progrès</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Ajouter Étudiant
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher un étudiant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">Toutes les filières</option>
              {courses.filter(c => c !== 'all').map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl p-6 card-shadow hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{student.name}</h3>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                student.status === 'Actif' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {student.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Filière:</span>
                <span className="text-sm font-medium">{student.course}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Niveau:</span>
                <span className="text-sm font-medium">{student.level}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Moyenne:</span>
                <span className={`text-sm font-bold ${
                  student.average >= 15 ? 'text-green-600' :
                  student.average >= 12 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {student.average}/20
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye size={16} />
                Voir
              </Button>
              <Button variant="outline" size="sm">
                <Edit size={16} />
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun étudiant trouvé</p>
        </div>
      )}
    </div>
  );
};
