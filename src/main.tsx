import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import About from './pages/About.tsx'
import Recipes from './pages/Recipes.tsx'
import RecipeDetail from './pages/RecipeDetail.tsx'
import RootLayout from './pages/RootLayout.tsx'
import Home from './pages/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          element={<RootLayout />}
        >
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='/about'
            element={<About />}
          />
          <Route
            path='/recipes'
            element={<Recipes />}
          />
          <Route
            path='/recipes/:id'
            element={<RecipeDetail />}
          />
        </Route>
        <Route
          path='*'
          element={<h1>404 Not Found</h1>}
        />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
