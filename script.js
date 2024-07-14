let songs = [
    {id:1, name: 'Aigiri Nandini', artist: 'Brodha V', image: 'https://files.codingninjas.in/image2-28694.jpg',genre: 'Rap', source:'AIGIRI NANDINI.mp3'},,
    {id:2, name: 'Apna Time Ayega', artist: 'Divine', image: 'https://ninjasfiles.s3.amazonaws.com/asset_0000000000000020_1549743985_macbook_mouse.jpg',genre: 'Rap', source:'Apna Time Aayega.mp3'},
    {id:3, name: 'Rock On', artist: 'Farhan Akhthar', image: 'https://files.codingninjas.in/image2-28694.jpg',genre: 'Rock', source:'Rock On.mp3'},
    {id:4, name: 'Pichale Sat dino Me', artist: 'Farhan Akhtar', image: 'https://files.codingninjas.in/image1-28708.jpg',genre: 'Rock', source:'Pichle saat Dinon Mein.mp3'},
    {id:5, name: 'Hamare Sath shri Raghunath', artist: 'Prembhushan Maharaj', image: 'https://files.codingninjas.in/image2-28694.jpg',genre: 'Devotional', source:'Hamare Sath Shri Raghunath.mp3'}
];

let playList = [];

//Section where the songs will be displayed after application of filter.
const SongContainer = document.getElementById('filtered-song-container');

//Section where the Song will be played with other details
const songCard = document.getElementById('Song-Card');


const mainC = document.getElementById('main-container');

//This is used to apply toggle effect for main header
const main_header = document.getElementById('main-header');


let SongFn; //this was created just to debug some errors

//console.log(`SongFn: ${SongFn}`)


//Body element location used to apply dark theme based on toggle.
const bodyEle = document.querySelector('body');
const allbody = document.querySelectorAll('body');

SongContainer.style.display = 'flex';
SongContainer.style.flexDirection = 'column';
SongContainer.style.justifyContent ='space-between'
//SongContainer.style.height = '50vh';


//it is the location of dropdown on which the change event listener is applied.
const allSongFilter = document.getElementById('filter-dropdown');

//Div section where drop-down is implemented.
const filterSectionDiv = document.getElementById('filter-section');

//This used tp apply toggle effect to the screenfor Dark Theme.
const themeToggler = document.getElementById('flexSwitchCheckDefault');

const playlistSection = document.getElementById('PlayList-Section');
//Current Playlist Name is useful in displaying the contents of the current playlist which is selected.
let currentPlayListName = '';

//Div Where the current playlists song will be listed.
const currPlaylistDiv = document.getElementById('CurrentPlaylist');
const currPlaySongContainer = document.createElement('div');
currPlaylistDiv.appendChild(currPlaySongContainer);

const allPlayListDivContainer = document.createElement('div');


//The background of body before the toggle.
bodyEle.style.backgroundColor = '#F9F2F0';
let flag = false;

//Implementation of toggle switch. 
themeToggler.addEventListener('click',(event) => {

    if (bodyEle.style.backgroundColor === 'rgb(249, 242, 240)'){
        bodyEle.style.backgroundColor = 'grey';
        filterSectionDiv.style.backgroundColor = '#404040';
        filterSectionDiv.style.color = 'white';
        flag = true;
        //let children = SongContainer.children;
        //for (let i = 0; i < children.length; i++) {
          //  if (children[i].style.backgroundColor != 'grey'){
            //children[i].style.backgroundColor = "grey";
            //}
          //}

        //changing background of song-card

        songCard.style.backgroundColor = '#404040';
        playlistSection.style.backgroundColor = '#404040';
        currPlaylistDiv.style.color = 'white';
        AllPlayListDiv.style.color = 'white';
        main_header.style.color = 'white';
        
        

    }
    else{
        flag = false;
        bodyEle.style.backgroundColor = '#F9F2F0';
        filterSectionDiv.style.backgroundColor = '#84AFF2';
        filterSectionDiv.style.color = 'black';
        songCard.style.backgroundColor = '#84AFF2';
        playlistSection.style.backgroundColor = '#84AFF2';
        currPlaylistDiv.style.color = 'black';
        AllPlayListDiv.style.color = 'black';
        main_header.style.color = 'black';
        
        
    }
});

//Following two are the locations of Playlist creation in HTML.
const createPlayListButton = document.getElementById('Playlist-button');
const playlistInputName = document.getElementById('playListInput');

//This is the div where all created playlists will be shown. Once playlist is created it will be appended in All Playlist Section.
const AllPlayListDiv = document.getElementById('AllPlayLists');
AllPlayListDiv.appendChild(allPlayListDivContainer);
//PlayList Create Section
createPlayListButton.addEventListener('click',(event)=>{
    if (playlistInputName.value === ''){
        alert('Please enter Valid Playlist Name');
    }
    else{
    
    const btn_playlist = document.createElement('button');
    btn_playlist.textContent = playlistInputName.value;
    if (flag==false){
        btn_playlist.style.backgroundColor = '#3171D5';
        }
    else if(flag==true){
        btn_playlist.style.backgroundColor = '#999999';
    }
        themeToggler.addEventListener('click', function (){
            buttonColor(btn_playlist);
        });
    btn_playlist.style.marginTop = '0.8rem';
    btn_playlist.style.width = '70%';
    btn_playlist.style.height = '2.5rem';
    btn_playlist.style.borderRadius = '10%';
    btn_playlist.style.display = 'block';

    const allPlayListDivContainer = document.createElement('div');
    AllPlayListDiv.appendChild(allPlayListDivContainer)
    
    allPlayListDivContainer.appendChild(btn_playlist);

    //Above the playlist Array is created. Once playlist is created. Then for that playlist one object will be created
    // This Object will hold all songs added to the playlist.
    const temp_playlist_object = {};
    //Playlist Name will be given as property of the object.
    temp_playlist_object.name = playlistInputName.value;
    //Set is used to hold the songs. Sets are used to avoid duplicate displays on the screen.
    temp_playlist_object.song1 = new Set();
    playList.push(temp_playlist_object);

    //This event listner will only show the List of songs in selected Playlist.
    btn_playlist.addEventListener('click',function(){
        //currPlaylistDiv.textContent ='Current PlayList';
        currPlaySongContainer.textContent = '';
        //songdiv.textContent ='';
        currentPlayListName = btn_playlist.textContent;
        
        //To Show the songs from Playlist.
        showSongsinPlayList(currentPlayListName);
    });
    }
    playlistInputName.value = ''
})

//The All songs filter code based on Genre is below.
allSongFilter.addEventListener('change',(event)=>{
    SongContainer.textContent = '';
    //This is for the all songs.
    if (event.target.value == "filter-All-Songs"){
        //Button is created for each song when all songs are selected.
        songs.forEach((song) => {
            const btn = document.createElement('button');
            btn.style.display = 'block';
            btn.textContent = song.name;
            if (flag==false){
            btn.style.backgroundColor = '#3171D5';
            }
            else if(flag==true){
                btn.style.backgroundColor = '#999999';
            }
            themeToggler.addEventListener('click', function (){
                buttonColor(btn);
            });
            
            btn.style.marginTop = '0.8rem';
            btn.style.width = '70%';
            btn.style.height = '2.5rem';
            btn.style.borderRadius = '10%';
            SongContainer.appendChild(btn);


            const songObj = {...song};
            btn.addEventListener('click',(event)=>{
                // Common function is used in all filters to play the song from Song Card section.
                SongCardPlaySection(songObj);
                

            });

        })   
    }

    // For Rap song

    else if (event.target.value == "filter-Rap-Song"){
        songs.forEach((song) => {
            if (song.genre == "Rap"){
                const btn = document.createElement('button');
                btn.style.display = 'block';
                btn.textContent = song.name;
                if (flag==false){
                    btn.style.backgroundColor = '#3171D5';
                    }
                    else if(flag==true){
                        btn.style.backgroundColor = '#999999';
                    }
                    themeToggler.addEventListener('click', function (){
                        buttonColor(btn);
                    });
                btn.style.marginTop = '0.8rem';
                btn.style.width = '70%';
                btn.style.height = '2.5rem';
                btn.style.borderRadius = '10%';
                SongContainer.appendChild(btn);
                
                const songObj = {...song};
                btn.addEventListener('click',(event)=>{
                    // Common function is used in all filters to play the song from Song Card section.
                    SongCardPlaySection(songObj);

            });
        }

        })   
    }

    //For Devotional
    else if (event.target.value == "filter-Devotional-Songs"){
        songs.forEach((song) => {
            if (song.genre == "Devotional"){
                const btn = document.createElement('button');
            btn.style.display = 'block';
            btn.textContent = song.name;
            if (flag==false){
                btn.style.backgroundColor = '#3171D5';
                }
                else if(flag==true){
                    btn.style.backgroundColor = '#999999';
                }
                themeToggler.addEventListener('click', function (){
                    buttonColor(btn);
                });
            btn.style.marginTop = '0.8rem';
            btn.style.width = '70%';
            btn.style.height = '2.5rem';
            btn.style.borderRadius = '10%';
            SongContainer.appendChild(btn);

            const songObj = {...song};
            btn.addEventListener('click',(event)=>{
                // Common function is used in all filters to play the song from Song Card section.
                SongCardPlaySection(songObj);

            });
        }

        })   
    }


    // For Rock Song
    else if (event.target.value == "filter-Rock-Song"){
        songs.forEach((song) => {
            if (song.genre == "Rock"){
                const btn = document.createElement('button');
            btn.style.display = 'block';
            btn.textContent = song.name;
            if (flag==false){
                btn.style.backgroundColor = '#3171D5';
                }
                else if(flag==true){
                    btn.style.backgroundColor = '#999999';
                }
                themeToggler.addEventListener('click', function (){
                    buttonColor(btn);
                });
            btn.style.marginTop = '0.8rem';
            btn.style.width = '70%';
            btn.style.height = '2.5rem';
            btn.style.borderRadius = '10%';
            SongContainer.appendChild(btn);

            const songObj = {...song};
            btn.addEventListener('click',(event)=>{
                // Common function is used in all filters to play the song from Song Card section.
                SongCardPlaySection(songObj);
            });
        }

        })   
    }

    
    //Function used to play previous song on clicking previous button.
    function previousSong(song){
        console.log(song.id)
        if (song.id == 2){
            nextSongElement = songs[0];
            console.log(nextSongElement)
            SongCardPlaySection(nextSongElement);
        }
        else if(song.id == 1){
            nextSongElement = songs[songs.length-1];
            console.log(nextSongElement)
            SongCardPlaySection(nextSongElement);
        }
        else{
            nextSongElement = songs[song.id-1];
            console.log(nextSongElement)
            SongCardPlaySection(nextSongElement);
        }
    }
    
    //Function used to play Next song on clicking Next button.
    function nextSong(song){
        //console.log(song)
    
        if (song.id == songs.length-1){
            nextSongElement = songs[0];
            console.log(nextSongElement)
            SongCardPlaySection(nextSongElement);
        }
        else{
            nextSongElement = songs[song.id+1];
            console.log(nextSongElement)
            SongCardPlaySection(nextSongElement);
        }
    }

//This function will play the song in Middle section when played through the All songs and filters.
    function SongCardPlaySection(song){
        songCard.textContent ='';
                const imageContainer = document.createElement('div');
                if (flag==false){
                    imageContainer.style.backgroundColor = '#3171D5';
                    }
                    else if(flag == true){
                        imageContainer.style.backgroundColor = '#999999';
                    }
                themeToggler.addEventListener('click', function(){
                    imageContainerColorSongCard(imageContainer);
                });
                
                imageContainer.style.width = '80%';
                imageContainer.style.marginTop = '4%';
                const songImage = document.createElement('img');
                songImage.src = song.image;
                songImage.style.paddingLeft = '5%';
                songImage.style.width = '90%';
                imageContainer.style.paddingTop = '5%';
                imageContainer.style.marginBottom = '5%';
                imageContainer.style.borderRadius = '5%';
                imageContainer.style.boxShadow = '0px 0px 6px 4px rgba(72, 8, 107, 0.7)';
                imageContainer.appendChild(songImage);
                songCard.appendChild(imageContainer);

                //Adding song Name
                const songName = document.createElement('h3');
                songName.textContent = song.name;
                songName.style.paddingLeft = '5%';
                imageContainer.appendChild(songName);

                //Adding Song Artist
                const songAuthor = document.createElement('p');
                songAuthor.textContent = song.artist;
                songAuthor.style.paddingLeft = '5%';
                imageContainer.appendChild(songAuthor);

                const audioPlayer = new Audio(song.source);
                                        //audioPlayer.src = song.source;
                                    audioPlayer.controls = 'controls'
                                    audioPlayer.style.height = '10%';
                                    songCard.appendChild(audioPlayer)
                        
                                    audioPlayer.play();

                //Prev and next Button
                const btnContainer = document.createElement('div');
                btnContainer.style.width ='100%';
                btnContainer.style.height = '10%';
                btnContainer.style.display = 'flex';
                btnContainer.style.flexDirection = 'row';
                btnContainer.style.justifyContent = 'center';
                btnContainer.style.marginTop = '10%';
                const prevSong = document.createElement('button');
                prevSong.textContent = 'Previous';
                prevSong.id = 'prev_song_id';
                prevSong.style.height = '50%';
                prevSong.style.width = '20%';
                prevSong.style.backgroundColor = 'rgb(153, 0, 153)'
                
                btnContainer.appendChild(prevSong);
                prevSong.addEventListener('click',function(){
                    previousSong(song);
                })

                prevSong.style.fontSize = '100%';

                //Next Button
                //const btnContainer = document.createElement('div');
                const nxtSong = document.createElement('button');
                nxtSong.textContent = 'Next';
                nxtSong.style.marginLeft = '5px';
                nxtSong.id = 'nxt_song_id';
                nxtSong.style.height = '50%';
                nxtSong.style.width = '20%';
                btnContainer.appendChild(nxtSong);
                nxtSong.style.fontSize = '100%';
                nxtSong.style.backgroundColor = 'rgb(153, 0, 153)'
                songCard.appendChild(btnContainer);

                nxtSong.addEventListener('click',function(){
                    nextSong(song);
                })

                //Add to Playlist Button

                const addToPlayList = document.createElement('button');
                addToPlayList.textContent = 'Add to PlayList';
                addToPlayList.style.marginTop = '3%';
               addToPlayList.style.backgroundColor = 'rgb(153, 0, 153)'
                songCard.appendChild(addToPlayList);

                //Event listner. When clicked song should be added to Playlist.
                addToPlayList.addEventListener('click', (event) => {
                    if (currentPlayListName === ''){
                        alert('Select PlayList or Create Playlist first');
                    }
                    else{
                        playList.forEach((ele) => {
                            if (ele.name === currentPlayListName){
                                if (ele.song1.has(song) == false){
                                ele.song1.add(song);
                                const songbtn = document.createElement('button');
                                songbtn.style.display = 'block';
                                songbtn.textContent = song.name;
                                if (flag==false){
                                    songbtn.style.backgroundColor = '#3171D5';
                                    }
                                else if(flag == true){
                                    songbtn.style.backgroundColor = '#999999';
                                }
                                    themeToggler.addEventListener('click', function (){
                                        buttonColor(songbtn);
                                    });
                                //songbtn.style.marginTop = '0.8rem';
                                songbtn.style.width = '80%';
                                songbtn.style.height = '2.5rem';
                                songbtn.style.borderRadius = '10%';
                                songbtn.addEventListener('click',(event)=>{
                                   songCard.textContent ='';
                                   SongCardPlaySection(song);                                    
                                })
                                currPlaySongContainer.appendChild(songbtn);
                                //showSongsinPlayList(currentPlayListName);
                                }
                            }
                        })
                    }
                })
    }

    
    
    SongFn = SongCardPlaySection
    
    
    
})

//Function implemented to show the songs present in Selected Playlist.
function showSongsinPlayList(playListName){
    
    
    let count = 0;

    playList.forEach((ele)=>{
        if (ele.name === playListName){
            ele.song1.forEach((songname) => {
                const currPlayBtn = document.createElement('button');
                currPlayBtn.style.display = 'block';
                currPlayBtn.textContent = songname.name;
                if (flag==false){
                    currPlayBtn.style.backgroundColor = '#3171D5';
                    }
                else if(flag == true){
                    currPlayBtn.style.backgroundColor = '#999999';
                }
                    themeToggler.addEventListener('click', function (){
                        buttonColor(currPlayBtn);
                    });
                currPlayBtn.style.marginTop = '0.8rem';
                currPlayBtn.style.width = '90%';
                currPlayBtn.style.height = '2.9rem';
                currPlayBtn.style.borderRadius = '10%';

                currPlaySongContainer.appendChild(currPlayBtn);
                //console.log(playList);
                //console.log(songname)

                currPlayBtn.addEventListener('click', function(){
                    let songObj1 = {...songname};
                    //Function used for the Playing of song from the Playlist.
                    PlaySongFromPlayList(songname.name,songObj1,ele,songname);
                });
            })
        }
    })
    
}


function previousSongPL(song){
    console.log(`Playlist: ${song.id}`)
    if (song.id == 2){
        nextSongElement = songs[0];
        console.log(nextSongElement)
        PlaySongFromPlayList(song.name,nextSongElement,'','');
    }
    else if(song.id == 1){
        nextSongElement = songs[songs.length-1];
        console.log(nextSongElement)
        PlaySongFromPlayList(song.name,nextSongElement,'','');
    }
    else{
        nextSongElement = songs[song.id-1];
        console.log(nextSongElement)
        PlaySongFromPlayList(song.name,nextSongElement,'','');
    }
}

function nextSongPL(song){
    if (song.id == songs.length-1){
        nextSongElement = songs[0];
        console.log(nextSongElement)
        PlaySongFromPlayList(song.name,nextSongElement,'','');
    }
    else{
        nextSongElement = songs[song.id+1];
        console.log(nextSongElement)
        PlaySongFromPlayList(song.name,nextSongElement,'','');
    }
}

function PlaySongFromPlayList(songname,song,selectedPL,songobjdl){
    console.log('abcd');
    songs.forEach((ele) => {
        if(ele.name === songname){
            songCard.textContent= ''
            const imageContainer = document.createElement('div');
            if (flag==false){
            imageContainer.style.backgroundColor = '#3171D5';
            }
            else if(flag == true){
                imageContainer.style.backgroundColor = '#999999';
            }
            themeToggler.addEventListener('click', function(){
                imageContainerColorSongCard(imageContainer);
            });
                imageContainer.style.width = '80%';
                imageContainer.style.marginTop = '4%';
                const songImage = document.createElement('img');
                songImage.src = song.image;
                songImage.style.paddingLeft = '5%';
                songImage.style.width = '90%';
                imageContainer.style.paddingTop = '5%';
                imageContainer.style.marginBottom = '5%';
                imageContainer.style.borderRadius = '5%';
                imageContainer.style.boxShadow = '0px 0px 6px 4px rgba(72, 8, 107, 0.7)';
                imageContainer.appendChild(songImage);
                songCard.appendChild(imageContainer);



                //Adding song Name
                const songName = document.createElement('h3');
                songName.textContent = song.name;
                songName.style.paddingLeft = '5%';
                imageContainer.appendChild(songName);

                //Adding Song Artist
                const songAuthor = document.createElement('p');
                songAuthor.textContent = song.artist;
                songAuthor.style.paddingLeft = '5%';
                imageContainer.appendChild(songAuthor);
            const audioPlayer = new Audio(ele.source);
                //audioPlayer.src = song.source;
            audioPlayer.controls = 'controls'
            audioPlayer.style.height = '10%';
            songCard.appendChild(audioPlayer)

            audioPlayer.play();
            //Prev and next Button
            const btnContainer = document.createElement('div');
            btnContainer.style.width ='100%';
            btnContainer.style.height = '10%';
            btnContainer.style.display = 'flex';
            btnContainer.style.flexDirection = 'row';
            btnContainer.style.justifyContent = 'center';
            btnContainer.style.marginTop = '10%';
            const prevSong = document.createElement('button');
            prevSong.textContent = 'Previous';
            prevSong.id = 'prev_song_id';
            prevSong.style.height = '50%';
            prevSong.style.width = '20%';
            prevSong.style.backgroundColor = 'rgb(153, 0, 153)'
            
            btnContainer.appendChild(prevSong);

            prevSong.style.fontSize = '100%';

            btnContainer.appendChild(prevSong);
                prevSong.addEventListener('click',function(){
                    previousSongPL(song);
                })

            //Next Button
            //const btnContainer = document.createElement('div');
            const nxtSong = document.createElement('button');
            nxtSong.textContent = 'Next';
            nxtSong.style.marginLeft = '5px';
            nxtSong.id = 'nxt_song_id';
            nxtSong.style.height = '50%';
            nxtSong.style.width = '20%';
            nxtSong.style.backgroundColor = 'rgb(153, 0, 153)'
            btnContainer.appendChild(nxtSong);
            nxtSong.style.fontSize = '100%';
            songCard.appendChild(btnContainer);

            nxtSong.addEventListener('click',function(){
                console.log(song);
                nextSongPL(song);
            })

            //Remove From Playlist Button
            const removeFromPlayList = document.createElement('button');
            removeFromPlayList.textContent = 'Remove From PlayList';
            removeFromPlayList.style.marginTop = '3%';
            removeFromPlayList.style.backgroundColor = 'rgb(153, 0, 153)'
                songCard.appendChild(removeFromPlayList);

            removeFromPlayList.addEventListener('click',()=>{
                //console.log('selectedPL')
                //console.log(selectedPL)
                playList.forEach((ele1)=>{
                    if (ele1.name === selectedPL.name){
                        ele1.song1.forEach((ele2)=>{
                        //console.log('ele2')
                            //console.log(songName)
                            if (ele2.name == songName.textContent){
                                console.log('ele2')
                                console.log(ele2)
                                ele1.song1.delete(ele2);
                                //showSongsinPlayList(selectedPL.name);
                                //songCard.textContent = '';
                            }
                        })
                    }
                })
            })
        }
    })
    
}

function buttonColor(btn){
    if (btn.style.backgroundColor === 'rgb(49, 113, 213)'){
        btn.style.backgroundColor = '#999999';
    }
    else{
    btn.style.backgroundColor = '#3171D5';
    }
    
}

function imageContainerColorSongCard(imageContainer1){
    if (imageContainer1.style.backgroundColor == 'rgb(49, 113, 213)'){
        imageContainer1.style.backgroundColor = '#999999';
    }
    else{
    imageContainer1.style.backgroundColor = '#3171D5';
    }

}


//Code for Searching Song.

const searchButton = document.getElementById('Search-Button');
const searchInput = document.getElementById('Song-search');

searchButton.addEventListener('click',()=>{
    if (searchInput.value == ''){
        alert('Please enter Song name to Search');
    }
    else{
        let songExistFlag = false;
        songs.forEach((obj)=>{
            if (obj.name == searchInput.value){
                songExistFlag = true;
                const btn_song = document.createElement('button');
                btn_song.textContent = searchInput.value;
                songCard.textContent ='';
                btn_song.style.width = '80%';
                if (flag==false){
                    btn_song.style.backgroundColor = '#3171D5';
                    }
                    else if(flag==true){
                        btn_song.style.backgroundColor = '#999999';
                    }
                    themeToggler.addEventListener('click', function (){
                        buttonColor(btn_song);
                    });
                btn_song.style.position = 'relative';
                btn_song.style.marginBottom = '80%';
        
                songCard.appendChild(btn_song);
                searchInput.value = ''
        
                btn_song.addEventListener('click',()=>{
                    songs.forEach((songel)=>{
                        if (songel.name == btn_song.textContent){
                            console.log('xxxx');
                            PlaySongfromSearch(songel);
                        }
                    })
                })
            }
            
        })
        if (songExistFlag==false){
            alert('This song is not available.')
        }
        
    }
})



function previousSong(song){
    console.log(song.id)
    if (song.id == 2){
        nextSongElement = songs[0];
        console.log(nextSongElement)
        PlaySongfromSearch(nextSongElement);
    }
    else if(song.id == 1){
        nextSongElement = songs[songs.length-1];
        console.log(nextSongElement)
        PlaySongfromSearch(nextSongElement);
    }
    else{
        nextSongElement = songs[song.id-1];
        console.log(nextSongElement)
        PlaySongfromSearch(nextSongElement);
    }
}


function nextSong(song){
    //console.log(song)

    if (song.id == songs.length-1){
        nextSongElement = songs[0];
        console.log(nextSongElement)
        PlaySongfromSearch(nextSongElement);
    }
    else{
        nextSongElement = songs[song.id+1];
        console.log(nextSongElement)
        PlaySongfromSearch(nextSongElement);
    }
}




function PlaySongfromSearch(song){
    songCard.textContent ='';
                const imageContainer = document.createElement('div');
                if (flag==false){
                    imageContainer.style.backgroundColor = '#3171D5';
                    }
                    else if(flag == true){
                        imageContainer.style.backgroundColor = '#999999';
                    }
                themeToggler.addEventListener('click', function(){
                    imageContainerColorSongCard(imageContainer);
                });
                
                imageContainer.style.width = '80%';
                imageContainer.style.marginTop = '4%';
                const songImage = document.createElement('img');
                songImage.src = song.image;
                songImage.style.paddingLeft = '5%';
                songImage.style.width = '90%';
                imageContainer.style.paddingTop = '5%';
                imageContainer.style.marginBottom = '5%';
                imageContainer.style.borderRadius = '5%';
                imageContainer.style.boxShadow = '0px 0px 6px 4px rgba(72, 8, 107, 0.7)';
                imageContainer.appendChild(songImage);
                songCard.appendChild(imageContainer);

                //Adding song Name
                const songName = document.createElement('h3');
                songName.textContent = song.name;
                songName.style.paddingLeft = '5%';
                imageContainer.appendChild(songName);

                //Adding Song Artist
                const songAuthor = document.createElement('p');
                songAuthor.textContent = song.artist;
                songAuthor.style.paddingLeft = '5%';
                imageContainer.appendChild(songAuthor);

                const audioPlayer = new Audio(song.source);
                                        //audioPlayer.src = song.source;
                                    audioPlayer.controls = 'controls'
                                    audioPlayer.style.height = '10%';
                                    songCard.appendChild(audioPlayer)
                        
                                    audioPlayer.play();

                //Prev and next Button
                const btnContainer = document.createElement('div');
                btnContainer.style.width ='100%';
                btnContainer.style.height = '10%';
                btnContainer.style.display = 'flex';
                btnContainer.style.flexDirection = 'row';
                btnContainer.style.justifyContent = 'center';
                btnContainer.style.marginTop = '10%';
                const prevSong = document.createElement('button');
                prevSong.textContent = 'Previous';
                prevSong.id = 'prev_song_id';
                prevSong.style.height = '50%';
                prevSong.style.width = '20%';
                prevSong.style.backgroundColor = 'rgb(153, 0, 153)'
                
                btnContainer.appendChild(prevSong);
                prevSong.addEventListener('click',function(){
                    previousSong(song);
                })

                prevSong.style.fontSize = '100%';

                //Next Button
                //const btnContainer = document.createElement('div');
                const nxtSong = document.createElement('button');
                nxtSong.textContent = 'Next';
                nxtSong.style.marginLeft = '5px';
                nxtSong.id = 'nxt_song_id';
                nxtSong.style.height = '50%';
                nxtSong.style.width = '20%';
                btnContainer.appendChild(nxtSong);
                nxtSong.style.fontSize = '100%';
                nxtSong.style.backgroundColor = 'rgb(153, 0, 153)'
                songCard.appendChild(btnContainer);

                nxtSong.addEventListener('click',function(){
                    nextSong(song);
                })

                //Add to Playlist Button

                const addToPlayList = document.createElement('button');
                addToPlayList.textContent = 'Add to PlayList';
                addToPlayList.style.marginTop = '3%';
               addToPlayList.style.backgroundColor = 'rgb(153, 0, 153)'
                songCard.appendChild(addToPlayList);

                addToPlayList.addEventListener('click', (event) => {
                    if (currentPlayListName === ''){
                        alert('Select PlayList or Create Playlist first');
                    }
                    else{
                        playList.forEach((ele) => {
                            if (ele.name === currentPlayListName){
                                if (ele.song1.has(song) == false){
                                ele.song1.add(song);
                                const songbtn = document.createElement('button');
                                songbtn.style.display = 'block';
                                songbtn.textContent = song.name;
                                if (flag==false){
                                    songbtn.style.backgroundColor = '#3171D5';
                                    }
                                else if(flag == true){
                                    songbtn.style.backgroundColor = '#999999';
                                }
                                    themeToggler.addEventListener('click', function (){
                                        buttonColor(songbtn);
                                    });
                                //songbtn.style.marginTop = '0.8rem';
                                songbtn.style.width = '70%';
                                songbtn.style.height = '2.5rem';
                                songbtn.style.borderRadius = '10%';
                                songbtn.addEventListener('click',(event)=>{
                                   songCard.textContent ='';
                                   SongCardPlaySection(song);                                    
                                })
                                currPlaySongContainer.appendChild(songbtn);
                                //showSongsinPlayList(currentPlayListName);
                                }
                            }
                        })
                    }
                })
}



//Code For PlayList Search

const searchPlButton = document.getElementById('Search-Pl-button');
const searchPlInput = document.getElementById('Search-PlayList');

searchPlButton.addEventListener('click',()=>{
    if (searchPlInput.value == ''){
        alert('Please enter Playlist name to Search');
    }
    else{
        const btn_song = document.createElement('button');
        btn_song.textContent = searchPlInput.value;
        currPlaySongContainer.textContent ='';
        allPlayListDivContainer.textContent='';
        const SearchedOp = document.createElement('div');
        const searchHeading = document.createElement('h4');
        searchHeading.textContent = "Searched Playlist";
        //SearchedOp.textContent = 'Searched PlayList';
        SearchedOp.style.marginTop = '2%';
        SearchedOp.appendChild(searchHeading);
        playlistSection.appendChild(SearchedOp);
        
        
        //SearchedOp.style.fontSize = '500';
        btn_song.style.width = '80%';
        if (flag==false){
            btn_song.style.backgroundColor = '#3171D5';
            }
            else if(flag==true){
                btn_song.style.backgroundColor = '#999999';
            }
            themeToggler.addEventListener('click', function (){
                buttonColor(btn_song);
            });
        btn_song.style.position = 'relative';
        btn_song.style.marginBottom = '80%';

        SearchedOp.appendChild(btn_song);
        searchInput.value = ''

        btn_song.addEventListener('click',()=>{
            playList.forEach((songel)=>{
                if (songel.name == btn_song.textContent){
                    showSongsinPlayList(songel.name);
                    SearchedOp.textContent = '';
                    
                
                }
            })
        })
    }
})