import React, { useState } from 'react';
import { SettingsTab, Device, LogEntry } from '../types';
import { CONNECTED_DEVICES, SYSTEM_LOGS } from '../constants';
import { Shield, RefreshCw, Server, Smartphone, Tablet as TabletIcon, Monitor, Lock, HardDrive, Trash2, RotateCcw, AlertTriangle, FileText, Settings as SettingsIcon } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('sync');
  const [logs] = useState<LogEntry[]>(SYSTEM_LOGS);

  const renderSyncSettings = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Device Sync Status (Page 13/20) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <RefreshCw className="w-5 h-5 mr-2 text-purple-600" />
            设备同步状态
          </h3>
          <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full cursor-pointer hover:bg-purple-100">添加设备 +</span>
        </div>

        <div className="space-y-4">
          {CONNECTED_DEVICES.map(device => (
            <div key={device.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition">
              <div className="flex items-center space-x-4">
                {device.type === 'mobile' && <Smartphone className="w-6 h-6 text-gray-400" />}
                {device.type === 'tablet' && <TabletIcon className="w-6 h-6 text-gray-400" />}
                {device.type === 'desktop' && <Monitor className="w-6 h-6 text-gray-400" />}
                <div>
                  <p className="text-sm font-bold text-gray-800">{device.name}</p>
                  <p className="text-xs text-gray-500">最后同步: {device.lastSync}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-0.5 text-xs rounded ${device.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {device.status === 'online' ? '在线' : '离线'}
                </span>
                {/* Toggle Switch */}
                <div className={`w-10 h-5 flex items-center bg-gray-300 rounded-full p-1 duration-300 cursor-pointer ${device.status === 'online' ? 'bg-green-400' : ''}`}>
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${device.status === 'online' ? 'translate-x-5' : ''}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Frequency (Page 20) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <SettingsIcon className="w-5 h-5 mr-2 text-purple-600" />
            同步频率
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="border border-purple-200 bg-purple-50 p-4 rounded-xl flex items-start cursor-pointer">
                <input type="radio" name="sync" className="mt-1 mr-3 text-purple-600 focus:ring-purple-500" defaultChecked />
                <div>
                    <span className="font-bold text-gray-800 block text-sm">实时同步</span>
                    <span className="text-xs text-gray-500">数据变更立即同步到所有设备，保持最新状态</span>
                </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-xl flex items-start cursor-pointer hover:border-gray-300">
                <input type="radio" name="sync" className="mt-1 mr-3 text-purple-600 focus:ring-purple-500" />
                <div>
                    <span className="font-bold text-gray-800 block text-sm">每小时同步</span>
                    <span className="text-xs text-gray-500">系统每小时自动同步一次，平衡实时与资源</span>
                </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-xl flex items-start cursor-pointer hover:border-gray-300">
                <input type="radio" name="sync" className="mt-1 mr-3 text-purple-600 focus:ring-purple-500" />
                <div>
                    <span className="font-bold text-gray-800 block text-sm">每天同步</span>
                    <span className="text-xs text-gray-500">每天凌晨自动同步，节省流量和电量</span>
                </div>
            </label>
            <label className="border border-gray-200 p-4 rounded-xl flex items-start cursor-pointer hover:border-gray-300">
                <input type="radio" name="sync" className="mt-1 mr-3 text-purple-600 focus:ring-purple-500" />
                <div>
                    <span className="font-bold text-gray-800 block text-sm">手动同步</span>
                    <span className="text-xs text-gray-500">仅由用户手动触发同步操作，完全自主控制</span>
                </div>
            </label>
        </div>
      </div>

       {/* Security Options (Page 13) */}
       <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-purple-600" />
            数据加密设置
        </h3>
        <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
                <div>
                    <p className="text-sm font-bold text-gray-800">传输加密</p>
                    <p className="text-xs text-gray-500">使用 TLS 1.3 协议保护数据传输</p>
                </div>
                <div className="w-10 h-5 flex items-center bg-green-400 rounded-full p-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-5"></div>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm font-bold text-gray-800">存储加密</p>
                    <p className="text-xs text-gray-500">使用 AES-256 加密算法保护数据存储</p>
                </div>
                <div className="w-10 h-5 flex items-center bg-green-400 rounded-full p-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full shadow-md transform translate-x-5"></div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );

  const renderSystemLogs = () => (
    <div className="space-y-8 animate-fade-in">
      {/* System Logs Viewer (Page 25) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-purple-600" />
            系统日志查看
          </h3>
          <div className="space-x-2">
            <button className="text-xs px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">导出日志</button>
            <button className="text-xs px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 hover:bg-gray-50">刷新</button>
          </div>
        </div>
        <div className="p-0 h-48 overflow-y-auto logs-scroll bg-gray-50 font-mono text-xs">
          {logs.map(log => (
             <div key={log.id} className="p-2 border-b border-gray-100 hover:bg-white flex space-x-4">
                <span className={`font-bold w-12 ${log.level === 'ERROR' ? 'text-red-500' : log.level === 'WARN' ? 'text-yellow-600' : 'text-green-600'}`}>
                    [{log.level}]
                </span>
                <span className="text-gray-500 w-32">{log.timestamp}</span>
                <span className="text-gray-800 flex-1">{log.message}</span>
                <span className="text-gray-400">{log.location}</span>
             </div>
          ))}
        </div>
      </div>

      {/* Cache Clearing (Page 25) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <HardDrive className="w-5 h-5 mr-2 text-purple-600" />
                缓存清理
            </h3>
            <button className="bg-purple-600 text-white px-4 py-1.5 rounded text-xs hover:bg-purple-700 transition">
                立即清理
            </button>
        </div>
        
        <div className="space-y-4">
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">应用缓存</span>
                    <span className="font-bold text-gray-800">128 MB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
            </div>
            <div>
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">图片缓存</span>
                    <span className="font-bold text-gray-800">256 MB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
            </div>
            <div className="flex justify-between items-center pt-2 text-sm text-purple-600 font-medium">
                <span>总计可释放空间</span>
                <span>448 MB</span>
            </div>
        </div>
      </div>

      {/* Reset Options (Page 25) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <RotateCcw className="w-5 h-5 mr-2 text-gray-600" />
            重置选项
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition group">
                <SettingsIcon className="w-6 h-6 text-gray-400 mb-2 group-hover:text-purple-600" />
                <span className="text-sm font-bold text-gray-700">重置应用设置</span>
                <span className="text-xs text-gray-400 mt-1">将所有设置恢复为默认值</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition group">
                <Server className="w-6 h-6 text-gray-400 mb-2 group-hover:text-purple-600" />
                <span className="text-sm font-bold text-gray-700">恢复云端数据</span>
                <span className="text-xs text-gray-400 mt-1">从服务器恢复最新数据</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-red-50 hover:border-red-100 transition group">
                <Trash2 className="w-6 h-6 text-gray-400 mb-2 group-hover:text-red-500" />
                <span className="text-sm font-bold text-gray-700 group-hover:text-red-600">重置本地数据库</span>
                <span className="text-xs text-gray-400 mt-1 group-hover:text-red-400">清除所有本地存储数据</span>
            </button>
        </div>
        <div className="mt-4 bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex items-start">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 shrink-0" />
            <p className="text-xs text-yellow-700">
                <span className="font-bold">警告：</span> 重置操作不可逆，请确保已备份重要数据。建议在技术支持人员指导下执行重置操作。
            </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">高级设置</h2>
          <p className="text-gray-500 text-sm">管理您的设备同步与数据安全设置</p>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="flex space-x-1 bg-white p-1 rounded-xl w-full max-w-md shadow-sm border border-gray-100">
        <button 
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'sync' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
        >
            同步与安全
        </button>
        <button 
            onClick={() => setActiveTab('system')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${activeTab === 'system' ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-gray-700'}`}
        >
            系统维护
        </button>
      </div>

      {activeTab === 'sync' ? renderSyncSettings() : renderSystemLogs()}
    </div>
  );
};