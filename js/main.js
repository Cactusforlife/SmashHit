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

            for (let artist of response.artists) {


              let div_artista = $('<div></div>').attr('class','artista');

              $('body').append(div_artista);



              let div_nome = $('<div></div>').attr('class','nome');

              div_artista.append(div_nome);

              let label_nome = $('<label></label>').attr('for','nome').html('Artist/Group');

              div_nome.append(label_nome);

              label_nome.append($('<p></p>').text(artist.name));

              let div_type = $('<div></div>').attr('class','type');

              div_artista.append(div_type);

              let label_type = $('<label></label>').attr('for','type').html('Type');

              div_type.append(label_type);

              label_type.append($('<p></p>').text(artist.type));



              let div_score = $('<div></div>').attr('class','score');

              div_artista.append(div_score);

              let label_score = $('<label></label>').attr('for','score').html('Score');

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
            //implementar tabela com o header "nome","score","type"

            //criar table
            let table = $('<table></table').attr('id', 'tabela');
            $('body').append(table);

            //o thead
            let thead = $('<thead></thead>');
            table.append(thead);

            //os tr
            let tr = $('<tr></tr>');
            thead.append(tr);

            //os th
            let labels = ['Song', 'score', 'status','Artist/band'];
            $.each(labels, function(indice, label) {
              let th = $('<th></th>').text(label);
              tr.append(th);
            });

            let tbody = $('<tbody></tbody>');
            table.append(tbody);
            //interar sobre o array artistas
            for (let music of response.recordings) {
              let tr = $('<tr></tr>');
              tr.append($('<td></td>').text(music.title));
              tr.append($('<td></td>').text(music.score));
              tr.append($('<td></td>').text(music.status));
              tr.append($('<td></td>').text(music['artist-credit'][0].artist.name));

              tbody.append(tr);
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
            //implementar tabela com o header "nome","score","type"

            //criar table
            let table = $('<table></table').attr('id', 'tabela');
            $('body').append(table);

            //o thead
            let thead = $('<thead></thead>');
            table.append(thead);

            //os tr
            let tr = $('<tr></tr>');
            thead.append(tr);

            //os th
            let labels = ['band/Artist', 'Album', 'Tracks', 'Score'];
            $.each(labels, function(indice, label) {
              let th = $('<th></th>').text(label);
              tr.append(th);
            });

            let tbody = $('<tbody></tbody>');
            table.append(tbody);
            //interar sobre o array albums
            for (let release of response.releases) {
              let tr = $('<tr></tr>');
              tr.append($('<td></td>').text(release['artist-credit'][0].artist.name));
              tr.append($('<td></td>').text(release.title));
              tr.append($('<td></td>').text(release.media[0]['track-count']));
              tr.append($('<td></td>').text(release.score));
              tbody.append(tr);
            }


          }

        });

      }

    };
  });
});
