"use client";
import { useEffect, useState } from "react";

export default function RiwayatTransaksi() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.username) {
        setOrders([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/orders?user=${user.username}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">Riwayat Transaksi</h2>
      {loading ? (
        <div className="text-center text-purple-400">Memuat data...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-purple-400">Belum ada transaksi.</div>
      ) : (
        <div className="bg-white border border-purple-100 rounded-xl shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-purple-700 border-b border-purple-100">
                <th className="py-2 text-left">Tanggal</th>
                <th className="py-2 text-left">Game</th>
                <th className="py-2 text-left">User ID</th>
                <th className="py-2 text-left">Paket</th>
                <th className="py-2 text-left">Pembayaran</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b border-purple-50 hover:bg-purple-50/40 transition">
                  <td className="py-2">{new Date(o.createdAt).toLocaleString("id-ID")}</td>
                  <td className="py-2">{o.game}</td>
                  <td className="py-2">{o.userId}</td>
                  <td className="py-2">{o.product}</td>
                  <td className="py-2 capitalize">{o.payment}</td>
                  <td className="py-2">
                    <span
                      className={
                        o.status === "done"
                          ? "text-green-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {o.status === "done" ? "Selesai" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}