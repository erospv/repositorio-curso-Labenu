import React from 'react'
import './Post.css'

import styled from 'styled-components'
import {IconeComContador} from '../IconeComContador/IconeComContador'
import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import iconeMarcacaoPreto from '../../img/bookmark-black.svg'
import iconeMarcacaoBranco from '../../img/bookmark-white.svg'
import iconeCompartilhar from '../../img/send.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'
import {IconeSemContador} from '../IconeSemContador/IconeSemContador'
import { SecaoCompartilhar } from '../SecaoCompartilhar/SecaoCompartilhar'

// Styled Components

const ContainerPost = styled.div`
  border: 1px solid gray;
  width: 300px;
  margin-bottom: 10px;
`

const PostHead = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 10px;
`
const PostFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: flex-start;  
`

import {IconeComContador} from '../IconeComContador/IconeComContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'


class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    marcacao: false,
    compartilhar: false
  }

  onClickCurtida = () => {
    this.setState({
      curtido: !this.state.curtido
    })
    if (!this.state.curtido) {
      this.setState({numeroCurtidas: this.state.numeroCurtidas + 1})
    } else {
      this.setState({numeroCurtidas: this.state.numeroCurtidas - 1})
    }
  }

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    }) 
  }


  onClickMarcacao = () => {
    this.setState({
      marcacao: !this.state.marcacao
    })
  }

  onClickCompartilhar = () => {
    this.setState({
      compartilhar: !this.state.compartilhar
    })
  }

  aoEnviarComentario = () => {
    this.setState({
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }

  render() {
    let iconeCurtida

    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }


    let iconeMarcacao

    if(this.state.marcacao) {
      iconeMarcacao = iconeMarcacaoPreto
    } else {
      iconeMarcacao = iconeMarcacaoBranco
    }

    let componenteCompartilhamento

    if (this.state.compartilhar) {
      componenteCompartilhamento = <SecaoCompartilhar/>
    }

    let componenteComentario

    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }


    return <ContainerPost>
      <PostHead>
        <img className={'user-photo'} src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </PostHead>

      <img className={'post-photo'} src={this.props.fotoPost} alt={'Imagem do post'}/>

      {componenteCompartilhamento}

      <PostFooter>
        
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={this.onClickComentario}
          valorContador={this.state.numeroComentarios}
        />
        
        <IconeSemContador
          icone={iconeCompartilhar}
          onClickIcone={this.onClickCompartilhar}
        />

        <IconeSemContador
          id={'icon-bookmark'}
          icone={iconeMarcacao}
          onClickIcone={this.onClickMarcacao}
        />  
      </PostFooter>
      {componenteComentario}
    </ContainerPost>
  }
}

export default Post