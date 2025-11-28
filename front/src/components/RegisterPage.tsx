import React, { useState } from 'react';
import { Car, Lock, Mail, User, ArrowLeft } from 'lucide-react';

interface RegisterPageProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

export default function RegisterPage({ onRegister, onBackToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Очистка ошибки при изменении поля
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Введите ваше имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock регистрация
      onRegister();
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
            Создайте аккаунт для доступа к системе
          </p>
        </div>

        {/* Форма регистрации */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <button
            onClick={onBackToLogin}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад ко входу
          </button>

          <h2 className="text-slate-900 mb-6">Регистрация</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-slate-700 mb-2">
                Полное имя
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-slate-700 mb-2">
                Пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.password ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-slate-700 mb-2">
                Подтверждение пароля
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.confirmPassword ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 mt-1"
                required
              />
              <label htmlFor="terms" className="ml-2 text-slate-600">
                Я принимаю{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  условия использования
                </a>
                {' '}и{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  политику конфиденциальности
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Создать аккаунт
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Уже есть аккаунт?{' '}
              <button
                onClick={onBackToLogin}
                className="text-blue-600 hover:text-blue-700"
              >
                Войти
              </button>
            </p>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-6 text-center text-slate-500">
          <p>Демо: заполните форму для создания аккаунта</p>
        </div>
      </div>
    </div>
  );
}
