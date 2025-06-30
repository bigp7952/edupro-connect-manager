
import React from 'react';
import { UserCheck, Plus, Mail, Phone, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Teachers = () => {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Jean Dupont',
      email: 'jean.dupont@edupro.com',
      phone: '+33 6 12 34 56 78',
      specialties: ['Développement Web', 'JavaScript', 'React'],
      experience: '8 ans',
      students: 45,
      courses: 3
    },
    {
      id: 2,
      name: 'Prof. Claire Martin',
      email: 'claire.martin@edupro.com',
      phone: '+33 6 98 76 54 32',
      specialties: ['Marketing Digital', 'SEO', 'Réseaux Sociaux'],
      experience: '6 ans',
      students: 38,
      courses: 2
    },
    {
      id: 3,
      name: 'M. Paul Rousseau',
      email: 'paul.rousseau@edupro.com',
      phone: '+33 6 55 44 33 22',
      specialties: ['Comptabilité', 'Gestion', 'Finance'],
      experience: '12 ans',
      students: 52,
      courses: 4
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-primary" />
            Gestion des Formateurs
          </h2>
          <p className="text-muted-foreground mt-1">Équipe pédagogique et spécialités</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Ajouter Formateur
        </Button>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-xl p-6 card-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Expérience: {teacher.experience}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Spécialités:</h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.specialties.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{teacher.students}</p>
                    <p className="text-xs text-muted-foreground">Étudiants</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{teacher.courses}</p>
                    <p className="text-xs text-muted-foreground">Cours</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <BookOpen size={16} className="mr-2" />
                    Planning
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Modifier
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
