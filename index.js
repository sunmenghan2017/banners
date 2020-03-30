var $carousel = (function(){
    var $content = $("<div class='slider' id='slider'>" +
                            "<div class='slide'><img src='img/b5.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b1.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b2.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b3.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b4.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b5.png' alt=''></div>" +
                            "<div class='slide'><img src='img/b1.png' alt=''></div>" +
                        "</div>" +
                        "<span id='left'><</span>" +
                        "<span id='right'>></span>" +
                        "<ul class='nav' id='navs'>" +
                            "<li id='li1'>1</li>" +
                            "<li id='li2'>2</li>" +
                            "<li id='li3'>3</li>" +
                            "<li id='li4'>4</li>" +
                            "<li id='li5'>5</li>" +
                        "</ul>"
    );
    var $box = $('#box');
    var index = 1;
    var timer;
    var left;
    var cfg = {
        container:'#box'
    }; 
    function show(conf){
        $(cfg.container).append($content);
        $.extend(cfg,conf);
        animate();
        //鼠标滑入滑出
        $box.mouseover(function(){
            $('#left').css('opacity',0.5);
            $('#right').css('opacity',0.5);
            clearInterval(timer);
        });
        $box.mouseout(function(){
            $('#left').css('opacity',0);
            $('#right').css('opacity',0);
            animate();
        });
        // 点击上下页
        $('#left').click(function(){
            showPrev();
        })
        $('#right').click(function(){
            showNext();
        })
        // 点击按钮
        $('ul').find('li').on('click', function(){
            index = $(this).index();
            $('li').removeAttr("class");
            showNext();
        })
    }
    //轮播动画
    function animate(){
        $("#li"+(index)).attr("class","active");
        timer = setInterval(function(){
            showNext();
        },3000);
    }
    //上页
    function showPrev(){  
        if(index == 0){
            setTimeout(function(){
                showPrev();
            },0);
            index=5;
            left = -6000;
            $('#slider').css('left',left+'px');
        }
        else{
            index--;
            left = -1200*(index);
            if(index == 0){
                $("#li5").attr("class","active");
                $("#li1").removeAttr("class");
            }
            else if(index == 5){
                $("#li5").attr("class","active");
                $("#li1").removeAttr("class");
            }
            else{
                $("#li"+(index)).attr("class","active");
                $("#li"+(index+1)).removeAttr("class");
            }
            $('#slider').css('left',left+'px');
        }
    }
    //下页
    function showNext(){
        if(index==6){
            setTimeout(function(){
                showNext();
            },0);
            index=1;
            left = -1200;
            $('#slider').css('left',left+'px');
        }
        else{
            index++;
            left = -1200*(index);
            if(index == 6){
                $("#li1").attr("class","active");
                $("#li5").removeAttr("class");
            }
            else if(index == 1){
                $("#li1").attr("class","active");
                $("#li5").removeAttr("class");
            }
            else{
                $("#li"+(index)).attr("class","active");
                $("#li"+(index-1)).removeAttr("class");
            }
            $('#slider').css('left',left+'px');
        }
    }
    return {
        show:show
    }
}())
