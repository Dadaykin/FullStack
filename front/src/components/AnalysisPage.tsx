import React, { useState } from 'react';
import { Car, LogOut, Upload, Trash2, AlertCircle, FileSearch, History } from 'lucide-react';
import ImageUpload from './ImageUpload';
import AnalysisResult from './AnalysisResult';
import HistoryTab from './HistoryTab';

interface AnalysisPageProps {
  onLogout: () => void;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
}

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

interface HistoryItem extends AnalysisData {
  id: string;
  date: string;
  time: string;
  photosCount: number;
}

export default function AnalysisPage({ onLogout }: AnalysisPageProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'history'>('analysis');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [viewingHistoryItem, setViewingHistoryItem] = useState<HistoryItem | null>(null);

  const handleImagesUpload = (files: File[]) => {
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    if (images.length <= 1) {
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (images.length === 0) return;

    setIsAnalyzing(true);
    
    // Симуляция ML анализа
    setTimeout(() => {
      const mockAnalysis: AnalysisData = {
        damageLevel: images.length > 2 ? 'high' : 'medium',
        damages: [
          {
            type: 'Повреждение переднего бампера',
            severity: 'Средняя',
            location: 'Передняя часть',
            repairCost: '25 000 ₽'
          },
          {
            type: 'Царапина на правом крыле',
            severity: 'Легкая',
            location: 'Правая сторона',
            repairCost: '8 000 ₽'
          },
          {
            type: 'Вмятина на двери',
            severity: 'Средняя',
            location: 'Правая задняя дверь',
            repairCost: '15 000 ₽'
          }
        ],
        totalCost: '48 000 ₽',
        description: 'Обнаружено несколько повреждений средней степени тяжести. Автомобиль был в небольшом ДТП. Необходим кузовной ремонт и покраска. Структурных повреждений не обнаружено.'
      };
      
      // Добавляем результат в историю
      const now = new Date();
      const historyItem: HistoryItem = {
        ...mockAnalysis,
        id: Math.random().toString(36).substr(2, 9),
        date: now.toLocaleDateString('ru-RU'),
        time: now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        photosCount: images.length
      };
      
      setHistory([historyItem, ...history]);
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleViewHistoryDetails = (item: HistoryItem) => {
    setViewingHistoryItem(item);
    setActiveTab('analysis');
    setAnalysisResult(item);
  };

  return (
    <div className="min-h-screen">
      {/* Шапка */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-slate-900">Автоэксперт AI</h1>
                <p className="text-slate-600">Панель анализа</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Выход
            </button>
          </div>
        </div>
      </header>

      {/* Навигация по вкладкам */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'analysis'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileSearch className="w-5 h-5" />
              Новый анализ
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-5 h-5" />
              История запросов
              {history.length > 0 && (
                <span className="bg-blue-600 text-white rounded-full px-2 py-0.5 min-w-[20px] text-center">
                  {history.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'analysis' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Левая колонка - загрузка */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-slate-900 mb-4">Загрузка фотографий</h2>
                <ImageUpload onUpload={handleImagesUpload} />
                
                {images.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-slate-700">
                        Загружено фото: {images.length}
                      </p>
                      <button
                        onClick={() => {
                          setImages([]);
                          setAnalysisResult(null);
                        }}
                        className="text-slate-500 hover:text-red-600 transition-colors"
                      >
                        Очистить все
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.preview}
                            alt="Uploaded"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleRemoveImage(img.id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Инструкции */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-blue-900 mb-1">Рекомендации по фото</h3>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Делайте фото при хорошем освещении</li>
                      <li>• Снимайте повреждения с разных углов</li>
                      <li>• Включите общие виды автомобиля</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Кнопка анализа */}
              {images.length > 0 && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full mt-6 bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Анализ фотографий...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Upload className="w-5 h-5" />
                      Начать анализ
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Правая колонка - результаты */}
            <div>
              {analysisResult ? (
                <AnalysisResult data={analysisResult} />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-slate-900 mb-2">Ожидание анализа</h3>
                  <p className="text-slate-600">
                    Загрузите фотографии автомобиля и нажмите "Начать анализ"
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <HistoryTab history={history} onViewDetails={handleViewHistoryDetails} />
        )}
      </main>
    </div>
  );
}