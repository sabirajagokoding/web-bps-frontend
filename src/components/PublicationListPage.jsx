import React from "react";
import { useNavigate } from "react-router-dom";
import { usePublications } from "../hooks/usePublications";

export default function PublicationListPage() {
  const { publications, deletePublication } = usePublications();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("Publikasi ini akan dihapus. Apakah Anda yakin?")) {
      try {
        await deletePublication(id);
      } catch (err) {
        alert("Gagal menghapus publikasi: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4faf5] py-10 px-4 sm:px-6 lg:px-8">
      <header className="mb-8 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2e6b32]">
          Daftar Publikasi BPS Provinsi Sulawesi Tenggara
        </h1>

        <p className="text-gray-600 mt-1">Sumber data publikasi terkini</p>
      </header>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-[#2f6846] text-white text-xs uppercase">
            <tr>
              <th className="px-6 py-3 text-center w-16">No</th>
              <th className="px-6 py-3">Judul</th>
              <th className="px-6 py-3">Tanggal Rilis</th>
              <th className="px-6 py-3 text-center">Sampul</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {publications.map((pub, idx) => (
              <tr
                key={pub.id}
                className="bg-white border-b hover:bg-[#f0f8f4] transition"
              >
                <td className="px-6 py-4 text-center font-semibold text-gray-800">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">
                  {pub.title}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {new Date(pub.releaseDate).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-center">
                  <img
                    src={pub.coverUrl}
                    alt={`Sampul ${pub.title}`}
                    className="h-24 w-auto object-cover rounded shadow-md inline-block"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/100x140/cccccc/ffffff?text=No+Image";
                    }}
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <button
                      onClick={() => navigate(`/publications/edit/${pub.id}`)}
                      className="bg-white border border-[#2f6846] text-[#2f6846] hover:bg-[#245339] hover:text-white font-semibold py-1 px-4 rounded-md text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/publications/${pub.id}`)}
                      className="bg-white border border-[#2f6846] text-[#2f6846] hover:bg-[#245339] hover:text-white font-semibold py-1 px-4 rounded-md text-sm transition"
                    >
                      Detail
                    </button>
                    <button
                      onClick={() => handleDelete(pub.id)}
                      className="bg-white border border-[#2f6846] text-[#2f6846] hover:bg-[#245339] hover:text-white font-semibold py-1 px-4 rounded-md text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {publications.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Belum ada publikasi yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
