(function(){
    function SongPlayer(Fixtures){
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }
        
        SongPlayer.currentSong = null;
        
        /*
        @desc Buzz object audio file
        @type {Object}
        */
        
        var currentBuzzObject = null;
        
        /*
        @fucntion setSong
        @desc Stops currently playing song and loads new audio file as currentBuzzObject
        @param {Object} song        
        */
        
        var setSong = function(song){
            if (currentBuzzObject){
                
            stopSong();
                
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl,{
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        }
 
        /*
        @desc playSong plays the current Buzz object
        @function playSong
        @param {object} song
        */

        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        }
        
        
        
        SongPlayer.play = function(song){
            
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song){
                setSong(song);
            
            playSong(song);
                
            } else if (SongPlayer.currentSong === song){
                if(currentBuzzObject.isPaused()){
                    playSong(song);
                    
                }
            }
        };

        
        
        SongPlayer.pause = function(song){
          
            song = song|| SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            song = song|| SongPlayer.currentSong;
            song.playing = false;
            
            if(currentSongIndex < 0){
                
                stopSong();
                
            }else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            song = song|| SongPlayer.currentSong;
            song.playing = false;
            
            if(currentSongIndex > (currentAlbum.songs.length - 1) ){
                
               stopSong();
               
            } else {
                   var song = currentAlbum.songs[currentSongIndex];
                   setSong(song);
                   playSong(song);
               }
        }
        
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSongPlaying = null;
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();