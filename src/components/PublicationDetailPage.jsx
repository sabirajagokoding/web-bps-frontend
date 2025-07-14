import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePublications } from '../hooks/usePublications';

export default function PublicationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications } = usePublications();
  const publication = publications.find((p) => p.id === Number(id));

  if (!publication) {
    return (
      <div className="text-center py-12 text-gray-600">
        Publikasi tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4faf5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">

        {/* Judul dan Tanggal */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#3a883f] leading-snug">
            {publication.title}
          </h1>
        </div>
        {/* Gambar Sampul */}
        <div className="flex justify-center mb-6">
          <img
            src={publication.coverUrl}
            alt={`Cover of ${publication.title}`}
            className="w-52 h-auto rounded shadow-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/200x280/cccccc/ffffff?text=No+Image';
            }}
          />
        </div>
        <div className="flex justify-center mb-6">
          <p className="text-gray-500 mt-2 text-sm">
            Tanggal Rilis: {publication.releaseDate}
          </p>
        </div>
        <div className="mb-6 text-gray-700 whitespace-pre-wrap leading-relaxed">
          {publication.description || (
            <span className="italic text-gray-400">Tidak ada deskripsi.</span>
          )}
        </div>

        

        {/* Tombol Kembali */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#3a883f] hover:bg-[#2e6b32] text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
          >
            ← Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
