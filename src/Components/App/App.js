import './App.css';
import React from 'react';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {PlayList} from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';
export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    searchResult: [],
    playListName: 'SUperduper Playlist',
    playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playListTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    } 
    tracks.push(track);
    this.setState({playListTracks: tracks})
    
  }

  removeTrack(track){
    let tracks = this.state.playListTracks;
    if(tracks.find(trackToRemove => trackToRemove.id === track.id)){
      tracks = tracks.filter(trackToRemove => trackToRemove.id != track.id);
      this.setState({playListTracks: tracks})
    } else {
      return;
    }
  }

  updatePlaylistName(name){
    this.setState({playListName: name});
  }

  savePlaylist(){
    const trackUris = this.state.playListTracks.map(track => track.uri);
    this.state.playListTracks.map(track => console.log('This is state track URI: ' + track.uri));
    Spotify.savePlaylist(this.state.playListName, trackUris).then(() => {
      this.setState({
        playListName: 'New Playlist',
        playListTracks: []
      })
    })
  }

  search(term){
    console.log(term);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResult: searchResults});
    })
  }

render(){
  return(
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResult} onAdd={this.addTrack}/>
      <PlayList tracks={this.state.playListTracks} 
      playListName={this.state.playListName}
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
  );
}
}



