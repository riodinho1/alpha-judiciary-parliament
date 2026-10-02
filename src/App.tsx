import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { CaseReviewPage } from './pages/CaseReviewPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PardonProcessPage } from './pages/PardonProcessPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="case-review" element={<CaseReviewPage />} />
          <Route path="pardon-process" element={<PardonProcessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
