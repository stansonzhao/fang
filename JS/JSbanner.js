function createLunbo(areaDom, options) {
    var imgArea = document.createElement('div');
    var numberArea = document.createElement('div');
    var cutIndex = 0;//当前显示第几张轮播图
    var changeTimer = null;  //设置定时器
    var changeDuration = 4000; //设置切换时间
    var timer = null;
    var len = options.length;
    //初始化图片
    initImgs();
    //初始化圆圈
    initNumbers();
    //初始化圆圈和图片样式
    setStatu();
    //自动切换
    autoChange();
    function initImgs() {
        imgArea.style.height = '100%';
        imgArea.style.width = '100%';
        imgArea.style.display = 'flex';
        imgArea.style.cursor = 'pointer';
        for (var i = 0; i < len; i++) {
            var obj = options[i];
            var img = document.createElement('img');
            img.src = obj.imgUrl;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.marginLeft = '0';
            imgArea.appendChild(img);
        }
        // imgArea.addEventListener('mouseenter',function(){clearInterval(changeTimer);changeTimer = null;});
        // imgArea.addEventListener('mouseleave',function(){autoChange();})
        areaDom.appendChild(imgArea);
        imgArea.style.overflow = 'hidden';

    }
    function initNumbers() {
        numberArea.style.margin = '0  auto';
        numberArea.style.marginTop = '-25px';
        for (var i = 0; i < len; i++) {
            numberArea.style.width = len * 14 + 'px';
            var sp = document.createElement('span');
            sp.style.display = 'inline-block';
            sp.style.width = '10px';
            sp.style.height = '10px';
            sp.style.backgroundColor = 'lightgray';
            sp.style.margin = '0 2px';
            sp.style.borderRadius = '50%';
            (function (j) {
                sp.addEventListener('click', function () { cutIndex = j; setStatu() })
            })(i)
            sp.style.cursor = 'pointer';
            numberArea.appendChild(sp);
        }
        areaDom.appendChild(numberArea);
    }
    function setStatu() {
        var len = numberArea.children.length;
        //设置圆圈样式
        for (var i = 0; i < len; i++) {
            if (cutIndex === i) {
                //设置圆圈背景色为选中状态
                numberArea.children[i].style.backgroundColor = '#be926f';
            } else {
                // 设置圆圈背景色为普通状态
                numberArea.children[i].style.backgroundColor = 'lightgray';
            }
        }
        //设置当前显示第几张图片
        var start = parseInt(imgArea.children[0].style.marginLeft);
        var end = cutIndex * -100;
        var dis = end - start;
        var duration = 500;//过度动画时间
        var speed = dis / duration;
        if(timer){
            clearInterval(timer);
        }
       var timer = setInterval(function(){
            start += speed*5;
            imgArea.children[0].style.marginLeft = start + '%';
            if(Math.abs(end - start) < 1){
                imgArea.children[0].style.marginLeft = end +'%';
                clearInterval(timer);
            }
        },5);

    }
    function autoChange() {
        if(changeTimer){
            return; 
        }
        changeTimer = setInterval(function () {
            if (cutIndex === len - 1) {
                cutIndex = 0;
            } else {
                cutIndex ++;
            }
            setStatu();
        }, changeDuration)
    }

}