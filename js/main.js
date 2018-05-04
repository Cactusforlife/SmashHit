$(document).ready(function() {

  $('.search-box').keypress(function(e) {
    if (e.which == 13) { //Enter key pressed

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

            //div que fica responsavel para receber os resultado
            let div_resultados = $('<div></div>').attr('class', 'resultados');

            $('body').append(div_resultados);


            for (let artist of response.artists) {

              //div que contem toda a informação de um artista
              let div_artista = $('<div></div>').attr('class', 'artista');

              div_resultados.append(div_artista);

              //div da imagem do artista

              let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

              div_artista.append(div_caixa_img);

              let div_art_img = $('<img></img>').attr('class','div_art_img');

              div_caixa_img.append(div_art_img);




              //div com o nome do artista
              let div_nome = $('<div></div>').attr('class', 'nome');

              div_artista.append(div_nome);

              let label_nome = $('<label></label>').attr('for', 'nome').html('Artist/Group');

              div_nome.append(label_nome);

              label_nome.append($('<p></p>').text(artist.name));



              //div com o type do artista
              let div_type = $('<div></div>').attr('class', 'type');

              div_artista.append(div_type);

              let label_type = $('<label></label>').attr('for', 'type').html('Type');

              div_type.append(label_type);

              label_type.append($('<p></p>').text(artist.type));



              //div com o score do artista

              let div_score = $('<div></div>').attr('class', 'score');

              div_artista.append(div_score);

              let label_score = $('<label></label>').attr('for', 'score').html('Score');

              div_score.append(label_score);

              label_score.append($('<p></p>').text(artist.score));


            }




          }
        });


      } else if (option == 'music') {

        var url = 'http://musicbrainz.org/ws/2/recording/?query=recording:' + search + '&fmt=json';
        var url = encodeURI(url);

        console.log(url);

        //fazer o pedido HTTP GET ao servico MusicBrainz
        $.get(url, function(response, status) {

          if (status == 'success') {

            let div_resultados = $('<div></div>').attr('class', 'resultados');

            $('body').append(div_resultados);


            for (let music of response.recordings) {

              //div que contem toda a informação de um artista
              let div_music = $('<div></div>').attr('class', 'music');

              div_resultados.append(div_music);

              //div da imagem do artista

              let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

              div_artista.append(div_caixa_img);

              let div_art_img = $('<img></img>').attr('src').attr('class','div_art_img');

              div_caixa_img.append(div_art_img);


              //div com o nome da musica

              let div_song = $('<div></div>').attr('class', 'song');

              div_music.append(div_song);

              let label_song = $('<label></label>').attr('for', 'song').html('Song');

              div_song.append(label_song);

              label_song.append($('<p></p>').text(music.title));


              //div com o score da music

              let div_score = $('<div></div>').attr('class', 'score');

              div_music.append(div_score);

              let label_score = $('<label></label>').attr('for', 'score').html('Score');

              div_score.append(label_score);

              label_score.append($('<p></p>').text(music.score));


              //div com o status da musica

              let div_status = $('<div></div>').attr('class', 'status');

              div_music.append(div_status);

              let label_status = $('<label></label>').attr('for', 'status').html('Status');

              div_status.append(label_status);

              label_status.append($('<p></p>').text(music.status));

              //div com o A banda/artista pertencente da musica

              let div_artist_band = $('<div></div>').attr('class', 'artist-band');

              div_music.append(div_artist_band);

              let label_artist_band = $('<label></label>').attr('for', 'artist-band').html('Artist/Band');

              div_artist_band.append(label_artist_band);

              label_artist_band.append($('<p></p>').text(music['artist-credit'][0].artist.name));



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

            let div_resultados = $('<div></div>').attr('class', 'resultados');

            $('body').append(div_resultados);


            for (let album of response.releases) {

              //div que contem toda a informação de um artista
              let div_release = $('<div></div>').attr('class', 'release');

              div_resultados.append(div_release);

              //div da imagem do artista

              let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

              div_artista.append(div_caixa_img);

              let div_art_img = $('<img></img>').attr('src').attr('class','div_art_img');

              div_caixa_img.append(div_art_img);

              //div com o nome da banda/artista do album

              let div_band_artist = $('<div></div>').attr('class', 'band-artist');

              div_release.append(div_band_artist);

              let label_band_artist = $('<label></label>').attr('for', 'band-artist').html('Band/Artist');

              div_band_artist.append(label_band_artist);

              label_band_artist.append($('<p></p>').text(album['artist-credit'][0].artist.name));


              //div com o nome da banda

              let div_album = $('<div></div>').attr('class', 'album');

              div_release.append(div_album);

              let label_album = $('<label></label>').attr('for', 'album').html('Album');

              div_album.append(label_album);

              label_album.append($('<p></p>').text(album.title));


              //div com as tracks do album

              let div_track = $('<div></div>').attr('class', 'track');

              div_release.append(div_track);

              let label_track = $('<label></label>').attr('for', 'track').html('Nº Tracks');

              div_release.append(label_track);

              label_track.append($('<p></p>').text(album.media[0]['track-count']));

              //div com o socre do album

              let div_score = $('<div></div>').attr('class', 'score');

              div_release.append(div_score);

              let label_score = $('<label></label>').attr('for', 'score').html('Score');

              div_score.append(label_score);

              label_score.append($('<p></p>').text(album.score));



            }
          }

        });

      }

    };
  });
});
