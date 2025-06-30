
import React from 'react';
import { Home, Users, UserCheck, BookOpen, FileText, Calendar } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: Home },
    { id: 'students', label: 'Étudiants', icon: Users },
    { id: 'teachers', label: 'Formateurs', icon: UserCheck },
    { id: 'courses', label: 'Filières', icon: BookOpen },
    { id: 'grades', label: 'Notes & Bulletins', icon: FileText },
    { id: 'schedule', label: 'Planning', icon: Calendar },
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-primary/5 to-primary/10 min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary mb-2">EduPro Manager</h1>
        <p className="text-sm text-muted-foreground">Gestion École Pro</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-button w-full ${activeTab === item.id ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
