//Tests para el componente Navbar.jsx
//Renderizado básico, elementos clave, interacciones y props y estados.
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {// Agrupa las pruebas del componente Navbar
    // Prueba que el componente se renderiza correctamente
    it('muestra el nombre EcoMarket', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        expect(screen.getByText(/EcoMarket/i)).toBeInTheDocument();
    });
    //Prueba que el enlace a inicio está presente
    it('tiene un enlace a Inicio', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /inicio/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/');
    });
    //Prueba que el enlace a Ofertas está presente
    it('tiene un enlace a Ofertas', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /ofertas/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/ofertas');
    });
    it('muestra el menú desplegable de categorías', () => {//lo mismo para el enlace a Categorías
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        expect(screen.getByText(/categorías/i)).toBeInTheDocument();
    });
    it('tiene un enlace a Novedades', () => {//lo mismo para el enlace a Novedades
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /novedades/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/novedades');
    });
    it('tiene un enlace a Preguntas frecuentes', () => {//lo mismo para el enlace a Preguntas frecuentes
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /preguntas frecuentes/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/preguntas-frecuentes');
    });
    it('tiene un enlace a Regístrate', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /regístrate/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/registrarse');
    });
    it('tiene un enlace a Inicia Sesión', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', { name: /inicia sesión/i });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/iniciar-sesion');
    });
    it('muestra el badge del carrito solo si hay productos', () => {
        // Carrito vacío: no debe haber badge
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        expect(screen.queryByText('0')).not.toBeInTheDocument();

        // Carrito con productos: debe mostrar el total
        render(
            <MemoryRouter>
                <Navbar cart={[{ id: 1, quantity: 3 }, { id: 2, quantity: 2 }]} />
            </MemoryRouter>
        );
        expect(screen.getByText('5')).toBeInTheDocument();
    });
    it('suma correctamente la cantidad de productos en el carrito', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[{ id: 1, quantity: 2 }, { id: 2, quantity: 4 }]} />
            </MemoryRouter>
        );
        expect(screen.getByText('6')).toBeInTheDocument();
    });
    it('tiene enlaces a todas las categorías', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        expect(screen.getByRole('link', { name: /dulce/i })).toHaveAttribute('href', '/categoria/dulce');
        expect(screen.getByRole('link', { name: /salado/i })).toHaveAttribute('href', '/categoria/salado');
        expect(screen.getByRole('link', { name: /integral/i })).toHaveAttribute('href', '/categoria/integral');
        expect(screen.getByRole('link', { name: /bebestibles/i })).toHaveAttribute('href', '/categoria/bebestibles');
    });
    it('el logo es un enlace a la página principal', () => {
        render(
            <MemoryRouter>
                <Navbar cart={[]} />
            </MemoryRouter>
        );
        const logo = screen.getByAltText(/EcoMarket/i);
        expect(logo.closest('a')).toHaveAttribute('href', '/');
    });
});