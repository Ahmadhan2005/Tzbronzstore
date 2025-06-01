// app/layout.js
import "./styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Tzbronzstore.id - Topup Game Online",
  description: "Toko topup game terpercaya dan cepat!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
