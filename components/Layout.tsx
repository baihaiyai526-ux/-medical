import React from 'react';
import { ViewState } from '../types';
import { Home, Pill, Activity, MessageCircle, FileText, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: '首页', icon: Home },
    { id: 'medication', label: '用药管理', icon: Pill },
    { id: 'health', label: '健康监测', icon: Activity },
    { id: 'consult', label: '医生咨询', icon: MessageCircle },
    { id: 'reports', label: '健康报告', icon: FileText },
    { id: 'settings', label: '设置', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-full">
        <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-800">慢性病健康管理</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700 font-bold shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition">
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">健康管理</span>
           </div>
           <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
             {/* Avatar placeholder */}
             <img src="https://picsum.photos/32/32" alt="Avatar" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           <div className="max-w-5xl mx-auto">
             {children}
           </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden bg-white border-t border-gray-200 flex justify-around p-2 pb-safe">
          {navItems.slice(0, 5).map((item) => { // Limit items for mobile
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewState)}
                className={`flex flex-col items-center p-2 rounded-lg ${
                  isActive ? 'text-purple-600' : 'text-gray-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};