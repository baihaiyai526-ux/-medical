import React, { useState } from 'react';
import { Medication } from '../types';
import { Pill, Clock, Calendar, Plus, Save, X } from 'lucide-react';

interface MedicationManagerProps {
  medications: Medication[];
  onAddMedication: (med: Medication) => void;
}

export const MedicationManager: React.FC<MedicationManagerProps> = ({ medications, onAddMedication }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMed, setNewMed] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    frequency: '每日1次',
    time: '08:00',
    type: 'tablet',
    instructions: 'after_meal',
    daysLeft: 14,
    taken: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMed.name && newMed.dosage) {
      onAddMedication({
        ...newMed as Medication,
        id: Date.now().toString()
      });
      setIsEditing(false);
      setNewMed({ name: '', dosage: '', frequency: '每日1次', time: '08:00' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">用药管理</h2>
          <p className="text-gray-500 text-sm">管理您的用药方案、设置用药提醒、查询用药记录</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-purple-700 shadow-md transition"
          >
            <Plus className="w-4 h-4 mr-2" /> 添加药品
          </button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: List */}
        <div className={`flex-1 space-y-4 ${isEditing ? 'hidden lg:block lg:w-1/3 opacity-50 pointer-events-none' : 'w-full'}`}>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">药品列表</h3>
          {medications.map((med) => (
            <div key={med.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{med.name}</h4>
                  <p className="text-xs text-gray-500">{med.dosage}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">{med.frequency}</p>
                <p className="text-xs text-gray-400">剩余 {med.daysLeft} 天</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Form (Visible when editing) */}
        {isEditing && (
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-purple-100 animate-slide-up">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-purple-600" />
                用药方案编辑
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">选择药品名称</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="例如: 阿司匹林"
                  value={newMed.name}
                  onChange={e => setNewMed({...newMed, name: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">剂量</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="例如: 100mg"
                    value={newMed.dosage}
                    onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">频次</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newMed.frequency}
                    onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                  >
                    <option value="每日1次">每日1次</option>
                    <option value="每日2次">每日2次</option>
                    <option value="每日3次">每日3次</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">用药时间</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg w-full cursor-pointer hover:bg-purple-50 border border-transparent hover:border-purple-200">
                    <input 
                      type="radio" 
                      name="instructions" 
                      checked={newMed.instructions === 'before_meal'}
                      onChange={() => setNewMed({...newMed, instructions: 'before_meal'})}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">早餐前</span>
                  </label>
                  <label className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg w-full cursor-pointer hover:bg-purple-50 border border-transparent hover:border-purple-200">
                    <input 
                      type="radio" 
                      name="instructions" 
                      checked={newMed.instructions === 'after_meal'}
                      onChange={() => setNewMed({...newMed, instructions: 'after_meal'})}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">早餐后</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  提醒设置
                </h4>
                <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">启用提醒</span>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-purple-600" defaultChecked/>
                      <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer checked:bg-purple-600"></label>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">声音设置</span>
                    <select className="text-sm bg-white border border-gray-200 rounded px-2 py-1">
                      <option>默认铃声</option>
                      <option>温和</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 pt-6">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  取消
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-md transition flex items-center justify-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  保存方案
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};