import "./botao-favorito.css";
import { MouseEventHandler } from 'react';
import secondHeart from '../../icons/heart-second.svg';
import firstHeart from '../../icons/heart-first.svg';

type Props = {
  isFavorito: boolean;
  favoritoHandler?: MouseEventHandler; 
}

 const BotaoFavorito = ({ isFavorito , favoritoHandler }: Props) => {
  
  const src = isFavorito ? secondHeart : firstHeart;

  return (
    <button onClick={favoritoHandler} className="botao-favorito">
      <img src={src} alt="heart icon" />
    </button>
  );
};

export default BotaoFavorito;
