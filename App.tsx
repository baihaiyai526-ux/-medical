import React, { useState } from 'react';
import { ViewState, Medication } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { MedicationManager } from './components/MedicationManager';
import { HealthMonitor } from './components/HealthMonitor';
import { Settings } from './components/Settings';
import { INITIAL_MEDICATIONS, HEALTH_DATA } from './constants';
import { MessageCircle, FileText } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [healthData] = useState(HEALTH_DATA);

  const handleAddMedication = (med: Medication) => {
    setMedications(prev => [...prev, med]);
  };

  const handleTakeMedication = (id: string) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
  };

  // Placeholder pages for features not fully detailed in the specific XML scope
  const PlaceholderPage = ({ title, icon: Icon }: { title: string, icon: any }) => (
    <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-700">{title}</h2>
      <p className="text-gray-500 max-w-sm">该功能模块在此演示版本中未完全实现。请参考《用户操作手册》了解详细设计。</p>
      <button 
        onClick={() => setCurrentView('dashboard')}
        className="mt-4 text-purple-600 font-medium hover:underline"
      >
        返回首页
      </button>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            medications={medications}
            healthData={healthData}
            onNavigate={setCurrentView}
            onTakeMedication={handleTakeMedication}
          />
        );
      case 'medication':
        return (
          <MedicationManager 
            medications={medications} 
            onAddMedication={handleAddMedication} 
          />
        );
      case 'health':
        return <HealthMonitor data={healthData} />;
      case 'consult':
        return <PlaceholderPage title="医生在线咨询" icon={MessageCircle} />;
      case 'reports':
        return <PlaceholderPage title="健康分析报告" icon={FileText} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard 
            medications={medications}
            healthData={healthData}
            onNavigate={setCurrentView}
            onTakeMedication={handleTakeMedication}
          />
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;