import React, { useState } from 'react';
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddCat({ onAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Будь ласка, обери фото!");
    
    setLoading(true);
    try {
      // 1. Завантажуємо фото в Storage
      const storageRef = ref(storage, `cats/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const imageUrl = await getDownloadURL(storageRef);

      // 2. Зберігаємо дані в Firestore
      await addDoc(collection(db, "cats"), {
        name,
        age: parseInt(age),
        breed,
        imageUrl: imageUrl, // Тепер тут посилання на справжнє фото
        likes: 0
      });

      alert("Котика успішно виставлено! 🐾");
      onAdded();
    } catch (error) {
      console.error("Помилка:", error);
      alert("Щось пішло не так при завантаженні.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-purple-50">
      <h2 className="text-2xl font-bold text-purple-600 mb-6 text-center">Виставити котика 🐈</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Поле для вибору фото */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-100 rounded-2xl p-4 bg-purple-50/30">
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          />
          {imageFile && <p className="mt-2 text-xs text-purple-600 font-medium">Обрано: {imageFile.name}</p>}
        </div>

        <input placeholder="Ім'я котика" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Вік" type="number" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition" value={age} onChange={e => setAge(e.target.value)} required />
        <input placeholder="Порода або короткий опис" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition" value={breed} onChange={e => setBreed(e.target.value)} required />
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 ${loading ? 'bg-gray-300' : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-100'}`}
        >
          {loading ? 'Завантаження...' : 'Зберегти та виставити'}
        </button>
      </form>
    </div>
  );
}