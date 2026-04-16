import { useState, useEffect } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [authMode, setAuthMode] = useState('login'); 

  // Стан для лайків (наприклад, у котика вже було 2 лайки від інших)
  const [likes, setLikes] = useState(2); 
  const [hasLiked, setHasLiked] = useState(false);

  // Перевіряємо локальну пам'ять пристрою під час завантаження сторінки
  useEffect(() => {
    const alreadyLiked = localStorage.getItem('liked_current_cat') === 'true';
    if (alreadyLiked) {
      setHasLiked(true);
      setLikes(3); // Базові 2 лайки + 1 лайк з цього пристрою
    }
  }, []);

  // Функція обробки кліку на кнопку "Підтримати"
  const handleLike = () => {
    if (!hasLiked) {
      // Ставимо лайк
      setLikes(prev => prev + 1);
      setHasLiked(true);
      localStorage.setItem('liked_current_cat', 'true'); // Зберігаємо в браузер
    } else {
      // Забираємо лайк
      setLikes(prev => prev - 1);
      setHasLiked(false);
      localStorage.removeItem('liked_current_cat'); // Видаляємо з браузера
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f4f5] font-sans">

        {/* БІЧНА ПАНЕЛЬ (Sidebar) */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
            
            {/* Логотип */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-4 border-[#bf04ff] flex items-center justify-center">
                    <div className="w-3 h-3 bg-[#bf04ff] rounded-full"></div>
                </div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">OnlyCats</h1>
            </div>

            {/* Кнопка "Додати котика" */}
            <div className="px-4 mb-6">
                <button 
                    onClick={() => setActiveTab('addCat')}
                    className="w-full bg-[#bf04ff] hover:bg-[#a103d8] text-white font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Додати котика
                </button>
            </div>

            {/* НАВІГАЦІЯ */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                <button 
                    onClick={() => setActiveTab('home')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'home' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Головна
                </button>
                
                <button 
                    onClick={() => setActiveTab('explore')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'explore' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Огляд
                </button>

                <button 
                    onClick={() => setActiveTab('rating')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'rating' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Рейтинг
                </button>

                {/* НОВА ВКЛАДКА: ЗАВДАННЯ */}
                <button 
                    onClick={() => setActiveTab('tasks')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'tasks' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    Завдання
                </button>

                <button 
                    onClick={() => setActiveTab('mycats')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'mycats' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Мої котики
                </button>

                <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-colors ${
                        activeTab === 'profile' ? 'bg-[#fdf4ff] text-[#bf04ff]' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Профіль
                </button>
            </nav>

            {/* НИЖНІЙ БЛОК: РЕЄСТРАЦІЯ / АВТОРИЗАЦІЯ */}
            <div className="p-4 border-t border-gray-100">
                <button 
                    onClick={() => {
                        setActiveTab('auth');
                        setAuthMode('register');
                    }}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-colors mb-2"
                >
                    Зареєструватися
                </button>
                <button 
                    onClick={() => {
                        setActiveTab('auth');
                        setAuthMode('login');
                    }}
                    className="w-full bg-white border border-gray-200 hover:border-[#bf04ff] text-gray-700 hover:text-[#bf04ff] font-bold py-3 px-4 rounded-xl transition-colors"
                >
                    Увійти
                </button>
            </div>
        </div>

        {/* ГОЛОВНА ЗОНА */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
            
            {/* Головна - Картка котика */}
            {activeTab === 'home' && (
                <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 w-full max-w-[420px] overflow-hidden flex flex-col">
                    <div className="h-[400px] w-full bg-gray-100 relative">
                        <img src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="cat" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-3xl font-black text-gray-900">екке, 32 р.</h2>
                            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full transition-all">
                                <span className="text-orange-500 text-lg">🔥</span>
                                <span className="text-orange-600 font-bold">{likes}</span>
                            </div>
                        </div>
                        <p className="text-gray-600 text-lg mb-8">укпур</p>
                        <div className="flex gap-4">
                            <button 
                                onClick={handleLike}
                                className={`flex-1 font-bold py-4 rounded-2xl transition-all shadow-lg ${
                                    hasLiked 
                                    ? 'bg-purple-50 text-[#bf04ff] border-2 border-purple-200 shadow-none'
                                    : 'bg-[#bf04ff] hover:bg-[#a103d8] text-white border-2 border-[#bf04ff] shadow-purple-500/30'
                                }`}
                            >
                                {hasLiked ? 'Підтримано 💖' : 'Підтримати'}
                            </button>
                            <button className="flex-1 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
                                Наступний 
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Вкладка: ДОДАТИ КОТИКА */}
            {activeTab === 'addCat' && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 w-full max-w-md">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        Новий котик 📸
                    </h2>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <input 
                                type="text" 
                                placeholder="Ім'я котика (напр. Барсік)" 
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="number" 
                                placeholder="Вік (років)" 
                                min="0"
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <input 
                                type="url" 
                                placeholder="Посилання на фото (URL)" 
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <textarea 
                                placeholder="Розкажи трохи про нього..." 
                                rows="3"
                                className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors resize-none"
                            ></textarea>
                        </div>
                        
                        <div className="pt-2">
                            <button className="w-full bg-[#bf04ff] hover:bg-[#a103d8] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-purple-500/30">
                                Опублікувати 🐾
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* НОВА ВКЛАДКА: ЗАВДАННЯ */}
            {activeTab === 'tasks' && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 w-full max-w-md">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
                        Завдання 🏆
                    </h2>

                    <div className="space-y-4">
                        {/* Завдання 1 */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                    ⭐
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Оціни 5 котиків</h3>
                                    <p className="text-sm font-bold text-orange-500 mt-1">+ 50 🪙</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-bold text-gray-600 shadow-sm">
                                0 / 5
                            </div>
                        </div>

                        {/* Завдання 2 */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                    📸
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Додай свого котика</h3>
                                    <p className="text-sm font-bold text-orange-500 mt-1">+ 100 🪙</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-bold text-gray-600 shadow-sm">
                                0 / 1
                            </div>
                        </div>

                        {/* Завдання 3 */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 transition-colors hover:bg-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-sm">
                                    📅
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">Зайди 3 дні підряд</h3>
                                    <p className="text-sm font-bold text-orange-500 mt-1">+ 200 🪙</p>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm font-bold text-gray-600 shadow-sm">
                                1 / 3
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Вкладка Реєстрації/Авторизації */}
            {activeTab === 'auth' && (
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 rounded-full border-4 border-[#bf04ff] flex items-center justify-center">
                            <div className="w-4 h-4 bg-[#bf04ff] rounded-full"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-black text-center text-gray-900 mb-2">
                        {authMode === 'login' ? 'З поверненням! 🐾' : 'Створити акаунт 🐾'}
                    </h2>
                    <p className="text-center text-gray-500 mb-8">
                        {authMode === 'login' ? 'Увійдіть, щоб оцінювати котиків' : 'Приєднуйся до нашої пухнастої спільноти'}
                    </p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {authMode === 'register' && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ім'я / Нікнейм</label>
                                <input 
                                    type="text" 
                                    placeholder="Мурзик" 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input 
                                type="email" 
                                placeholder="yourcat@email.com" 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Пароль</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-[#bf04ff] focus:border-[#bf04ff] block p-3.5 outline-none transition-colors"
                            />
                        </div>
                        
                        <div className="pt-2">
                            <button className="w-full bg-[#bf04ff] hover:bg-[#a103d8] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-purple-500/30 mb-4">
                                {authMode === 'login' ? 'Увійти' : 'Зареєструватися'}
                            </button>
                            
                            <p className="text-center text-gray-500 font-medium">
                                {authMode === 'login' ? (
                                    <>
                                        Немає акаунту?{' '}
                                        <button 
                                            type="button"
                                            onClick={() => setAuthMode('register')} 
                                            className="text-[#bf04ff] hover:underline"
                                        >
                                            Зареєструватися
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        Вже є акаунт?{' '}
                                        <button 
                                            type="button"
                                            onClick={() => setAuthMode('login')} 
                                            className="text-[#bf04ff] hover:underline"
                                        >
                                            Увійти
                                        </button>
                                    </>
                                )}
                            </p>
                        </div>
                    </form>
                </div>
            )}

            {/* Заглушки */}
            {activeTab === 'explore' && <h2 className="text-3xl font-bold text-gray-400">Сторінка "Огляд" (В розробці)</h2>}
            {activeTab === 'rating' && <h2 className="text-3xl font-bold text-gray-400">Сторінка "Рейтинг" (В розробці)</h2>}
            {activeTab === 'mycats' && <h2 className="text-3xl font-bold text-gray-400">Сторінка "Мої котики" (В розробці)</h2>}
            {activeTab === 'profile' && <h2 className="text-3xl font-bold text-gray-400">Сторінка "Профіль" (В розробці)</h2>}

        </div>
    </div>
  );
}