function moveCarousel(position, auto){
    // find the new seats
    currentCarouselPosition = newCarouselPosition;
    newCarouselPosition = carouselSeats.indexOf($$('#carousel .seat.'+position)[0]);

    repositionCarousel(position);
    
    if(!auto){
        initRotation(5000);
    };
};

function repositionCarousel(position){
    if(currentCarouselPosition != null){
        // remove the old seats
        currentSeat('left').removeClassName('left');
        currentSeat('center').removeClassName('center');
        currentSeat('right').removeClassName('right');

        // move the old one off the carousel
        moveSeat(currentSeat(otherPos(position)), 'off ' + otherPos(position));
    };

    // add the new ones
    moveSeat(newSeat('left'), 'left');
    moveSeat(newSeat('center'), 'center');
    moveSeat(newSeat('right'), 'right');
};

function otherPos(position){
    switch(position){
        case 'left':
            return 'right';
        case 'right':
            return 'left';
    }
};

function findSeat(position, new_or_current){
    var pos;

    switch(new_or_current){
        case 'new':
            var carouselPosition = newCarouselPosition;
            break;
        case 'current':
            var carouselPosition = currentCarouselPosition;
            break;
    };

    switch(position){
        case 'left':
            if(carouselPosition == 0){
                pos = carouselSeats.length - 1;
            }else{
                pos = carouselPosition - 1;
            };
            break;
        case 'center':
            pos = carouselPosition;
            break;
        case 'right':
            if(carouselPosition == (carouselSeats.length - 1)){
                pos = 0;
            }else{
                pos = carouselPosition + 1;
            };
            break;
    };

    return carouselSeats[pos];
};

function newSeat(position){
    return findSeat(position, 'new');
};

function currentSeat(position){
    return findSeat(position, 'current');
};

function moveSeat(seat, position){
    var css = 'bottom:15px;';
    var off = true;

    switch(position){
        case 'off left':
            position = 'left';
            break;
        case 'off right':
            position = 'right'
            break;
        default:
            off = false
            break;
    };
    
    var offSize = 'width: '+carouselCenterWidth/4+'px; margin-left: -'+carouselCenterWidth/8+'px; font-size: 0.25em;';
    
    var offPos = 'bottom: 120px; left:';
    var onPos = 'bottom: 80px; left:';
    if(position == 'left'){
        offPos += '-'+carouselPadding+'%;';
        onPos += carouselPadding+'%;';
    }else{
        offPos += 100+carouselPadding+'%;';
        onPos += 100-carouselPadding+'%;';
    };
    
    if(currentCarouselPosition == null){
        // position and scale down
        if(position == 'center'){
            seat.setStyle('bottom: 60px; width: '+carouselCenterWidth/2+'px; left: 50%; margin-left: -'+carouselCenterWidth/4+'px; font-size: 0.5em;');
        }else{
            seat.setStyle(offSize + onPos);
        };
    }else{
        if(!seat.visible()){
            seat.setStyle(offSize + offPos);
        };
    };

    if(position == 'center'){
        css += 'bottom: 30px;';
        css += 'left: 50%;';
        css += 'margin-left: -'+carouselCenterWidth/2+'px;';
        css += 'width: '+carouselCenterWidth+'px;';
        css += 'font-size: 1em;';
    }else{
        css += 'bottom: 50px;';
        css += 'left:';
        if(position == 'left'){
            css += carouselPadding+'%;';
        }else{
            css += 100-carouselPadding+'%;';
        }
        
        css += 'margin-left: -'+carouselCenterWidth*0.75/2+'px;'
        css += 'width: '+carouselCenterWidth*0.75+'px;';
        css += 'font-size: 0.75em;';
    };
    
    if(off){
        seat.morph(offSize + offPos);
        carouselFades[carouselSeats.indexOf(seat)] = new Effect.Fade(seat);
    }else{
        seat.morph(css);
        if(!seat.visible()){
            seat.appear();
        }else{
            var fade = carouselFades[carouselSeats.indexOf(seat)];
            if(typeof(fade) != 'undefined' && fade.state == 'running'){
                fade.cancel();
                
                var currentOpacity = seat.getStyle('opacity');
                seat.appear({ from: currentOpacity });
            };
        };
    };
    
    if(!off){
        seat.addClassName(position);
    };
};

function initCarousel(width, padding){
    carouselCenterWidth = width;
    carouselPadding = padding;

    carouselSeats = $$('#carousel .seat');
    currentCarouselPosition = null;
    newCarouselPosition = 1;
    
    carouselFades = new Array();
    
    repositionCarousel();
    initRotation();
};

function initRotation(delay){
    if(typeof(carouselRotationInterval) != 'undefined'){
        clearInterval(carouselRotationInterval);
    };
    
    if(delay){
        setTimeout('initRotation()', delay);
    }else{
        carouselRotationInterval = setInterval("rotateCarousel()", 3000);
    };
};

function rotateCarousel(){
    moveCarousel('right', true);
};
