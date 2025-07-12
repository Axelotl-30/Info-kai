function loadPage(){
    const params = new URLSearchParams(window.location.search);

    const yokai = params.get("yokai"); 
    let game = params.get("game");

    const body = document.querySelector('body');
    body.innerHTML = `<p>Le yokai est : ${yokai}</p>
                      <p>Le jeu est : ${game}</p>`;
}

loadPage();