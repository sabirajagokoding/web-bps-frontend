import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function EditPublikasi() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, editPublication } = usePublications();
  const publication = publications.find(pub => pub.id === Number(id));

  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');
  const [successNotification, setSuccessNotification] = useState(false);

  useEffect(() => {
    if (publication) {
      setTitle(publication.title || '');
      setReleaseDate(publication.releaseDate || '');
      setDescription(publication.description || '');
      setCoverUrl(publication.coverUrl || '');
    }
  }, [publication]);

  useEffect(() => {
    if (!publication && publications.length > 0) {
      navigate('/publications');
    }
  }, [publication, publications, navigate]);

  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => {
        setSuccessNotification(false);
        navigate('/publications');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [successNotification, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!title || !releaseDate) {
        setError('Judul dan Tanggal Rilis harus diisi!');
        setLoading(false);
        return;
      }

      let newCoverUrl = coverUrl;

      if (coverFile) {
        newCoverUrl = await uploadImageToCloudinary(coverFile);
      }

      const updatedPublication = {
        ...publication,
        title,
        releaseDate,
        description,
        coverUrl: newCoverUrl,
      };

      await editPublication(updatedPublication);
      setSuccessNotification(true);
    } catch (err) {
      setError('Gagal memperbarui publikasi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/publications');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (error) setError('');
  };

  if (!publication && publications.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3a883f] mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat data publikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4faf5] flex items-center justify-center px-4 py-8 relative">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-8 relative">

        {successNotification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl">
            <div className="flex items-center space-x-3">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold">Berhasil!</p>
                <p className="text-sm">Publikasi berhasil diperbarui</p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-40 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a883f] mx-auto"></div>
              <p className="mt-4 text-gray-600 font-medium">Sedang memperbarui publikasi...</p>
            </div>
          </div>
        )}

        <h1 className="text-2xl font-bold text-[#3a883f] mb-6 text-center">Edit Publikasi</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-r">
            <div className="flex items-center">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Judul Publikasi</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              placeholder="Contoh: Indikator Ekonomi Sulawesi Tenggara 2025"
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a883f]"
              rows="4"
              placeholder="Deskripsi singkat tentang publikasi ini..."
              disabled={loading}
            />
          </div>

          {coverUrl && !coverFile && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sampul Saat Ini</label>
              <img
                src={coverUrl}
                alt="Cover Publikasi"
                className="h-32 w-auto object-cover rounded shadow-md mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/100x140/cccccc/ffffff?text=Error";
                }}
              />
            </div>
          )}

          <div>
            <label htmlFor="cover" className="block text-sm font-semibold text-gray-700 mb-1">Sampul Baru (Gambar)</label>
            <input
              type="file"
              id="cover"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">Pilih gambar baru jika ingin mengubah sampul</p>
          </div>

          {coverFile && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Preview Sampul Baru</label>
              <img
                src={URL.createObjectURL(coverFile)}
                alt="Preview Sampul Baru"
                className="h-32 w-auto object-cover rounded shadow-md mx-auto"
              />
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition duration-300"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-[#3a883f] hover:bg-[#2e6b32] text-white font-semibold py-2 px-6 rounded-lg transition duration-300 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
