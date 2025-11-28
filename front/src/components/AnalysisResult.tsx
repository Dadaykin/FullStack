import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  FileText,
  Wrench,
  DollarSign
} from 'lucide-react';

interface AnalysisData {
  damageLevel: 'low' | 'medium' | 'high';
  damages: Array<{
    type: string;
    severity: string;
    location: string;
    repairCost: string;
  }>;
  totalCost: string;
  description: string;
}

interface AnalysisResultProps {
  data: AnalysisData;
}

export default function AnalysisResult({ data }: AnalysisResultProps) {
  const getDamageLevelConfig = (level: string) => {
    switch (level) {
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'Незначительные повреждения'
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          text: 'Средние повреждения'
        };
      case 'high':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: 'Серьезные повреждения'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          text: 'Неизвестно'
        };
    }
  };

  const config = getDamageLevelConfig(data.damageLevel);
  const Icon = config.icon;

  return (
    <div className="space-y-6">
      {/* Общая оценка */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-slate-900 mb-4">Результат анализа</h2>
        
        <div className={`${config.bgColor} rounded-xl p-4 mb-4`}>
          <div className="flex items-center gap-3">
            <Icon className={`w-6 h-6 ${config.color}`} />
            <div>
              <h3 className={`${config.color} mb-1`}>{config.text}</h3>
              <p className="text-slate-700">{data.description}</p>
            </div>
          </div>
        </div>

        {/* Общая стоимость */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700">Примерная стоимость ремонта</span>
            </div>
            <span className="text-slate-900">{data.totalCost}</span>
          </div>
        </div>
      </div>

      {/* Список повреждений */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-slate-700" />
          <h3 className="text-slate-900">Обнаруженные повреждения</h3>
        </div>
        
        <div className="space-y-3">
          {data.damages.map((damage, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-slate-900">{damage.type}</h4>
                <span className="text-blue-600">{damage.repairCost}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-slate-500">Степень</p>
                  <p className="text-slate-700">{damage.severity}</p>
                </div>
                <div>
                  <p className="text-slate-500">Расположение</p>
                  <p className="text-slate-700">{damage.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Рекомендации */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-slate-700" />
          <h3 className="text-slate-900">Рекомендации</h3>
        </div>
        
        <ul className="space-y-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Рекомендуется провести детальный осмотр в автосервисе</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Требуется оценка специалиста для точной калькуляции</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span>Проверьте наличие скрытых повреждений</span>
          </li>
        </ul>
      </div>
    </div>
  );
}