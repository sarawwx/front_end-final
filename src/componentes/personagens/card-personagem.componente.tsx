import BotaoFavorito from "../botoes/botao-favorito.componente";
import "./card-personagem.css";
import { Personagem } from "../../types/personagensType";
import store from '../../store/index';
import { bindActionCreators } from 'redux';
import { updateFavPersonagem } from "../../store/actions/personagens.actions";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = {
  personagem: Personagem;
}

// card para cada personagem da grade

const CardPersonagem = ({ personagem }: Props) => {
  
  const navigate = useNavigate();

  const favoritoHandler = () => { 
    store.dispatch(updateFavPersonagem(personagem.id));
  }

  const detalheHandler = () => {
    navigate(`/${personagem.id}`)
  }

  return (
    <div className="card-personagem">
      <img
        src={personagem.image}
        alt={personagem.name}
      />
      <div className="card-personagem-body">
        <span>{personagem.name}</span>
        <button className="primary" onClick={detalheHandler}>info</button>
        <BotaoFavorito isFavorito={personagem.favorito} favoritoHandler={favoritoHandler}/>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateFavPersonagem }, dispatch)
}


export default connect(mapDispatchToProps)(CardPersonagem);
