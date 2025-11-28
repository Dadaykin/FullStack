import React from 'react';
import { Calendar, FileText, DollarSign, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface HistoryItem {
  id: string;
  date: string;
  time: string;
  photosCount: number;
  damageLevel: 'low' | 'medium' | 'high';
  totalCost: string;
  damages: Array<{
    type: string;
    severity: string;
    location: string;
    repairCost: string;
  }>;
  description: string;
}

interface HistoryTabProps {
  history: HistoryItem[];
  onViewDetails: (item: HistoryItem) => void;
}

export default function HistoryTab({ history, onViewDetails }: HistoryTabProps) {
  const getDamageLevelConfig = (level: string) => {
    switch (level) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          text: 'Незначительные'
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          text: 'Средние'
        };
      case 'high':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          text: 'Серьезные'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
          text: 'Неизвестно'
        };
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-slate-900 mb-2">История пуста</h3>
        <p className="text-slate-600">
          Здесь будут отображаться ваши предыдущие анализы автомобилей
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => {
        const config = getDamageLevelConfig(item.damageLevel);
        const Icon = config.icon;

        return (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className={`${config.bgColor} rounded-xl p-3`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div>
                  <h3 className="text-slate-900 mb-1">Анализ от {item.date}</h3>
                  <div className="flex items-center gap-4 text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{item.photosCount} фото</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-slate-900 mb-1">{item.totalCost}</div>
                <div className={`${config.color} text-sm`}>{config.text}</div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <p className="text-slate-700 mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Обнаружено повреждений: {item.damages.length}</span>
                </div>
                <button
                  onClick={() => onViewDetails(item)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
