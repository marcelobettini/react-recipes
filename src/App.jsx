//Segunda iteración más modular, aprovechando componentes reutilizables. 
//Aquí crearemos el componente Recipe.jsx (en components debería figurar como Recipe_1) y en él copiaremos el render
//resuelto antes en App.jsx
import './App.css'
import data from './data/data'
import Recipe from './components/Recipe'


function App() {
  return (
    <main className="container">
      {data.map((recipe, i) => (
        <Recipe {...recipe} key={i} />
      ))}
    </main>
  )
}

export default App
