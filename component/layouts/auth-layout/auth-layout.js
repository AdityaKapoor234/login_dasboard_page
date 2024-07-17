import 'react-toastify/dist/ReactToastify.css';
import React from "react";


export default function AuthLayoutComponent({ children, image }) {

  return (
    <div>
      <main className="auth-layout-body">
        <div className='container-fluid auth-layout-container'>
          <div className='row auth-layout-row'>
            <div className='col-md-6 auth-hero-container ' style={{ background: `url(${image})` }}>
            </div>
            <div className='col-md-6 col-sm-12'>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
