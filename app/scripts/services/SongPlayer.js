(function(){
    function SongPlayer($rootScope, Fixtures){
        var SongPlayer = {};
        
        var currentAlbum = Fixtures.getAlbum();
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }
        
        SongPlayer.currentSong = null;
        
        /*
        @desc Current playback time (in seconds) of currently playing song
        @type {number}
        */
        SongPlayer.currentTime = null;
        
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
            
            currentBuzzObject.bind('timeupdate', function(){
              $rootScope.$apply(function(){
                  SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
        };
        
        SongPlayer.setCurrentTime = function(time){
            if (currentBuzzObject){
                currentBuzzObject.setTime(time);
            }
        };
        
        var stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSongPlaying = null;
        }
        
        SongPlayer.volume = null;
        
        SongPlayer.setVolume = function(volume){
            if (currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();