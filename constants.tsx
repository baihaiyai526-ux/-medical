import { Medication, HealthMetric, Device, LogEntry } from './types';
import { Pill, Activity, Smartphone, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import React from 'react';

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: '1',
    name: '阿司匹林 (Aspirin)',
    dosage: '100mg',
    frequency: '每日1次',
    time: '08:00',
    taken: true,
    type: 'tablet',
    daysLeft: 15,
    instructions: 'after_meal'
  },
  {
    id: '2',
    name: '二甲双胍 (Metformin)',
    dosage: '500mg',
    frequency: '每日3次',
    time: '12:00',
    taken: false,
    type: 'tablet',
    daysLeft: 8,
    instructions: 'with_meal'
  },
  {
    id: '3',
    name: '维生素D (Vitamin D)',
    dosage: '1粒',
    frequency: '每日1次',
    time: '20:00',
    taken: false,
    type: 'capsule',
    daysLeft: 30,
    instructions: 'after_meal'
  }
];

export const HEALTH_DATA: HealthMetric[] = [
  { id: '1', type: 'blood_pressure', value: 128, value2: 82, unit: 'mmHg', timestamp: '2023-11-15 08:00', status: 'normal' },
  { id: '2', type: 'blood_sugar', value: 6.8, unit: 'mmol/L', timestamp: '2023-11-15 08:15', status: 'warning' },
  { id: '3', type: 'weight', value: 68.5, unit: 'kg', timestamp: '2023-11-15 07:30', status: 'normal' },
  { id: '4', type: 'heart_rate', value: 72, unit: 'bpm', timestamp: '2023-11-15 08:05', status: 'normal' },
];

export const CONNECTED_DEVICES: Device[] = [
  { id: '1', name: 'iPhone 13 Pro', type: 'mobile', lastSync: '2分钟前', status: 'online', isCurrent: true },
  { id: '2', name: 'iPad Pro', type: 'tablet', lastSync: '15分钟前', status: 'online', isCurrent: false },
  { id: '3', name: 'MacBook Pro', type: 'desktop', lastSync: '3小时前', status: 'offline', isCurrent: false },
];

export const SYSTEM_LOGS: LogEntry[] = [
  { id: '1', level: 'ERROR', message: '同步服务超时', location: 'DataSyncService.java:128', timestamp: '2023-11-15 14:32' },
  { id: '2', level: 'WARN', message: '缓存空间不足警告', location: 'CacheManager.java:45', timestamp: '2023-11-15 14:30' },
  { id: '3', level: 'INFO', message: '备份任务完成', location: 'BackupService.java:67', timestamp: '2023-11-15 14:28' },
  { id: '4', level: 'INFO', message: '用户登录成功', location: 'AuthService.java:22', timestamp: '2023-11-15 09:00' },
];

export const METRIC_ICONS = {
  blood_pressure: <Heart className="w-6 h-6 text-white" />,
  blood_sugar: <Activity className="w-6 h-6 text-white" />,
  weight: <Smartphone className="w-6 h-6 text-white" />, // Placeholder
  heart_rate: <Activity className="w-6 h-6 text-white" />,
};

export const METRIC_COLORS = {
  blood_pressure: 'bg-indigo-500',
  blood_sugar: 'bg-pink-500',
  weight: 'bg-purple-500',
  heart_rate: 'bg-blue-500',
};

export const METRIC_LABELS = {
  blood_pressure: '血压',
  blood_sugar: '血糖',
  weight: '体重',
  heart_rate: '心率',
};