$(document).ready(function() {

  $('.resultado-pesquisa').hide();

  $('.search-box').keypress(function(e) {
    if (e.which == 13) { //Enter key pressed

        $('.resultados').show();        
		    $('.resultados').empty();        
        $('.resultado-pesquisa').hide();
        $('.resultado-pesquisa').empty();

      //ler o valor da caixa de input
      let search = $('.search-box').val();

      //ler o valor do filtro
      let option = $('.search-menu').val();

      //verificar o valor do filtro e cria o url dependendo da opção
	  
      if (option == 'artist') {

        var url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + search + '&fmt=json';
        var url = encodeURI(url);

        console.log(url);

        //fazer o pedido HTTP GET ao servico MusicBrainz
        $.get(url, function(response, status) {
          
          if (status == 'success') {  

            for (let artist of response.artists) {

              //div que contem toda a informação de um artista
              let div_artista = $('<div></div>').attr('class', 'artista');

              $('.resultados').append(div_artista);

               //div da imagem do artista

              var image_link = 'http://en.wikipedia.org/w/api.php?action=query&formatversion=2&titles='+ artist.name +'&prop=pageimages&pithumbsize=200&format=json&origin=*';
              var image_link = encodeURI(image_link);

                  $.get(image_link, function(response, status) {

                  let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                  div_artista.prepend(div_caixa_img);

                  if(response.query.pages[0].thumbnail){

                  var art_img = $('<img></img>').attr('class', 'art_img').attr('src',response.query.pages[0].thumbnail.source);
                  div_caixa_img.append(art_img);

                  }

                  else{

                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src','img/nosrc.png');
                    div_caixa_img.append(art_img);

                  }
                 

              });

              //div com o nome do artista
                 
                let div_nome = $('<div></div>').attr('class', 'nome');
                div_artista.append(div_nome);

                  let label_nome = $('<label></label>').attr('for', 'nome').html('Artist/Group: ' + artist.name);
                  div_nome.append(label_nome);


                  //div com o tipo do artista

                    let div_type = $('<div></div>').attr('class', 'type');
                    div_artista.append(div_type);

                      let label_type = $('<label></label>').attr('for', 'type').html('Type: ' + artist.type);
                      div_type.append(label_type);


                      //div com o score do artista

                          let div_score = $('<div></div>').attr('class', 'score');
                          div_artista.append(div_score);

                              let label_score = $('<label></label>').attr('for', 'score').html('Score: ' + artist.score);
                              div_score.append(label_score);

                                    //div com o pais do artista

                                    let div_country = $('<div></div>').attr('class', 'country');
                                    div_artista.append(div_country);                             

                                    if (artist.country == undefined) {

                                          
                                    }

                                    else{
                                            let label_country = $('<label></label>').attr('for', 'country').html('Country: ' + artist.country);
                                            div_country.append(label_country);
                                    }
                                }
		
               //  Dar hide do conteudo da pagina e mostrar a nova "pagina" com detalhes do artista e os seus albuns
     
                $('.artista').click(function(){
                    $('.resultados').hide();   
                     $('.resultado-pesquisa').show();


                     var artist_album = 'http://musicbrainz.org/ws/2/artist/' + artist.id + '?inc=releases&fmt=json';
                     var artist_album = encodeURI(artist_album);

                    $.get(artist_album, function(response, status) {                     
                     

                        let div_caixa_artist = $('<div></div>').attr('class','artist_namebox');
                        $('.resultado-pesquisa').append(div_caixa_artist);
                    
                            let label_caixa_artist =$('<label></label>').attr('class','artist_namebox_label').html(response.name);
                            div_caixa_artist.append(label_caixa_artist);

                                let div_caixa_real_artist = $('<div></div>').attr('class','artist_namebox_real');
                                $('.resultado-pesquisa').append(div_caixa_real_artist);
                    
                                    let label_caixa_realname =$('<label></label>').attr('class','artist_realname_label').html('Frank');
                                    div_caixa_real_artist.append(label_caixa_realname);

                                        let div_resumo_artist = $('<div></div>').attr('class','caixa_wiki');
                                        $('.resultado-pesquisa').append(div_resumo_artist);
                    
                                            let label_caixa_wiki =$('<label></label>').attr('class','wiki_label').html('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget purus egestas, hendrerit arcu eget, tristique urna. Praesent ultrices est eget velit dignissim, nec tincidunt ante malesuada. Sed in turpis pulvinar, blandit massa vel, condimentum turpis. Quisque bibendum placerat risus, ac iaculis tortor. Morbi vitae consequat quam. Aenean dignissim varius lacus, ac pretium purus pretium quis. In luctus finibus massa quis porttitor. Duis blandit, quam vel tempus aliquam, tellus urna iaculis eros, pharetra varius urna massa nec libero. Morbi lorem arcu, dictum a ornare sed, volutpat at lacus. ');
                                            div_resumo_artist.append(label_caixa_wiki);

                                                let div_img_artist = $('<div></div>').attr('class','caixa_img_artist');
                                                $('.resultado-pesquisa').append(div_img_artist); 

                                                    let div_img_box = $('<img></img>').attr('class','caixa_img_box').attr('src','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Beyonce_-_The_Formation_World_Tour%2C_at_Wembley_Stadium_in_London%2C_England.jpg/250px-Beyonce_-_The_Formation_World_Tour%2C_at_Wembley_Stadium_in_London%2C_England.jpg');
                                                    div_img_artist.append(div_img_box);
                    
                                                        let div_caixa_albums = $('<div></div>').attr('class','faixas_album');
                                                        $('.resultado-pesquisa').append(div_caixa_albums);
                                                            
                                                            let div_albums_name = $('<div></div>)').attr('class','albums_title').html('ALBUM');
                                                            div_caixa_albums.append(div_albums_name);
                                                            
                    
                                                                let label_albums_name = $('<label></label>').attr('class','label_albums_name').html('<br>who run the world');
                                                                div_albums_name.append(label_albums_name);
                    });                                                        
                                                                                                
                                                            
                    
          });

		  }

        });





      } else if (option == 'music') {

        var url = 'http://musicbrainz.org/ws/2/recording/?query=recording:' + search + '&fmt=json';
        var url = encodeURI(url);

        console.log(url);

        //fazer o pedido HTTP GET ao servico MusicBrainz
        $.get(url, function(response, status) {

          if (status == 'success') {

            for (let music of response.recordings) {

              //div que contem toda a informação de um artista
              let div_music = $('<div></div>').attr('class', 'music');
              $('.resultados').append(div_music);

                //div da imagem do artista
              
              var cover_music = "http://coverartarchive.org/release/"+music.releases[0].id;
              var cover_music = encodeURI(cover_music);
              
              $.get(cover_music, function(response, status) {
                
                var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                div_music.prepend(div_caixa_img);

                if(response.images[0].thumbnails.small){
                
                var div_art_img = $('<img></img>').attr('class', 'art_img').attr('src',response.images[0].thumbnails.small);
                div_caixa_img.append(div_art_img);

                }else{
                  
                let div_art_img = $('<img></img>').attr('class', 'art_img').attr('src','../img/nosrc.png');
                div_caixa_img.append(div_art_img);

                }

              });
                
              //div com o nome da musica

              let div_song = $('<div></div>').attr('class', 'song');
              div_music.append(div_song);

              let label_song = $('<label></label>').attr('for', 'song').html('Song: ' + music.title);
              div_song.append(label_song);


              //div com o score da music

              let div_score = $('<div></div>').attr('class', 'score');
              div_music.append(div_score);

              let label_score = $('<label></label>').attr('for', 'score').html('Score: ' + music.score);
              div_score.append(label_score);

              //div com o status da musica

              let div_status = $('<div></div>').attr('class', 'status');
              div_music.append(div_status);

              let label_status = $('<label></label>').attr('for', 'status').html('Status: ' + music.releases[0].status);
              div_status.append(label_status);

              //div com o A banda/artista pertencente da musica

              let div_artist_band = $('<div></div>').attr('class', 'artist-band');
              div_music.append(div_artist_band);

              let label_artist_band = $('<label></label>').attr('for', 'artist-band').html('Artist/Band: ' + music['artist-credit'][0].artist.name);
              div_artist_band.append(label_artist_band);


            }

          }
        });


      } else {

        var url = 'http://musicbrainz.org/ws/2/release/?query=release:' + search + '&fmt=json';
        var url = encodeURI(url);

        console.log(url);

        //fazer o pedido HTTP GET ao servico MusicBrainz
        $.get(url, function(response, status) {

          if (status == 'success') {


            for (let album of response.releases) {

              //div que contem toda a informação de um artista
              let div_release = $('<div></div>').attr('class', 'release');

              $('.resultados').append(div_release);

              //div da imagem do artista

              var cover = "http://coverartarchive.org/release/"+album.id;
              var cover = encodeURI(cover);

              
              
                 $.get(cover, function(response, status) {

                  

                  if (response.images[0].image) {

                    var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                    
                    div_release.prepend(div_caixa_img);

                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src',response.images[0].image);

                    div_caixa_img.append(art_img);

                  }
                  else{
                    
                    var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

                    div_release.append(div_caixa_img);
      
                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src',"/img/nosrc.png");
      
                    div_caixa_img.append(art_img);
                  }

              });
                         
              
              //div com o nome da banda/artista do album

              let div_band_artist = $('<div></div>').attr('class', 'band-artist');

              div_release.append(div_band_artist);

              let label_band_artist = $('<label></label>').attr('for', 'band-artist').html('Band/Artist: ' + album['artist-credit'][0].artist.name);

              div_band_artist.append(label_band_artist);

              //div com o nome da banda

              let div_album = $('<div></div>').attr('class', 'album');

              div_release.append(div_album);

              let label_album = $('<label></label>').attr('for', 'album').html('Album: ' + album.title);

              div_album.append(label_album);

              //div com as tracks do album

              let label_track = $('<label></label>').attr('for', 'track').html('Nº Tracks: ' + album.media[0]['track-count']);

              div_release.append(label_track);

              //div com o socre do album

              let div_score = $('<div></div>').attr('class', 'score');

              div_release.append(div_score);

              let label_score = $('<label></label>').attr('for', 'score').html('Score: ' + album.score);

              div_score.append(label_score);

            

            }
          }

        });

      }

    };
  });
});
