import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shell } from '@/components/layout/Shell';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Transactions = lazy(() => import('@/pages/Transactions'));
const Budget = lazy(() => import('@/pages/Budget'));
const Goals = lazy(() => import('@/pages/Goals'));
const Cards = lazy(() => import('@/pages/Cards'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Settings = lazy(() => import('@/pages/Settings'));

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Suspense fallback={<LoadingFallback />}><Dashboard /></Suspense>} />
          <Route path="transactions" element={<Suspense fallback={<LoadingFallback />}><Transactions /></Suspense>} />
          <Route path="budget" element={<Suspense fallback={<LoadingFallback />}><Budget /></Suspense>} />
          <Route path="goals" element={<Suspense fallback={<LoadingFallback />}><Goals /></Suspense>} />
          <Route path="cards" element={<Suspense fallback={<LoadingFallback />}><Cards /></Suspense>} />
          <Route path="analytics" element={<Suspense fallback={<LoadingFallback />}><Analytics /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<LoadingFallback />}><Settings /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
