$(document).ready(function() {

$('#search').keypress(function (e){
  if (e.which == 13) { //Enter key pressed

    //ler o valor da caixa de input
    let artist = $('#search').val();
    console.log(artist);

    //construir o URL com o valor da caixa de input
    let url = 'http://musicbrainz.org/ws/2/artist/?query=artist:' + artist + '&fmt=json';
    url = encodeURI(url);

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
        let labels = ['nome', 'score', 'type'];
        $.each(labels, function(indice, label) {
          let th = $('<th></th>').text(label);
          tr.append(th);
        });

        let tbody = $('<tbody></tbody>');
        table.append(tbody);
        //interar sobre o array artistas
        for (let artist of response.artists) {
          let tr = $('<tr></tr>');
          tr.append($('<td></td>').text(artist.name));
          tr.append($('<td></td>').text(artist.score));
          tr.append($('<td></td>').text(artist.type));
          tbody.append(tr);
        }

        //ativar filtro
        $('#filtro').on('keyup', function() { //keyup é quando largamos o clique da caixa de input
          var valor = $(this).val().toLowerCase(); //this = #filtro
          $('#tabela tbody tr').filter(
            function(indice, linha) {
              $(linha).toggle($(linha).text().toLowerCase().indexOf(valor) > -1); //mostra ou esconde os filtros
            }
          );
        });

      }
    });
  };
});
});
