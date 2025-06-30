
import React from 'react';
import { Users, UserCheck, BookOpen, TrendingUp, Calendar, Clock } from 'lucide-react';

export const Dashboard = () => {
  const stats = [
    { title: 'Total Étudiants', value: '342', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Formateurs', value: '24', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Filières Actives', value: '8', icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Moyenne Générale', value: '14.2/20', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const recentActivities = [
    { title: 'Nouveau étudiant inscrit', subtitle: 'Marie Dubois - Développement Web', time: '2h' },
    { title: 'Note ajoutée', subtitle: 'HTML/CSS - Classe DEV2023', time: '4h' },
    { title: 'Planning mis à jour', subtitle: 'Cours JavaScript - Salle A12', time: '6h' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tableau de Bord</h2>
          <p className="text-muted-foreground mt-1">Bienvenue, Admin ! Voici un aperçu de votre école.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>Dernière mise à jour: aujourd'hui à 14:30</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 card-shadow">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Actions Rapides
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors text-left">
                <Users className="w-8 h-8 text-primary mb-2" />
                <p className="font-medium">Ajouter Étudiant</p>
                <p className="text-sm text-muted-foreground">Inscrire un nouvel étudiant</p>
              </button>
              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
                <UserCheck className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-medium">Ajouter Formateur</p>
                <p className="text-sm text-muted-foreground">Nouveau membre équipe</p>
              </button>
              <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-medium">Créer Filière</p>
                <p className="text-sm text-muted-foreground">Nouvelle formation</p>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 card-shadow">
          <h3 className="text-xl font-semibold mb-4">Activités Récentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-1">Il y a {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
