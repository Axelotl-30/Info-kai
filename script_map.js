let actual_map = 'hauts';
let zooming = 1;

function switch_map(input) {
    const map1 = document.querySelector(`#${actual_map}`);
    map1.style.removeProperty('opacity');

    actual_map = input;

    const map2 = document.querySelector(`#${actual_map}`);
    map2.style.opacity = 1;

    const map = document.querySelector(`#map`);
    map.src = `assets/map/map_${actual_map}.png`

    zooming = 1;
    zoom("=");
}

function zoom(sign) {
    if (sign === "+") {
        zooming = Math.min(zooming +0.25, 5);
    }else if (sign === "-"){
        zooming = Math.max(zooming -0.25, 0.25);
    }
    
    const map = document.querySelector(`#map`);
    map.style.width = `${100 * zooming}%`
}

switch_map('hauts');