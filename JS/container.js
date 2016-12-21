var icontainer=document.getElementById('container');
var iScrollTop=document.documentElement.scrollTop|| document.body.scrollTop;
var a=false;
window.onscroll=function(){
    var bounding = icontainer.getBoundingClientRect();
    if(bounding.top <= 0&&a != true){
        a=true;
        var ROW= 4,
            COL= 6,
            NUM=ROW*COL,
            BIG_IMG_WIDTH=750,
            BIG_IMG_HTIGHT=500,
            THUMB_IMG_WIDTH=125,
            THUMB_IMG_HEIGHT=125;
        var oContainer=document.getElementById('container');
        var count=0;//记录已经加载图片的个数
        var index=0;
        var bClick=false;//标识是否被点击过
        var aImg=document.getElementsByClassName('img');

        //图片预加载
        for(var i=0;i<NUM;i++){
            var thumbImg=new Image();
            thumbImg.onload=function(){
                count++;
                if(count==NUM*2){
                    loadSuccess();
                }
            };
            thumbImg.src='img/thumb/'+(i+1)+'.jpg';

            var bigImg=new Image();
            bigImg.onload=function(){
                count++;
                if(count==NUM*2){
                    loadSuccess();
                }
            };
            bigImg.src='img/'+(i+1)+'.jpg';
        }

        var iColGap=(oContainer.offsetWidth-THUMB_IMG_WIDTH*COL)/(COL+1);//列空
        var iRowGap=(oContainer.offsetHeight-THUMB_IMG_HEIGHT*ROW)/(ROW+1);//行空
        function loadSuccess(){
            //创建24个div
            for(var i=0;i<ROW;i++){
                for(var j=0;j<COL;j++){
                    index++;
                    var oDiv=document.createElement('div');
                    oDiv.className='img';
                    oDiv.style.width=THUMB_IMG_WIDTH+'px';
                    oDiv.style.height=THUMB_IMG_HEIGHT+'px';
                    oDiv.style.backgroundImage='url(img/thumb/'+index+'.jpg)';
                    oDiv.innerHTML='<span></span>';
                    oDiv.pos={
                        row:i,
                        col:j,
                        left:j*(iColGap+THUMB_IMG_WIDTH)+iColGap,
                        top:i*(iRowGap+THUMB_IMG_HEIGHT)+iRowGap
                    };
                    oDiv.index=index;
                    oContainer.appendChild(oDiv);

                }
            }
            var timer=setInterval(function(){
                aImg[--index].style.left=aImg[index].pos.left+'px';
                aImg[index].style.top=aImg[index].pos.top+'px';
                setStyle(aImg[index],'transform','rotate('+(Math.random()*40-20)+'deg)');
                if(index == 0){
                    clearInterval(timer);
                }
            },100);

            oContainer.onclick=function(e){
                var target= e.target;
                if(target!=oContainer){
                    if(bClick){//已经被点击过，现在是大图，需要被打散
                        for(var i=0;i<NUM;i++){
                            aImg[i].style.left=aImg[i].pos.left+'px';
                            aImg[i].style.top=aImg[i].pos.top+'px';
                            setStyle(aImg[i],'transform','rotate('+(Math.random()*40-20)+'deg)');
                            aImg[i].style.borderWidth='5px';

                            var oSpan=aImg[i].getElementsByTagName('span')[0];
                            oSpan.style.opacity=0;
                        }

                    }else{//没被点击过，现在是小图，需要合并
                        var bigImgPos={
                            left:(oContainer.offsetWidth-BIG_IMG_WIDTH)/2,
                            top:(oContainer.offsetHeight-BIG_IMG_HTIGHT)/2
                        };
                        for(var i=0;i<NUM;i++){
                            aImg[i].style.left=bigImgPos.left+THUMB_IMG_WIDTH*aImg[i].pos.col+'px';
                            aImg[i].style.top=bigImgPos.top+THUMB_IMG_HEIGHT*aImg[i].pos.row+'px';
                            aImg[i].style.borderWidth='1px';
                            setStyle(aImg[i],'transform','rotate(0deg)');

                            var oSpan=aImg[i].getElementsByTagName('span')[0];
                            oSpan.style.opacity=1;
                            oSpan.style.backgroundImage='url(img/'+target.parentNode.index+'.jpg)';
                            oSpan.style.backgroundPosition=(-aImg[i].pos.col*THUMB_IMG_WIDTH)+'px'+ ' ' +
                                (-aImg[i].pos.row*THUMB_IMG_HEIGHT)+'px';
                        }
                    }
                    bClick=!bClick;
                }
            };

            function setStyle(elem,prop,val){
                ['Webkit','Moz','Ms','o',''].forEach(function(prefix){
                    elem.style[prefix+prop.charAt(0).toUpperCase()+prop.substring(1)]=val;
                });
            }
        }
    }
};


