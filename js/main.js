$(document).ready(function () {

  $('.resultado-pesquisa').hide();

  $('.search-box').keypress(function (e) {
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
        $.get(url, function (response, status) {

            if (status == 'success') {

              for (let artist of response.artists) {

                //div que contem toda a informação de um artista
                let div_artista = $('<div></div>').attr('class', 'default').click(resultados_artista);

                $('.resultados').append(div_artista);

                //div da imagem do artista

                var image_link = 'http://en.wikipedia.org/w/api.php?action=query&formatversion=2&titles=' + artist.name + '&prop=pageimages&pithumbsize=200&format=json&origin=*';
                var image_link = encodeURI(image_link);



                $.get(image_link, function (response, status) {

                  let div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                  div_artista.prepend(div_caixa_img);

                  if (response.query.pages[0].thumbnail) {

                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src', response.query.pages[0].thumbnail.source);
                    div_caixa_img.append(art_img);

                  } else {

                    var art_img = $('<img></img>').attr('class', 'art_img').attr('src', 'img/nosrc.png');
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


                } else {
                  let label_country = $('<label></label>').attr('for', 'country').html('Country: ' + artist.country);
                  div_country.append(label_country);
                }


                //  Dar hide do conteudo da pagina e mostrar a nova "pagina" com detalhes do artista e os seus albuns
                 /* ****************************
                 *** RESULTADO  DO ARTISTA *****
                 *******************************/ 

                function resultados_artista() {

                  $('.resultados').hide();
                  $('.resultado-pesquisa').show();


                  var artist_album = 'http://musicbrainz.org/ws/2/artist/' + artist.id + '?inc=releases&fmt=json';
                  var artist_album = encodeURI(artist_album);

                  $.get(artist_album, function (response, status) {

                    console.log(artist_album);


                    let div_caixa_artist = $('<div></div>').attr('class', 'artist_namebox');
                    $('.resultado-pesquisa').append(div_caixa_artist);

                    let label_caixa_artist = $('<label></label>').attr('class', 'artist_namebox_label').html(response.name);
                    div_caixa_artist.append(label_caixa_artist);

                    console.log(response.disambiguation);

                    
                    if (response.disambiguation == ""){
                        $('.artist_namebox_real').hide();
                    }else{
                        let div_caixa_real_artist = $('<div></div>').attr('class', 'artist_namebox_real');
                        $('.resultado-pesquisa').append(div_caixa_real_artist);
                        let label_caixa_realname = $('<label></label>').attr('class', 'artist_realname_label').html(response.disambiguation);
                        div_caixa_real_artist.append(label_caixa_realname);                        
                    }
                    //Vai buscar a Bio do artista a partir da wikipedia API
                      

                    let div_resumo_artist = $('<div></div>').attr('class', 'caixa_wiki');
                    $('.resultado-pesquisa').append(div_resumo_artist);

                    var wiki_information = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=extracts&format=json&exintro=&titles=' + response.name + '&origin=*';
                    var wiki_information = encodeURI(wiki_information);

                    console.log(wiki_information);

                    $.get(wiki_information, function (response, status) {

                      console.log(response.query.pages[0].extract);
                      console.log(response.query.pages[0].missing);


                      if (response.query.pages[0].extract == "<p><b>" + response.query.pages[0].title + "</b> may refer to:</p>\n\n" || response.query.pages[0].extract == "<p><b>" + response.query.pages[0].title + "</b> may refer to:</p>") {

                        var label_caixa_wiki = $('<label></label>').attr('class', 'wiki_label').html('Infelizmente não se encontra informação sobre o artista');
                        div_resumo_artist.append(label_caixa_wiki);

                      } else if (response.query.pages[0].missing == true) {

                        var label_caixa_wiki = $('<label></label>').attr('class', 'wiki_label').html('Infelizmente não se encontra informação sobre o artista');
                        div_resumo_artist.append(label_caixa_wiki);

                      } else {

                        var label_caixa_wiki = $('<label></label>').attr('class', 'wiki_label').html(response.query.pages[0].extract);
                        div_resumo_artist.append(label_caixa_wiki);

                      }



                    });

                    //Vai buscar a imagem do artista a partir da API da wikipedia

                    var resultados_image = 'http://en.wikipedia.org/w/api.php?action=query&formatversion=2&titles=' + response.name + '&prop=pageimages&pithumbsize=200&format=json&origin=*';
                    var resultados_image = encodeURI(resultados_image);



                    $.get(resultados_image, function (response, status) {

                      var div_img_artist = $('<div></div>').attr('class', 'caixa_img_artist');
                      $('.resultado-pesquisa').append(div_img_artist);

                      if (response.query.pages[0].thumbnail) {

                        var div_img_box = $('<img></img>').attr('class', 'caixa_img_box').attr('src', response.query.pages[0].thumbnail.source);
                        div_img_artist.append(div_img_box);

                      } else {

                        var div_img_box = $('<img></img>').attr('class', 'caixa_img_box').attr('src', 'img/nosrc.png');
                        div_img_artist.append(div_img_box);


                      }



                    });

                    //mostra todos os albums do artista / banda

                    let div_caixa_albums = $('<div></div>').attr('class', 'faixas_album');
                    $('.resultado-pesquisa').append(div_caixa_albums);

                    let div_albums_name = $('<div></div>)').attr('class', 'albums_title').html('ALBUMS'+'<br>');
                    div_caixa_albums.append(div_albums_name);

                    var album_titles = 'http://musicbrainz.org/ws/2/release-group?artist=' + artist.id + '&fmt=json';
                    var album_titles = encodeURI(album_titles);

                    $.get(album_titles, function (response, status) {


                      console.log(album_titles);

                      if (response['release-groups'] == "") {

                        let label_albums_name = $('<label></label>').attr('class', 'label_albums_name').html('Não existe albums para este artista');
                        div_albums_name.append(label_albums_name);

                      } else {

                        for (let i = 0; i < response['release-groups'].length; i++) {

                          let label_albums_name = $('<label></label>').attr('class', 'label_albums_name').html(response['release-groups'][i].title +'<br>').click(album_description);
                          div_albums_name.append(label_albums_name);


                          function album_description() {

                            $('.resultado-pesquisa').empty();
                              
                            var album_link = 'http://musicbrainz.org/ws/2/release-group/?query=rgid:' + response['release-groups'][i].id + '&fmt=json';
                            var album_link = encodeURI(album_link);

                            console.log(album_link);


                            $.get(album_link, function (response, status) {

                                /* Band_artist É ONDE FICA O NOME DO ALBUM EM QUESTAO*/
                                let band_artist = $('<div></div>').attr('class', 'band-artist').html(response['release-groups'][0].title);
                                $('.resultado-pesquisa').append(band_artist);


                                //DIV onde vai ter a imagem do album

                                var cover_music = "http://coverartarchive.org/release-group/" + response['release-groups'][0].id;
                                var cover_music = encodeURI(cover_music);

                                console.log(cover_music);

                                $.get(cover_music, function (response, status) {

                                  let div_img_album = $('<div></div>').attr('class', 'img_ablum');
                                  $('.resultado-pesquisa').append(div_img_album);

                                  let img_album = $('<img></img>').attr('src', response.images[0].thumbnails.small);
                                  div_img_album.append(img_album);
                                  
                                }).fail(function () {

                                   let div_img_album = $('<div></div>').attr('class', 'img_ablum');
                                   $('.resultado-pesquisa').append(div_img_album);

                                   let img_album = $('<img></img>').attr('src','img/nosrc.png');
                                   div_img_album.append(img_album);


                                });

                                /* DIV PRINCIPAL QUE VAI TER DOIS DIVS, ESQUERDA= TRACKS DIREITA = IFRAME DO VIDEO DA MUSICA DO YOUTUBE */
                                let albums_outline_track = $('<div></div>').attr('class', 'albums_outline');
                                $('.resultado-pesquisa').append(albums_outline_track);


                                var musica_album_link = 'http://musicbrainz.org/ws/2/recording/?query=rgid:' + response['release-groups'][0].id + '&fmt=json';
                                var musica_album_link = encodeURI(musica_album_link)

                                console.log(musica_album_link);

                                $.get(musica_album_link, function (response, status) {

                                  /* CAIXA QUE VAI AMOSTRAR AS MUSICAS DO ALBUM COM UM CICLO */
                                  let albums_esquerda = $('<div></div>').attr('class', 'albums_esquerda');
                                  albums_outline_track.append(albums_esquerda);

                                  for(let i = 0; i < response.recordings.length; i++ ){

                                    let label_album_esquerda = $('<label></label>').html(response.recordings[i].title + '<br>');
                                    albums_esquerda.append(label_album_esquerda);

                                  }
                                  
                                });

                                  /* DIV QUE VAI AMOSTAR OS VIDEOS DAS MUSICAS AO CLICAR COM O IFRAME */
                                let albums_direita = $('<div></div>').attr('class', 'albums_direita').html('direita');
                                albums_outline_track.append(albums_direita);



                            });




                          }


                        }




                      }
                    });

                  });



                };

              }

            }
          }

        )
      } else if (option == 'music') {

        var url = 'http://musicbrainz.org/ws/2/recording/?query=recording:' + search + '&fmt=json';
        var url = encodeURI(url);

        console.log(url);

        //fazer o pedido HTTP GET ao servico MusicBrainz
        $.get(url, function (response, status) {

          if (status == 'success') {

            for (let music of response.recordings) {

              //DIV QUE VAI TER OS RESULTADOS DAS MUSICAS
              let div_music = $('<div></div>').attr('class', 'default');
              $('.resultados').append(div_music);

              //CAPA DA MUSICA

              var cover_music = "http://coverartarchive.org/release/" + music.releases[0].id;
              var cover_music = encodeURI(cover_music);

              console.log(cover_music);

              $.get(cover_music, function (response, status) {

                var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                div_music.prepend(div_caixa_img);

                var div_art_img = $('<img></img>').attr('class', 'art_img').attr('src', response.images[0].thumbnails.small);
                div_caixa_img.prepend(div_art_img);



              }).fail(function () {

                var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');
                div_music.prepend(div_caixa_img);

                let div_art_img = $('<img></img>').attr('class', 'art_img').attr('src', 'img/nosrc.png');
                div_caixa_img.prepend(div_art_img);

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
        $.get(url, function (response, status) {

          if (status == 'success') {


            for (let album of response.releases) {

              //DIV QUE VAI TER OS RESULTADOS DOS ALBUMS CORPO
              let div_release = $('<div></div>').attr('class', 'default').click(resultados_albums);

              $('.resultados').append(div_release);

              //DIV DO DA CAPA DO ALBUM
                
              var cover = "http://coverartarchive.org/release/" + album.id;
              var cover = encodeURI(cover);



              $.get(cover, function (response, status) {


                var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

                div_release.prepend(div_caixa_img);

                var art_img = $('<img></img>').attr('class', 'art_img').attr('src', response.images[0].image);

                div_caixa_img.append(art_img);

              }).fail(function () {

                var div_caixa_img = $('<div></div>').attr('class', 'caixa_img');

                div_release.prepend(div_caixa_img);

                var art_img = $('<img></img>').attr('class', 'art_img').attr('src', "img/nosrc.png");

                div_caixa_img.append(art_img);
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
                
             
                function resultados_albums() {

                  $('.resultados').hide();
                  $('.resultado-pesquisa').show();

                  var v_album = 'http://musicbrainz.org/ws/2/release/?query=reid:'+ album.id +'&fmt=json';
                  var v_album = encodeURI(v_album);

                  console.log(v_album);

                  $.get(v_album, function (response, status) {
                    
                      /* Band_artist É ONDE FICA O NOME DO ALBUM EM QUESTAO*/
                    let band_artist = $('<div></div>').attr('class', 'band-artist').html(response.releases[0].title);                     
                    $('.resultado-pesquisa').append(band_artist);  
                    
                    let img_album = $('<div></div>').attr('class', 'img_ablum').html('eskdekdede');
                    $('.resultado-pesquisa').append(img_album);  
                   
                    /* DIV PRINCIPAL QUE VAI TER DOIS DIVS, ESQUERDA= TRACKS DIREITA = IFRAME DO VIDEO DA MUSICA DO YOUTUBE */  
                    let albums_outline_track = $('<div></div>').attr('class', 'albums_outline');
                    $('.resultado-pesquisa').append(albums_outline_track);
                    
                      /* CAIXA QUE VAI AMOSTRAR AS MUSICAS DO ALBUM COM UM CICLO */
                      let albums_esquerda = $('<div></div>').attr('class','albums_esquerda').html('esquerda');
                      albums_outline_track.append(albums_esquerda);
                      
                      /* DIV QUE VAI AMOSTAR OS VIDEOS DAS MUSICAS AO CLICAR COM O IFRAME */
                      let albums_direita = $('<div></div>').attr('class','albums_direita').html('direita');
                      albums_outline_track.append(albums_direita);

                  });
                }

            }
          }

        });

      }

    };
  });
});