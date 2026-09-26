import { Outlet } from 'react-router'
import Nav from '../components/Nav'
import './Home.css'

export default function RootLayout() {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2023 Recipe App</p>
            </footer>
        </>
    )
}
