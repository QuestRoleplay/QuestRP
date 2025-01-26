(function(){
    document.querySelectorAll('[data-like]').forEach(function(el){
        var like = el.getAttribute('data-like')
        var xmlns = "http://www.w3.org/2000/svg",
        select = function(s) {
          return document.querySelector(s+like);
        },
        selectAll = function(s) {
          return document.querySelectorAll(s+like);
        },
        heartSVG = document.querySelector('[data-like="'+like+'"]'),
        hit = select('#hit'),
        sparkleGrowGroup = select('#sparkleGrowGroup'),
        sparkleMoveGroup = select('#sparkleMoveGroup'),
        brokenHeartGroup = select('#brokenHeartGroup'),
          sparkleGrowColors = ['#9E31E2','#9E31E2','#9E31E2','#92E8C5','#CDEB8E','#2AD492','#D79DF3'],
          sparkleMoveColors = ['#E187D2', '#E0A3FF', '#F5BB30', '#9ECA98', '#35A0F0', '#BADAB0', '#33B6E9']



      TweenMax.set(el, {
        visibility:'visible'
      })
      CSSPlugin.defaultSmoothOrigin = true;
      TweenMax.set(['#breakLineL'+like,'#breakLineR'+like], {
        drawSVG:'100% 100%'
      })

      var tl = new TimelineMax({paused:true, onComplete:unlike});
      function unlike() {
        tl.pause(0);
        TweenMax.delayedCall(0.4, hit.onmouseover)
      }
      tl.from('#pinkDot'+like, 1, {
        attr:{
          r:0
        }
      })
      .set('#greyHeart'+like, {
        scale:0,
        transformOrigin:'50% 100%'
      },'-=0.99')

      .to('#pinkDot'+like, 1, {
        fill:'#CD8FF7'
      },'-=1')

      .to('#hole'+like, 1, {
        attr:{
          r:67
        }
      },'-=0.5')

      .from('#pinkHeart'+like, 1.6, {
        scale:0,
        transformOrigin:'50% 50%',
        ease:Back.easeOut.config(1.2)
      },'-=0.5')
      .set(['#sparkleGrowGroup'+like, '#sparkleMoveGroup'+like], {
        alpha:1
      },'-=1.5')
      .to('#sparkleGrowGroup'+like, 1, {
        scale:1.5,
        transformOrigin:'50% 50%'

      },'-=1.5')
      .to('#sparkleMoveGroup'+like, 1, {
        scale:1.2,
        transformOrigin:'50% 50%'

      },'-=1.5')
      .staggerTo('#sparkleGrowGroup'+like+' circle', 2, {
        attr:{
          r:0
        },
        cycle:{
          fill:function(i){
            return sparkleGrowColors[i]
          }
        }
      }, 0,'-=0.9')
      .staggerTo('#sparkleMoveGroup'+like+' circle', 0.8, {
        attr:{
          r:0
        },
        cycle:{
          fill:function(i){
            return sparkleMoveColors[i]
          }
        }
      }, 0,'-=2')
      .addCallback(()=>{
        tl.pause();
      })
      .set('#brokenHeartGroup'+like, {
        alpha:1
      })

      .set('#pinkHeart'+like, {
        alpha:0
      })

      .to(['#breakLineL'+like, '#breakLineR'+like], 3, {
        drawSVG:'0% 100%',
      })

      .to(['#brokenHeartL'+like], 3, {
        rotation:-230,
        x:-40,
        transformOrigin:'110% 100%',
        ease:Power2.easeIn,
      },'-=4')
      .to(['#brokenHeartR'+like], 3, {
        rotation:230,
        x:40,
        transformOrigin:'10% 100%',
        ease:Power2.easeIn,
      },'-=4')
      .to('#greyHeart'+like, 3, {
        scale:1,
        ease:Power4.easeInOut
      },'-=2.5')
      .set(['#breakLineL'+like, '#breakLineR'+like], {
        drawSVG:'0% 0%'
      },'-=3')
      .to(['#brokenHeartL'+like, '#brokenHeartR'+like], 0.3,{
        alpha:0,
      },'-=2')
      if(el.getAttribute('data-like-active') == "true") {
        tl.play(0);
      }
      var isAnimating = false;
      heartSVG.onclick = function(){
        if (isAnimating) {
            return;
        }
        if(el.getAttribute('data-like-disabled') == "true") {
            return;
        }
        if(tl.time() === 0){
            tl.play(0);
            axios({
                url: '/news/'+like+'/like',
                method: 'post',
            }).then(function (response) {
                var result = response.data
                document.querySelector('#newliketext'+like).parentElement.classList.remove('hidden1')
                document.querySelector('#liketext'+like).parentElement.classList.add('hidden2')
                document.querySelector('#newliketext'+like).innerHTML = result.likes
            })

        } else{
            tl.play()
            axios({
                url: '/news/'+like+'/like',
                method: 'delete',
            }).then(function (response) {
                var result = response.data
                document.querySelector('#liketext'+like).parentElement.classList.remove('hidden2')
                document.querySelector('#newliketext'+like).parentElement.classList.add('hidden1')
                document.querySelector('#liketext'+like).innerHTML = result.likes
            })
        }
        isAnimating = true;

        setTimeout(function() {
            isAnimating = false;
        }, 1000);
      }


      tl.timeScale(4);

        document.querySelectorAll('.post').forEach(function(post) {
            post.addEventListener('dblclick',function() {
                post.querySelector('svg').dispatchEvent(new Event('click'))
            })
        })
    })
})()


