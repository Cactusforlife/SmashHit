$(document).ready(function() {

  $('.search-box').keypress(function(e) {
    if (e.which == 13) { //Enter key pressed

        $('.resultados').show();
        
		$('.resultados').empty();

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

              console.log(response.artists.length);

              //div que contem toda a informação de um artista
              let div_artista = $('<div></div>').attr('class', 'artista');

              $('.resultados').append(div_artista);

               //div da imagem do artista

              var image_link = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + artist.name + '&prop=images&format=json';
              var image_link = encodeURI(image_link);

              console.log(image_link);

              $.get(image_link, function(response, status) {


                  let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                  
                  div_artista.append(div_caixa_img);

                  var art_img = $('<img></img>').attr('class', 'art_img').attr('src',response.query.pages[83688].images[0].title);

                  div_caixa_img.append(art_img);

                

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

            }
		
		//Dar hide do conteudo da pagina e mostrar a nova "pagina" com detalhes do artista e os seus albuns

     
                $('.artista').click(function(){
                    $('.resultados').hide();     

                        let div_caixa_artist = $('<div></div>').attr('class','artist_namebox').html('Artist name ');
                        $('.resultado-pesquisa').append(div_caixa_artist);

                            let div_caixa_real_artist = $('<div></div>').attr('class','artist_namebox_real').html('Real name');
                            $('.resultado-pesquisa').append(div_caixa_real_artist);

                                let div_resumo_artist = $('<div></div>').attr('class','caixa_wiki');
                                $('.resultado-pesquisa').append(div_resumo_artist);

                                    let div_caixa_album = $('<div></div>').attr('class','caixa_album').html('Albuns');
                                    $('.resultado-pesquisa').append(div_caixa_album);                 


                    
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
       
                let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                div_music.append(div_caixa_img);
                
                let div_art_img = $('<img></img>').attr('class', 'div_art_img').attr('src',response.images[0].image);
                div_caixa_img.append(div_art_img);

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
                    
                    div_release.append(div_caixa_img);

                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src',response.images[0].image);

                    div_caixa_img.append(art_img);

                  }
                  else{
                    
                    var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

                    div_release.append(div_caixa_img);
      
                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src',"../img/nosrc.png");
      
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
