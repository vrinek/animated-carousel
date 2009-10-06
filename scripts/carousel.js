function moveCarousel(position){
    // find the new seats
    currentCarouselPosition = newCarouselPosition;
    newCarouselPosition = carouselSeats.indexOf($$('#carousel .seat.'+position)[0]);

    repositionCarousel(position);
};

function repositionCarousel(position){
    if(currentCarouselPosition != null){
        // remove the old ones
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
    // { x: 0, y: 0, mode: 'absolute' }
    var css = new Hash();
    css.set('bottom', '15px');

    if(currentCarouselPosition == null){
        // position and scale down
        if(position == 'center'){
            seat.setStyle('height: 120px; width: 80px; left: 50%; margin-left: -40px');
        }else{
            seat.setStyle('height: 90px; width: 60px; ' + position + ': 15%');
        };
    };

    if(position == 'center'){
        css.set('left', '50%');
        css.set('margin-left', '-80px');
        css.set('height', '240px');
        css.set('width', '160px');
    }else{
        css.set(position, '10%');
        css.set('margin-left', 0);
        css.set('height', '180px');
        css.set('width', '120px');
    };

    new Effect.Morph(seat, {
        style: css,
        duration: 0.5
    });

    seat.appear();

    seat.addClassName(position);
};

function initCarousel(){
    carouselSeats = $$('#carousel .seat');
    currentCarouselPosition = null;
    newCarouselPosition = 1;

    repositionCarousel(1);
};
