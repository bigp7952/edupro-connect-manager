
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('monday');

  const schedule = {
    monday: [
      {
        time: '08:00 - 10:00',
        subject: 'HTML/CSS Avancé',
        teacher: 'Dr. Jean Dupont',
        room: 'Salle A12',
        course: 'Développement Web',
        students: 25,
        color: 'bg-blue-500'
      },
      {
        time: '10:15 - 12:15',
        subject: 'JavaScript ES6',
        teacher: 'Dr. Jean Dupont',
        room: 'Salle A12',
        course: 'Développement Web',
        students: 25,
        color: 'bg-blue-500'
      },
      {
        time: '14:00 - 16:00',
        subject: 'Marketing Digital',
        teacher: 'Prof. Claire Martin',
        room: 'Salle B05',
        course: 'Marketing Digital',
        students: 20,
        color: 'bg-green-500'
      }
    ],
    tuesday: [
      {
        time: '09:00 - 11:00',
        subject: 'React Fondamentaux',
        teacher: 'Dr. Jean Dupont',
        room: 'Salle A12',
        course: 'Développement Web',
        students: 25,
        color: 'bg-blue-500'
      },
      {
        time: '11:15 - 12:15',
        subject: 'Comptabilité Générale',
        teacher: 'M. Paul Rousseau',
        room: 'Salle C08',
        course: 'Comptabilité',
        students: 18,
        color: 'bg-purple-500'
      }
    ],
    wednesday: [
      {
        time: '08:00 - 10:00',
        subject: 'SEO & Référencement',
        teacher: 'Prof. Claire Martin',
        room: 'Salle B05',
        course: 'Marketing Digital',
        students: 20,
        color: 'bg-green-500'
      }
    ],
    thursday: [
      {
        time: '10:00 - 12:00',
        subject: 'Gestion Financière',
        teacher: 'M. Paul Rousseau',
        room: 'Salle C08',
        course: 'Comptabilité',
        students: 18,
        color: 'bg-purple-500'
      }
    ],
    friday: [
      {
        time: '14:00 - 17:00',
        subject: 'Projet Final',
        teacher: 'Dr. Jean Dupont',
        room: 'Salle A12',
        course: 'Développement Web',
        students: 25,
        color: 'bg-blue-500'
      }
    ]
  };

  const days = [
    { id: 'monday', label: 'Lundi' },
    { id: 'tuesday', label: 'Mardi' },
    { id: 'wednesday', label: 'Mercredi' },
    { id: 'thursday', label: 'Jeudi' },
    { id: 'friday', label: 'Vendredi' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-primary" />
            Planning Hebdomadaire
          </h2>
          <p className="text-muted-foreground mt-1">Organisation des cours et salles</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={20} />
          Ajouter Cours
        </Button>
      </div>

      {/* Day Selector */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedDay === day.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule Display */}
      <div className="bg-white rounded-xl p-6 card-shadow">
        <h3 className="text-xl font-semibold mb-6 capitalize">
          {days.find(d => d.id === selectedDay)?.label}
        </h3>

        {schedule[selectedDay as keyof typeof schedule]?.length > 0 ? (
          <div className="space-y-4">
            {schedule[selectedDay as keyof typeof schedule].map((session, index) => (
              <div key={index} className="border-l-4 border-primary pl-6 py-4 bg-gray-50 rounded-r-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{session.subject}</h4>
                    <p className="text-sm text-muted-foreground">{session.course}</p>
                  </div>
                  <span className={`px-3 py-1 ${session.color} text-white text-sm rounded-full`}>
                    {session.course}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{session.room}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{session.students} étudiants</span>
                  </div>
                  <div className="text-muted-foreground">
                    <strong>Formateur:</strong> {session.teacher}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Aucun cours programmé ce jour</p>
            <Button className="mt-4" variant="outline">
              <Plus size={16} className="mr-2" />
              Ajouter un cours
            </Button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-muted-foreground">Cours cette semaine</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-muted-foreground">Salles utilisées</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-muted-foreground">Taux d'occupation</p>
          </div>
        </div>
      </div>
    </div>
  );
};
