
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { Students } from '@/components/Students';
import { Teachers } from '@/components/Teachers';
import { Courses } from '@/components/Courses';
import { Grades } from '@/components/Grades';
import { Schedule } from '@/components/Schedule';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <Students />;
      case 'teachers':
        return <Teachers />;
      case 'courses':
        return <Courses />;
      case 'grades':
        return <Grades />;
      case 'schedule':
        return <Schedule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
