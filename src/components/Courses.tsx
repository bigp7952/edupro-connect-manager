
import React from 'react';
import { BookOpen, Plus, Users, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Courses = () => {
  const courses = [
    {
      id: 1,
      name: 'Développement Web Full Stack',
      description: 'Formation complète en développement web moderne avec React, Node.js et bases de données.',
      duration: '12 mois',
      level: 'Intermédiaire',
      students: 85,
      teachers: 3,
      modules: 8,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Marketing Digital & E-commerce',
      description: 'Stratégies marketing digitales, SEO, réseaux sociaux et gestion e-commerce.',
      duration: '8 mois',
      level: 'Débutant',
      students: 62,
      teachers: 2,
      modules: 6,
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Comptabilité & Gestion',
      description: 'Formation en comptabilité, gestion financière et administration d\'entreprise.',
      duration: '10 mois',
      level: 'Intermédiaire',
      students: 45,
      teachers: 2,
      modules: 7,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Design Graphique & UX/UI',
      description: 'Création graphique, design d\'interface et expérience utilisateur.',
      duration: '9 mois',
      level: 'Tous niveaux',
      students: 38,
      teachers: 2,
      modules: 5,
      color: 'bg-pink-500'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant': return 'text-green-600 bg-green-100';
      case 'Intermédiaire': return 'text-orange-600 bg-orange-100';
      case 'Avancé': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Gestion des Filières
          </h2>
          <p className="text-muted-foreground mt-1">Formations et programmes d'études</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Créer Filière
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl overflow-hidden card-shadow hover:shadow-lg transition-all duration-300">
            <div className={`h-2 ${course.color}`}></div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{course.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {course.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{course.students}</p>
                  <p className="text-xs text-muted-foreground">Étudiants</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{course.duration}</p>
                  <p className="text-xs text-muted-foreground">Durée</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Award className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900">{course.modules}</p>
                  <p className="text-xs text-muted-foreground">Modules</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <span>{course.teachers} formateur{course.teachers > 1 ? 's' : ''}</span>
                <span>Début: Septembre 2024</span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Voir Étudiants
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Planning
                </Button>
                <Button size="sm">
                  Modifier
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
