import React, { useState } from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function AddPublicationPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const { addPublication } = usePublications();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    let coverUrl = '';
    if (coverFile) {
      try {
        coverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert('Gagal upload gambar: ' + err.message);
        return;
      }
    } else {
      coverUrl = `https://placehold.co/200x280/7f8c8d/ffffff?text=${encodeURIComponent(title)}`;
    }

    const newPublication = {
      title,
      releaseDate,
      description,
      coverUrl,
    };

    try {
      await addPublication(newPublication);
      navigate('/publications');
      setTitle('');
      setReleaseDate('');
      setDescription('');
      setCoverFile(null);
    } catch (err) {
      alert('Gagal menambah publikasi: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faf5] flex items-center justify-center px-4 py-8">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-[#3a883f] mb-6 text-center">Tambah Publikasi Baru</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Judul Publikasi</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              placeholder="Contoh: Sulawesi Tenggara Dalam Angka 2024"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              placeholder="Contoh: Publikasi ini membahas Indikator Ekonomi Bengkulu 2025 secara mendalam."
              rows={4}
            />
          </div>

          <div>
            <label htmlFor="releaseDate" className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Rilis</label>
            <input
              type="date"
              id="releaseDate"
              value={releaseDate}
              onChange={e => setReleaseDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
            />
          </div>

          <div>
            <label htmlFor="cover" className="block text-sm font-semibold text-gray-700 mb-1">Sampul (Gambar)</label>
            <input
              type="file"
              id="cover"
              accept="image/*"
              onChange={e => setCoverFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#3a883f] hover:bg-[#2e6b32] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
