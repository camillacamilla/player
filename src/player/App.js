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
    loaded: 0
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }
  renderLoadButton = (url, img) => {
    return (
      <img src={img} onClick={() => this.load(url)} />
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
          <aside>
            <img src="http://camillacamilla.com.br/images/menu.png"  alt="menu"/>
            <ul>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=B9FzVhw8_bY', 'http://camillacamilla.com.br/images/video1.jpg')}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=xIBiJ_SzJTA', 'http://camillacamilla.com.br/images/video2.jpg')}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=PsJK7tlBQOQ', 'http://camillacamilla.com.br/images/video3.jpg')}</li>
              <li>{this.renderLoadButton('https://www.youtube.com/watch?v=WSLMN6g_Od4&t=119s', 'http://camillacamilla.com.br/images/video4.jpg')}</li>
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
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={() => this.setState({ playing: true })}
              onPause={() => this.setState({ playing: false })}
              onBuffer={() => console.log('onBuffer')}
              onEnded={() => this.setState({ playing: false })}
              onError={e => console.log('onError', e)}
              onProgxress={this.onProgress}
              onDuration={duration => this.setState({ duration })}
            />
          </div>
          <div className="base-bar">
            <div className="controller">
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
              <button onClick={this.onClickFullscreen}>Fullscreen</button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
