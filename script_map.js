let actual_region = 0;
const region = ['Granval','Ourcival','San-Fantastico'];
let actual_map = 'hauts';
let zooming = 1;

function switch_region(input) {
    const container1 = document.querySelector(`#${region[actual_region]}`);

    if (input === "l"){
        actual_region = mod(actual_region - 1, 3);
    }else if (input === "r"){
        actual_region = mod(actual_region + 1, 3);
    }

    const map = document.querySelector(`.map`);
    map.style.backgroundImage = `url('assets/map/${region[actual_region]}.png')`;

    const text = document.querySelector(`.text2`);
    text.innerHTML = `${region[actual_region]}`;

    const container2 = document.querySelector(`#${region[actual_region]}`);

    container1.style.display = "none";

    container2.style.display = "block";
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

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