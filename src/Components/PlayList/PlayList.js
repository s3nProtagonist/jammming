import React from 'react';
import './PlayList.css';
import {TrackList} from '../TrackList/TrackList';
export class PlayList extends React.Component{
    constructor(props){
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(e){
        this.props.onNameChange(e);
    }
    render(){
        return (
            <div className="Playlist">
                <input defaultValue={this.props.playListName}
                onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.tracks} 
                onRemove={this.props.onRemove}
                isRemoval={true}/>
                 <button className="Playlist-save"
                 onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}