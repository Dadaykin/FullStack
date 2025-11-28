import React, { useState } from 'react';
import { Car, Lock, Mail } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onShowRegister: () => void;
}

export default function LoginPage({ onLogin, onShowRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock авторизация
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Логотип и заголовок */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-slate-900 mb-2">Автоэксперт AI</h1>
          <p className="text-slate-600">
            Профессиональная оценка повреждений автомобилей
          </p>
        </div>

        {/* Форма входа */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-slate-900 mb-6">Вход в систему</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-slate-600">Запомнить меня</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-700">
                Забыли пароль?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Войти
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Нет аккаунта?{' '}
              <button
                onClick={onShowRegister}
                className="text-blue-600 hover:text-blue-700"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 text-center text-slate-500">
          <p>Демо: используйте любой email и пароль для входа</p>
        </div>
      </div>
    </div>
  );
}