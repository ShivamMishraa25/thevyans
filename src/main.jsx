import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import './css/homepage.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'

// Lazy load page components
const Homepage = lazy(() => import('./pages/Homepage.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))

// Skeleton fallback component
function Skeleton() {
  return (
    <div className="skeleton-fallback">
      <div className="skeleton-header"></div>
      <div className="skeleton-section"></div>
      <div className="skeleton-section"></div>
      <div className="skeleton-section"></div>
      <div className="skeleton-footer"></div>
    </div>
  );
}

// Create router outside of render
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Homepage />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Skeleton />}>
        <NotFound />
      </Suspense>
    )
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Skeleton />}>
        <AdminPanel />
      </Suspense>
    )
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Skeleton />}>
        <Login />
      </Suspense>
    )
  }
],
{
  basename: "/thevyans/"
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
