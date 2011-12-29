(function(){ window.onerror = function(){ return true; } })();
$(document).ready(function(){
    _this = this;
    var douban_helper = {
        utils: {
            trim: function(str){
                return str.replace(/(^\s*)|(\s*$)/g,'');
            },
        },
        main: {
            init: function(){
                //reset style
                $('.info_wrapper , .song_info').css('height','auto');
                var cssContetn = '.tool-bar span { margin-right:5px; }';
                $('head style').append(cssContetn);

                //append tool-bar to page content
                var info_wrappers = $('.info_wrapper');
                $(info_wrappers).each(function(i){
                    $(this)
                        .mouseenter(function(){
                            $(this).find('.source').after("<p class='tool-bar'><span class='listen-now'><a href='javascript:;'>试听</a></span><span class='download-now'><a href='javascript:;'>下载</a></span></p>");
                        })
                        .mouseleave(function(){
                            $(this).find('.tool-bar').remove();
                        });
                });
            },
            getSongName: (function(){ // use closure
                //get the song name
                $('.download-now').live('click',function(){
                    var song_name = $(this).parent().parent().find('.song_title').html();
                    var pattern = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\s]{0,30}$/; //use regular expression
                    song_name = pattern.exec(song_name);
                    song_name = song_name ? song_name : prompt('矮油！没有找到这首歌诶~请手动输入歌曲名称~');
                    douban_helper.main.getSongURL(song_name);
                });
            })(),
            getSongURL: function(song_name){
                var ROOT_URL = 'http://www.google.cn';
                $.ajaxSetup({ cache: false });
                $.ajax({
                    url: ROOT_URL+'/music/search?q='+song_name,
                    type: 'GET',
                    success: function(data){
                        var pattern = /"[A-Za-z0-9]{17}"/;
                        data = douban_helper.utils.trim(data);
                        var song_id = data.match(pattern);
                        song_id = song_id[0].substr(1,17);
                        douban_helper.main.startDownLoad(song_id);
                    },
                    error:function(e){ alert(e); }
                });
            },
            startDownLoad: function(song_id){
                ROOT_URL = 'http://g.top100.cn/16667639/html/download.html?id=';
                var nw = window.open(ROOT_URL+song_id,'Download Page','height=400,width=640,location=no,menubar=no,resizable=no');
                nw.focus();

            }
        }
    }
    douban_helper.main.init();
});
