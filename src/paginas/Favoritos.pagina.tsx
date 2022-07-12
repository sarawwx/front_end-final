import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import store from '../store/index';
import { connect } from 'react-redux';
import { RootState } from '../types/personagensType';
import { useEffect } from "react";
import { fetchFavPersonagensThunk, removerTodosFavs } from "../store/actions/personagens.actions";
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';

const PaginaFavoritos = () => {
  const { favIdPersonagens, favPersonagens, isFetching, errorMessage } = store.getState().personagens;

  useEffect(() => {
    if(!favIdPersonagens.length) return;

    fetchFavPersonagensThunk(favIdPersonagens)(store.dispatch);
  },[])


  const removerFavsHandler = () => {
    store.dispatch(removerTodosFavs());
  }

  return (
    <div className="container">
      <Helmet>
        <title>Favoritos</title>
        <link type="image/png" sizes="32x32" rel="icon" href="https://img.icons8.com/plasticine/100/000000/rick-sanchez.png" />
      </Helmet>
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button disabled={!favIdPersonagens.length} className="danger" onClick={removerFavsHandler}>Remover favoritos</button>
      </div>
      {errorMessage && <span>Erro ao recuperar personagens favoritos: {errorMessage}</span>}
      {isFetching && <span>Carregando personagens favoritos...</span>}
      {!favIdPersonagens.length ? <span className="favoritos-vazio">Nenhum personagem favorito</span>: <GradePersonagens personagens={favPersonagens}/>}
    </div>
  );
};


const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const mapDispatchToProps = (dispatch: any) => {
  return  bindActionCreators({ 
    removerTodosFavs, 
    fetchFavPersonagensThunk 
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaFavoritos);