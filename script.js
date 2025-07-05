let page_index;
let yokaiDict;
let bDict;
let legDict;
let yokai_ref;
let b_ref;
let leg_ref;
let yokai_num;
let b_num;
let yokai_pages;
let b_pages;
let leg_pages;
let game = "yw2";
const switch_sound = new Audio('assets\\font_sounds\\switch_yw1.wav');
document.getElementById('bottom_search').addEventListener('keypress', function(event) {if (event.key === 'Enter') {search(this.value);}});

switch_game("yw2");

function initialize(){
    yokai_ref = Object.keys(yokaiDict);
    b_ref = Object.keys(bDict);
    leg_ref = Object.keys(legDict);

    yokai_num = yokai_ref.length;
    b_num = b_ref.length;

    yokai_pages = num_to_pages(yokai_num);
    b_pages = num_to_pages(b_num);
    leg_pages = leg_ref.length;
    page_index = b_pages + leg_pages;

    switch_page();
    update_index();
}

function num_to_pages(num){
    q = Math.floor(num / 24);
    r = num * 24;
    if (r != 0){ //si on il reste des yokai qui ne complètent pas une page on ajoute toute la page
        q += 1;
    }
    return q
}

function switch_page(){
    const medalSlots = document.querySelectorAll('.medal_slot');
    const g = document.querySelector('.Page_gauche');
    const d = document.querySelector('.Page_droite');
    const l = document.querySelector('.index_l');
    const r = document.querySelector('.index_r');


    if (page_index < b_pages){
        generate_medals(page_index, b_num, bDict, b_ref, medalSlots);
        d.style.backgroundImage = `url('assets/page d.png')`;
        g.style.backgroundImage = `url('assets/page g.png')`;
        l.style.display = 'block';
        r.style.display = 'block';

    }else if(page_index < b_pages + leg_pages){
        medalSlots.forEach((slot, index) => {
            slot.innerHTML = '';
            slot.style.display = 'none';
        });
        d.style.backgroundImage = `url("assets/medal/leg${page_index - b_pages + 1}d.png")`;
        g.style.backgroundImage = `url("assets/medal/leg${page_index - b_pages + 1}g.png")`;
        l.style.display = 'none';
        r.style.display = 'none';
        display_leg_info();

    }else {
        generate_medals(page_index - b_pages - leg_pages, yokai_num, yokaiDict, yokai_ref, medalSlots);
        d.style.backgroundImage = `url('assets/page d.png')`;
        g.style.backgroundImage = `url('assets/page g.png')`;
        l.style.display = 'block';
        r.style.display = 'block';
    }
    
    console.log(page_index)
    switch_sound.pause();  
    switch_sound.currentTime = 0; // On remet le son à 0
    switch_sound.play().catch(error => {
        console.error('Error playing audio:', error);
    });
}

function generate_medals(pindex,num,dict,ref,slots){
    slots.forEach((slot, index) => {
        slot.innerHTML = ''; // Clear previous content 

        const img = document.createElement('img');
        const ray0 = document.createElement('img');
        const ray1 = document.createElement('img');
        const ray2 = document.createElement('img');
        slot.style.display = 'flex';

        if (pindex * 24 + index < num) {
            
            const name = ref[pindex * 24 + index];
            img.src = `assets/medal/${dict[name][1]}.png`; 
            img.className = 'medal';
            img.id = name;
            
            ray0.src = 'assets\\light_ray0.png';
            ray0.id = 'ray0';
            ray0.style.display = 'none';

            ray1.src = 'assets\\light_ray1.png';
            ray1.id = 'ray1';
            ray1.style.display = 'none';

            ray2.src = 'assets\\light_ray2.png';
            ray2.id = 'ray2';
            ray2.style.display = 'none';

            slot.appendChild(img);
            slot.appendChild(ray0);
            slot.appendChild(ray1);
            slot.appendChild(ray2);

            slot.addEventListener('mouseenter', function() {display_yokai_info(img.id,dict);});
        }
        // else {
        //     slot.style.display = 'none';
        // }
    });
}

function switch_game(game_id) {
    page_index = 0;

    const urls = [
        `${game_id}.json`,
        `b${game_id}.json`,
        `leg${game_id}.json`
    ];

    const fetches = urls.map(url =>
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP pour ${url}: ${response.status}`);
                }
                return response.json();
            })
    );

    Promise.all(fetches)
        .then(([yokaiData, bData, legData]) => {
            // Tu peux fusionner, stocker séparément, etc.
            yokaiDict = yokaiData;
            bDict = bData;
            legDict = legData;

            initialize(); // Appel une fois que tout est prêt
        })
        .catch(error => console.error('Erreur lors du chargement des JSONs :', error));
}

function switch_page_index(button_id) {
    if (button_id == "button_l") {
        page_index -= 1;
        if (page_index == -1) {
            page_index = yokai_pages + b_pages + leg_pages -1;
        } 
    }    
    else if (button_id == "button_r") {
        page_index += 1;
        if (page_index == yokai_pages + b_pages + leg_pages) {
            page_index = 0;
        }      
    }
    switch_page();
    update_index();
}

function update_index() {
    if (page_index < b_pages){
        change_index(page_index);
    }else if (page_index < b_pages + leg_pages){
        change_index(page_index - b_pages);
    }
    else {
        change_index(page_index - b_pages - leg_pages);
    }
}

function change_index(index){
    const indexL = document.querySelector('.index_l');
    const indexR = document.querySelector('.index_r');

    const indexLstr = String(index*2).padStart(2, '0')
    const indexRstr = String(index*2 + 1).padStart(2, '0')
    indexL.style.backgroundImage = `url("assets/misc/${indexLstr[0]}.png"), url("assets/misc/${indexLstr[1]}.png")`;
    indexR.style.backgroundImage = `url("assets/misc/${indexRstr[0]}.png"), url("assets/misc/${indexRstr[1]}.png")`;
}

function display_yokai_info(name,dict) {
    try {
        const yokai_name = document.querySelector('.yokai_name');
        yokai_name.innerHTML = name;

        const yokai_num = document.querySelector('.yokai_num');
        const num = dict[name][0]
        yokai_num.style.backgroundImage = `url("assets/misc/${num[0]}b.png"), url("assets/misc/${num[1]}b.png"), url("assets/misc/${num[2]}b.png")`;

        const yokai_rank = document.querySelector('.yokai_rank');
        yokai_rank.style.backgroundImage = `url("assets/misc/${dict[name][3]}.png")`;

        const yokai_tribe = document.querySelector('.yokai_tribe');
        yokai_tribe.style.backgroundImage = `url("assets/misc/${dict[name][2]}.png")`;
    }
    catch (error) {
        const yokai_name = document.querySelector('.yokai_name');
        yokai_name.innerHTML = '???';

        const yokai_num = document.querySelector('.yokai_num');
        yokai_num.style.backgroundImage = `url("assets/misc/0b.png"), url("assets/misc/0b.png"), url("assets/misc/0b.png")`;

        const yokai_rank = document.querySelector('.yokai_rank');
        yokai_rank.style.backgroundImage = `url("assets/misc/E.png")`;

        const yokai_tribe = document.querySelector('.yokai_tribe');
        yokai_tribe.style.backgroundImage = `url("assets/misc/vaillant.png")`;
    }
}

function display_leg_info() {
    let name = leg_ref[page_index - b_pages];

    const yokai_name = document.querySelector('.yokai_name');
    yokai_name.innerHTML = name;

    const yokai_num = document.querySelector('.yokai_num');
    const num = yokaiDict[name][0]
    yokai_num.style.backgroundImage = `url("assets/misc/${num[0]}b.png"), url("assets/misc/${num[1]}b.png"), url("assets/misc/${num[2]}b.png")`;

    const yokai_rank = document.querySelector('.yokai_rank');
    yokai_rank.style.backgroundImage = `url("assets/misc/${yokaiDict[name][3]}.png")`;

    const yokai_tribe = document.querySelector('.yokai_tribe');
    yokai_tribe.style.backgroundImage = `url("assets/misc/${yokaiDict[name][2]}.png")`;
}

function search(input) {
    const emptyRef = Array(b_pages * 24 - b_num).fill(""); //permet de tomber sur le bon index même si la page des boss a pleins de médaillons vides
    ref = [...b_ref, ...emptyRef, ...yokai_ref]
    const closest_name = findTopNClosestStrings(input, ref, 1);
    console.log(closest_name);
    const index = ref.indexOf(closest_name[0]);
    page_index = Math.floor(index/24);
    switch_page();
    update_index();
    display_yokai_info(closest_name[0],yokaiDict);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}

//je connais déjà cette fonction mais bon c'était plus rapide de la copier de l'IA
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Initialize the matrix
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the matrix
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function findTopNClosestStrings(input, stringList, n = 5) {
    // Calculate normalized distances for each string
    const distances = stringList.map(str => {
        const distance = levenshteinDistance(input, str);
        return {
            string: str,
            normalizedDistance: distance / Math.max(input.length, str.length)
        };
    });

    // Sort the strings by their normalized distance
    distances.sort((a, b) => a.normalizedDistance - b.normalizedDistance);

    // Extract the top N closest strings
    const topNClosestStrings = distances.slice(0, n).map(item => item.string);

    return topNClosestStrings;
}