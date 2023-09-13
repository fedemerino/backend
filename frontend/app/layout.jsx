import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from "./utils/NextToastify"
import "react-toastify/dist/ReactToastify.css"
import ReduxProvider from "@/redux/provider"
const inter = Inter({ subsets: ["latin"] })
export const metadata = {
  title: "Sneakers",
  description: "SNEAKERS",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={1200}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
            theme="dark"
          />
        </body>
      </ReduxProvider>
    </html>
  )
}
