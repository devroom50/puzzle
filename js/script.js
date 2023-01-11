var mx, my,ix, iy, ox, oy, gallery, piece, timer;
var cnt = 0;
var pic = ['angelus', 'gogh', 'monalisa', 'munch', 'vermeer'];
var second = 0;
var ms = 0;
const pok = new Audio(); //오디오 객체

$(document).ready(function(){
  pok.src = $('.pok').attr('src');
  for(var i in pic) {
    $('#selectGame').append('<div><img src="img/'+pic[i]+'/'+pic[i]+'.jpg" alt="'+pic[i]+'"></div>');
  }
  $('#selectGame>div').click(function(){
    var index = $(this).index() - 1;
    for(var i=0;i<9;i++){
      $('#gallery_wrapper').append('<div><img src="img/'+pic[index]+'/puzzle'+i+'.jpg" alt="puzzle'+i+'"></div>');
      $('#draggable_wrapper').append('<div class="draggable"><img src="img/'+pic[index]+'/puzzle'+i+'.jpg" alt="puzzle'+i+'"></div>');
    }
    gallery = $('div', '#gallery_wrapper');
    piece = $('div', '#draggable_wrapper');
    piece.each(function(){
      var tl = Math.random() * 38;
      var tt = Math.random() * 65;
      $(this).animate({left: tl+'vw', top: tt+'vh'});
    });
    $('#selectGame').fadeOut();
  });
  $('#start>button').on('click', function(event) {
    event.preventDefault();
    if($(this).text()=='새게임') {
      location.reload();
    } else {
      $('#start').hide();
      timer();
    }
  });
  //모바일 게임 코드
  $('#draggable_wrapper').on('touchstart', '.draggable', function(event) {
    ix = parseInt($(this).css('left'));
    iy = parseInt($(this).css('top'));
    ox = event.originalEvent.touches[0].pageX - parseInt($(this).css('left'));
    oy = event.originalEvent.touches[0].pageY - parseInt($(this).css('top'));
  });
  $('#draggable_wrapper').on('touchmove', '.draggable', function(event) {
    mx = event.originalEvent.changedTouches[0].pageX-ox;
    my = event.originalEvent.changedTouches[0].pageY-oy;
    $(this).css({
      left: mx,
      top: my
    });
  });
  $('#draggable_wrapper').on('touchend', '.draggable', function(event) {
    var dx = event.originalEvent.changedTouches[0].pageX;
    var dy = event.originalEvent.changedTouches[0].pageY;
    var idx = $(this).index();
    var targetX = gallery.eq(idx).offset().left;
    var targetY = gallery.eq(idx).offset().top;
    
    if(Math.abs(dx-targetX)<=80 && Math.abs(dy-targetY)<=80) {
      $(this).animate({left: targetX,top: targetY}, 400)
      pok.play();
      cnt++;
      if(9 == cnt) {
        piece.remove();
        gallery.css({
          opacity:1,
          margin:0
        });
        endGame();
      }
    } else {
      $(this).animate({left: ix,top: iy}, 400)
    }
  });
});

function timer() {
  timer = setInterval(function() {
    ms++;
    if(ms==100) {
      second++;
      ms = 0
    }
    if(second<=9) {
      $('#second').text('0'+second);
    } else {
      $('#second').text(second);
    }
    if(ms<=9) {
      $('#ms').text('0'+ms);
    } else {
      $('#ms').text(ms);
    }			
  }, 10);
}

function endGame() {
  clearInterval(timer);
  $('#record').text(second+'초 '+ms+' 기록!!');
  $('#start>button').text('새게임');
  $('#start').show();
}