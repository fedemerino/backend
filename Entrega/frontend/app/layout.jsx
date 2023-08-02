import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from './utils/NextToastify'
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from '@/redux/provider'
import CheckUser from './utils/CheckUser'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'Sneakers',
  description: 'SNEAKERS'
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={inter.className}>
          <CheckUser />
          <Navbar />
          <div className='min-h-screen'>
            {children}
          </div>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={1500}
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
