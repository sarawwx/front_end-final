import { Link } from "react-router-dom";
import "./cabecalho.css";

//  no cabeçalho tem os links para navegação entre as páginas

const Cabecalho = () => {
  return (
    <header>
      <div>
        <div>
          <h2>FINAL</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">início</Link>
            </li>
            <li>
              <Link to="/favoritos">favoritos</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Cabecalho;