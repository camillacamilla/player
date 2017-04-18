import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import screenfull from 'screenfull'

import 'normalize.css/normalize.css'
import './defaults.scss'
import './App.scss'

import { version } from '../../package.json'
import ReactPlayer from '../ReactPlayer'

export default class App extends Component {
  state = {
    url: null,
    playing: true,
    volume: 0.8,
    played: 0,
    loaded: 0,
    hide: false,
    video: 0
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      playing: true
    });
  }
  hide () {
    this.setState({hide: !this.state.hide});
  }
  playAndHide (url,id) {
    this.setState({video: id});
    this.load(url);
    this.hide();
  }
  playPause = () => {
    this.setState({playing: !this.state.playing})
  }
  stop = () => {
    this.setState({url: null, playing: false})
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  renderLoadButton = (url, img, id) => {
    return (
      <div>
        <div id={id} className="assistindo"> {this.state.video === id ? 'Assistindo' : ''}</div>
       <img className={this.state.video === id ? 'img_active' : ''} src={img} onClick={() => this.playAndHide(url, id)}/>
      </div>
    )
  }

  render () {
    const {
      url, playing, volume,
      played, loaded, duration,
      playbackRate,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state
    return (
      <div className='app'>
        <section className='section'>
          <img className="menuAction" onClick={this.hide.bind(this)} src="http://camillacamilla.com.br/images/menu.png" alt="menu"/>
          <aside className={'menu ' + (this.state.hide ? 'hidden' : 'active')}>
            <ul>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=B9FzVhw8_bY', 'http://camillacamilla.com.br/images/video1.jpg', 1)}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=xIBiJ_SzJTA', 'http://camillacamilla.com.br/images/video2.jpg', 2)}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=PsJK7tlBQOQ', 'http://camillacamilla.com.br/images/video3.jpg', 3)}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=WSLMN6g_Od4&t=119s', 'http://camillacamilla.com.br/images/video4.jpg', 4)}</li>
            </ul>
          </aside>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={player => { this.player = player }}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              playing={playing}
              playbackRate={playbackRate}
              volume={volume}
              soundcloudConfig={soundcloudConfig}
              vimeoConfig={vimeoConfig}
              youtubeConfig={youtubeConfig}
              fileConfig={fileConfig}
              onPlay={() => this.setState({playing: true})}
              onPause={() => this.setState({playing: false})}
              onEnded={() => this.setState({playing: false})}
              onProgxress={this.onProgress}
            />
          </div>
          <div className="base-bar">
            <div className="controller">
              <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
              <button onClick={this.onClickFullscreen}>Fullscreen</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
