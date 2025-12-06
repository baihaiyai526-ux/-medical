import React from 'react';
import { Medication, HealthMetric } from '../types';
import { METRIC_ICONS, METRIC_COLORS, METRIC_LABELS } from '../constants';
import { Check, Clock, ChevronRight, PlusCircle, MessageCircle, FileText, Settings, Activity } from 'lucide-react';

interface DashboardProps {
  medications: Medication[];
  healthData: HealthMetric[];
  onNavigate: (view: any) => void;
  onTakeMedication: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ medications, healthData, onNavigate, onTakeMedication }) => {
  const getLatestMetric = (type: HealthMetric['type']) => {
    return healthData.find(m => m.type === type);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">早安，张先生</h1>
          <p className="text-gray-500 text-sm">今天也要保持好心情，按时服药哦。</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition shadow-lg">
          立即体检
        </button>
      </header>

      {/* Today's Medications */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-purple-600" />
            今日用药提醒
          </h2>
          <button 
            onClick={() => onNavigate('medication')}
            className="text-sm text-purple-600 hover:underline flex items-center"
          >
            全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {medications.map(med => (
            <div key={med.id} className={`bg-white p-4 rounded-xl shadow-sm border ${med.taken ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${med.taken ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${med.taken ? 'text-green-800' : 'text-gray-800'}`}>{med.name}</h3>
                    <p className="text-xs text-gray-500">{med.frequency} · {med.dosage}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${med.taken ? 'text-green-600' : 'text-purple-600'}`}>
                  {med.time}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{med.instructions === 'before_meal' ? '餐前服用' : med.instructions === 'after_meal' ? '餐后服用' : '餐中服用'}</span>
                <span>剩余 {med.daysLeft} 天</span>
              </div>

              <button
                onClick={() => onTakeMedication(med.id)}
                disabled={med.taken}
                className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                  med.taken 
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : 'bg-purple-600 text-white hover:bg-purple-700'
                }`}
              >
                {med.taken ? (
                  <>
                    <Check className="w-4 h-4 mr-1" /> 已服用
                  </>
                ) : (
                  '标记已服用'
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Health Data Overview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            健康数据概览
          </h2>
          <button 
             onClick={() => onNavigate('health')}
             className="text-sm text-purple-600 hover:underline flex items-center"
          >
            详情 <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(['blood_pressure', 'blood_sugar', 'weight', 'heart_rate'] as const).map(type => {
            const metric = getLatestMetric(type);
            return (
              <div key={type} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${METRIC_COLORS[type]} shadow-lg`}>
                  {METRIC_ICONS[type]}
                </div>
                <h3 className="text-sm text-gray-500 mb-1">{METRIC_LABELS[type]}</h3>
                <div className="text-xl font-bold text-gray-800">
                  {metric?.value}
                  {metric?.value2 && <span className="text-sm text-gray-400">/{metric.value2}</span>}
                </div>
                <div className="text-xs text-purple-500 font-medium">{metric?.unit}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-4 gap-4 mt-8">
        <button onClick={() => onNavigate('medication')} className="flex flex-col items-center space-y-2 group">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
            <PlusCircle className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">添加药物</span>
        </button>
        <button onClick={() => onNavigate('consult')} className="flex flex-col items-center space-y-2 group">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-indigo-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">在线问诊</span>
        </button>
        <button onClick={() => onNavigate('reports')} className="flex flex-col items-center space-y-2 group">
          <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center group-hover:bg-pink-100 transition-colors">
            <FileText className="w-6 h-6 text-pink-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">健康报告</span>
        </button>
        <button onClick={() => onNavigate('settings')} className="flex flex-col items-center space-y-2 group">
          <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs text-gray-600 font-medium">系统设置</span>
        </button>
      </section>
    </div>
  );
};