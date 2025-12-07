import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({url}) => {

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar />
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <Navbar />
        </div>

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="/list" replace />} />
            <Route path="/add" element={<Add  url={url}/>} />
            <Route path="/list" element={<List url={url}/>} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </div>
  )
}

export default App