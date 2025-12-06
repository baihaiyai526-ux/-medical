export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string; // HH:mm
  taken: boolean;
  type: 'tablet' | 'capsule' | 'injection' | 'liquid';
  daysLeft: number;
  instructions: 'before_meal' | 'after_meal' | 'with_meal';
}

export interface HealthMetric {
  id: string;
  type: 'blood_pressure' | 'blood_sugar' | 'weight' | 'heart_rate';
  value: number;
  value2?: number; // For Diastolic BP
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface Device {
  id: string;
  name: string;
  type: 'mobile' | 'tablet' | 'desktop';
  lastSync: string;
  status: 'online' | 'offline';
  isCurrent: boolean;
}

export interface LogEntry {
  id: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  location: string;
  timestamp: string;
}

export type ViewState = 'dashboard' | 'medication' | 'health' | 'consult' | 'reports' | 'settings';
export type SettingsTab = 'profile' | 'sync' | 'system';