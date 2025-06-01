
"use client";
import { useEffect, useState } from "react";
// Tambahkan import swal
import Swal from "sweetalert2";

async function getOrders() {
  const res = await fetch("/api/orders");
  const data = await res.json();
  return data.orders || [];
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  // PATCH endpoint sesuai API route.js
  const handleConfirmOrder = async (id) => {
    // SweetAlert konfirmasi
    const result = await Swal.fire({
      title: "Konfirmasi Pesanan",
      text: "Apakah Anda yakin ingin menandai pesanan ini sebagai selesai?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#8b5cf6",
      cancelButtonColor: "#d1d5db",
    });
    if (result.isConfirmed) {
      await fetch(`/api/orders`, {
        method: "PATCH",
        body: JSON.stringify({ id, status: "done" }),
        headers: { "Content-Type": "application/json" },
      });
      setOrders(await getOrders());
      Swal.fire("Berhasil!", "Pesanan telah dikonfirmasi.", "success");
    }
  };

  // DELETE endpoint (perlu disesuaikan juga di route.js jika belum)
  const handleDeleteOrder = async (id) => {
  const result = await Swal.fire({
    title: "Hapus Pesanan",
    text: "Apakah Anda yakin ingin menghapus pesanan ini? Tindakan ini tidak dapat dibatalkan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#d1d5db",
  });
  if (result.isConfirmed) {
    await fetch(`/api/orders`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    setOrders(await getOrders());
    Swal.fire("Terhapus!", "Pesanan telah dihapus.", "success");
  }
};


  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-purple-700 text-center">Admin Dashboard</h1>
      <div className="bg-white border border-purple-100 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-purple-700 text-center">Konfirmasi Penjualan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-purple-50 border-b border-purple-100">
                <th className="py-3 px-2 text-left font-semibold text-purple-700">User</th>
                <th className="py-3 px-2 text-left font-semibold text-purple-700">Produk</th>
                <th className="py-3 px-2 text-left font-semibold text-purple-700">Status</th>
                <th className="py-3 px-2 text-center font-semibold text-purple-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center text-purple-400 py-8">
                    Memuat data...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-purple-400 py-8">
                    Tidak ada data order.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr
                    key={o._id}
                    className="border-t border-purple-50 hover:bg-purple-50/60 transition"
                  >
                    <td className="py-2 px-2">{o.user}</td>
                    <td className="py-2 px-2">{o.product}</td>
                    <td className="py-2 px-2">
                      <span
                        className={
                          o.status === "done"
                            ? "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold"
                            : "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold"
                        }
                      >
                        {o.status === "done" ? "Selesai" : "Pending"}
                      </span>
                    </td>
                    <td className="py-2 px-2 text-center">
                      {o.status !== "done" ? (
                        <button
                          onClick={() => handleConfirmOrder(o._id)}
                          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-3 py-1 rounded font-bold text-xs mr-2 shadow hover:from-purple-700 hover:to-purple-500 transition"
                        >
                          Konfirmasi
                        </button>
                      ) : (
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded font-bold text-xs mr-2 shadow">
                          Selesai
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteOrder(o._id)}
                        className="bg-red-100 text-red-600 px-3 py-1 rounded font-bold text-xs shadow hover:bg-red-200 transition"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        table {
          border-collapse: separate;
          border-spacing: 0;
        }
      `}</style>
    </div>
  );
}