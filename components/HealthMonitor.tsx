import React from 'react';
import { HealthMetric } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Plus, Bluetooth, Mic } from 'lucide-react';

interface HealthMonitorProps {
  data: HealthMetric[];
}

export const HealthMonitor: React.FC<HealthMonitorProps> = ({ data }) => {
  // Filter for blood pressure for the chart demo
  const bpData = [
    { name: '周一', systolic: 120, diastolic: 80 },
    { name: '周二', systolic: 122, diastolic: 82 },
    { name: '周三', systolic: 125, diastolic: 85 },
    { name: '周四', systolic: 118, diastolic: 78 },
    { name: '周五', systolic: 128, diastolic: 82 },
    { name: '周六', systolic: 130, diastolic: 88 },
    { name: '周日', systolic: 124, diastolic: 80 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">健康监测</h2>
          <p className="text-gray-500 text-sm">实时监测生理指标，生成健康趋势报告</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-purple-700 shadow-md transition">
          <Plus className="w-4 h-4 mr-2" /> 记录数据
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">血压趋势</h3>
            <div className="flex space-x-2 text-sm">
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">周</span>
              <span className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">月</span>
              <span className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer">年</span>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bpData}>
                <defs>
                  <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                />
                <Area type="monotone" dataKey="systolic" stroke="#8884d8" fillOpacity={1} fill="url(#colorSys)" name="收缩压" />
                <Area type="monotone" dataKey="diastolic" stroke="#82ca9d" fillOpacity={1} fill="url(#colorDia)" name="舒张压" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">收缩压 (mmHg)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">舒张压 (mmHg)</span>
            </div>
          </div>
        </div>

        {/* Quick Entry Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">快捷录入</h3>
                <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition border border-transparent hover:border-purple-200 group">
                        <div className="flex items-center">
                            <Bluetooth className="w-5 h-5 text-blue-500 mr-3" />
                            <div className="text-left">
                                <p className="font-semibold text-gray-800 group-hover:text-purple-700">连接设备</p>
                                <p className="text-xs text-gray-500">自动同步血糖仪/血压计</p>
                            </div>
                        </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition border border-transparent hover:border-purple-200 group">
                        <div className="flex items-center">
                            <Mic className="w-5 h-5 text-pink-500 mr-3" />
                            <div className="text-left">
                                <p className="font-semibold text-gray-800 group-hover:text-purple-700">语音记录</p>
                                <p className="text-xs text-gray-500">按住说话，智能识别数值</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-800 mb-3">最近记录</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">今日 08:30</span>
                        <span className="font-medium text-gray-800">血压 128/82</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">今日 08:35</span>
                        <span className="font-medium text-gray-800">血糖 6.8</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};