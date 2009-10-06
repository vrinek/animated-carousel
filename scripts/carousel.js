function moveCarousel(position){
    // find the new seats
    currentCarouselPosition = newCarouselPosition;
    newCarouselPosition = carouselSeats.indexOf($$('#carousel .seat.'+position)[0]);

    repositionCarousel(position);
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
    
    var offSize = 'width: 60px; margin-left: -30px;';
    
    var offPos = 'left:';
    var onPos = 'left:';
    if(position == 'left'){
        offPos += '-20%;';
        onPos += '20%;';
    }else{
        offPos += '120%;';
        onPos += '80%;';
    };
    
    if(currentCarouselPosition == null){
        // position and scale down
        if(position == 'center'){
            seat.setStyle('width: 80px; left: 50%; margin-left: -40px;');
        }else{
            seat.setStyle(offSize + onPos);
        };
    }else{
        if(!seat.visible()){
            seat.setStyle(offSize + offPos);
        };
    };

    if(position == 'center'){
        css += 'left: 50%;';
        css += 'margin-left: -80px;';
        css += 'width: 160px;';
    }else{
        css += 'left:';
        if(position == 'left'){
            css += '20%;';
        }else{
            css += '80%;';
        }
        
        css += 'margin-left: -60px;'
        css += 'width: 120px;';
    };
    
    if(off){
        seat.morph(offSize + offPos);
        seat.fade();
    }else{
        seat.morph(css);
        if(!seat.visible()){
            seat.appear();
        };
    };
    
    if(!off){
        seat.addClassName(position);
    };
};

function initCarousel(){
    carouselSeats = $$('#carousel .seat');
    currentCarouselPosition = null;
    newCarouselPosition = 1;

    repositionCarousel();
};
