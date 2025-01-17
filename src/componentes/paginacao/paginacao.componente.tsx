import "./paginacao.css";
import { RootState } from "../../types/personagensType";
import { bindActionCreators } from 'redux';
import store from '../../store/index';
import { connect } from "react-redux";
import { fetchNovaPaginaThunk } from '../../store/actions/personagens.actions';

// componente com a opcao de navegar entre as paginas

const Paginacao = () => {
  
  const { paginacao } = store.getState().personagens;

  const nextPageHandler = () => {
    if(!paginacao.next) return;

    fetchNovaPaginaThunk(paginacao.next)(store.dispatch)
  }

  const prevPageHandler = () => {
    if(!paginacao.prev) return;

    fetchNovaPaginaThunk(paginacao.prev)(store.dispatch)
  }
  return (
    <div className="paginacao">
      <button disabled={!paginacao.prev} onClick={prevPageHandler} className={"primary"}>
        anterior
      </button>
      <button disabled={!paginacao.next} onClick={nextPageHandler} className={"primary"}>
        próximo
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens  
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({fetchNovaPaginaThunk}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Paginacao);