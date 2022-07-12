import { Link } from "react-router-dom";
import "./cabecalho.css";

/**
 * Cabeçalho que contém os links para navegar entre as páginas
 *
 * Uso: `<Cabecalho />`
 *
 * @returns Elemento JSX
 */
const Cabecalho = () => {
  return (
    <header>
      <div>
        <div>
          <h2>Exame Final de Frontend IV</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/favoritos">Favoritos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;