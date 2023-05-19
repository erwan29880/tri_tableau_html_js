// créer des ids uniques à chaque div
// et chaque tableau ainsi qu'une div par th d'en-tête 
function set_ids() {
    let divs = document.querySelectorAll('div');
    let tabs = document.querySelectorAll('table');

    for (let i = 0; i < divs.length; i++) {
      if (divs[i].getAttribute('id')=="" || divs[i].getAttribute('id')==null) {
        divs[i].setAttribute('id', 'div_'+i.toString());
      }
    }

    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('id')=="" || tabs[i].getAttribute('id')==null) {
        tabs[i].setAttribute('id', 'tab_'+i.toString());
        let th = tabs[i].querySelectorAll('th');
        for (let j = 0; j < tabs.length; j++) {
          th[j].setAttribute('id', 'tab_'+i.toString() + "_" + j.toString());
        }
      }
    }
  }
  
  
  // récupérer les entêtes
function find_entetes(table) {
    let lignes = [];
    let td = table.getElementsByTagName('th');
    for (let j = 0; j < td.length; j++) {
        lignes.push(td[j]);
        }
    return lignes;
  }
  
  
  // récupérer les lignes
function find_cells(table) {
    let lignes = [];
    let td = table.getElementsByTagName('td');
    for (let j=0; j < td.length; j++){
        lignes.push(td[j]);
        }
    return lignes;
  }
  
  
  // stocker le contenu du tableau dans un json
function recuper_contenu_tableau(tab) {
    let lign = [];
    let tr = tab.querySelectorAll("tbody > tr");
    let th = tab.querySelectorAll("thead > tr");
    let tab_head = find_entetes(th[0], 'th');
    
    for (let i = 0; i < tr.length; i++) {
        cells = {};
        let tab_body = find_cells(tr[i], 'td'); 
        for(j = 0; j < tab_head.length; j++) {
            cells[tab_head[j].textContent] = tab_body[j].textContent;
        }
        lign.push(cells);
    }
    return lign;
  }
  
  
  // une fois le tableau trié remets les évènements cliks sur les entetes
function add_events(tab) {
    let th = tab.querySelectorAll('th');
  
    //pour chaque entête
    for (let j = 0; j < th.length; j++) {
      let th_id = th[j].getAttribute('id');
      let tr = tab.querySelectorAll("tbody > tr");
      if (th[j].textContent.toLowerCase() == 'date') { 
          th[j].addEventListener('click', function(){
              sort_table(tab, find_dates(tr, j));
          });
      } else {
          th[j].addEventListener('click', function(){
              sort_table(tab, find_values(tr, j));
          });
      }
    }
  }
  
  
  // créé des évènements cliks dynamiquement sur les entetes de tableau
function add_event_onloading() {
    let tables = document.querySelectorAll('table');
  
    // boucle sur les tableaux
    for (let i = 0; i < tables.length; i++) {
      let th = tables[i].querySelectorAll('th')
  
      //pour chaque entête
      for (let j = 0; j < th.length; j++) {
        let tr = tables[i].querySelectorAll("tbody > tr");
        if (th[j].textContent.toLowerCase() == 'date') { 
            th[j].addEventListener('click', function(){
                sort_table(tables[i], find_dates(tr, j));
            });
        } else {
            th[j].addEventListener('click', function(){
                sort_table(tables[i], find_values(tr, j));
            });
        }
      }
    }
}
  
  
  
  //récupérer les dates en timestamp pour trier
function find_dates(tr, j) {
      col_dates_date = []
      for (let i = 0; i < tr.length ; i++) {
          let td = tr[i].getElementsByTagName('td');
          if (td[j].textContent) col_dates_date.push(Date.parse(td[j].textContent));
      }
      return col_dates_date;
}
  
  
// test alphabétque pour vérifier si le tri s'effectue par chaine de caractère
function test_alpha(st) {
    let test = st.toString()
    if (test.match(/([a-zA-Z]+)/)) {
      return true;
    } else {
      return false;
    }
}
  
  
// utilisée dans les fonctions events ci dessus
function find_values(tr, j) {
    col_v = []
    for (let i = 0; i < tr.length ; i++){
        let td = tr[i].getElementsByTagName('td');
        let prov = td[j].textContent;
        prov = prov.replace(/,/g,'');
        if (test_alpha(prov)) {
          col_v.push(prov);
        } else {
        prov = parseInt(prov);
        col_v.push(prov);
        }
    }
    return col_v;
}
  
  
  
// test pour évaluer si les chaines de caractères seront triés par ordre croissant ou décroissant
function test_min(st) {
    test = st[0];
    for (let i = 1; i < st.length; i++) {
        if (test<st[i]) {
          return true;
        }
    }
    return false;
}
  
  
// fonction de tri soit numérique, soit alphabétique
// to do : tri indifférent à la casse
function tri_bulle(tableau) {
    let idx = [];
    for (let i=0;i<tableau.length;i++) {
      idx.push(i);
    }  
    let permutation = true;
    let passage = 0;
    let compareValue = 0;
    let prov1 = 0;
    let prov2 = 0;
    let prov3 = 0;
    let prov4 = 0;
    let ascend = 1
  
    // tri croissant ou décroissant
    if (test_alpha(tableau[0])) {
        if (test_min(tableau)) {
          ascend = -1;
        }
    } else {
        if (tableau[0]<tableau[tableau.length-1]) ascend = -1;
    }
  
    while (permutation==true) {
      permutation = false;
      passage++;
      for (i = 0; i < tableau.length-passage; i++) {
          if (test_alpha(tableau[0])) {
            compareValue = tableau[i].localeCompare(tableau[i+1]);
          } else {
              if (tableau[i]>tableau[i+1]) {
                  compareValue=1;
              } else {
                  compareValue=-1;
              }
          }
          if (compareValue==ascend) {
              permutation = true;
              prov1 = tableau[i];
              prov2 = tableau[i+1];
              prov3 = idx[i];
              prov4 = idx[i+1];
              tableau[i] = prov2;
              tableau[i+1] = prov1;
              idx[i] = prov4;
              idx[i+1] = prov3;
          }
      }
    }
    return idx;
  }
  
  
// recréer le tableau trié : header
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        let th_var_name = table.getAttribute('id') + '_' + key;
        th_var_name = th_var_name.replace(' ', '_');
        th_var_name = th_var_name.replace(/[àéèçêù]/g, '');
        th.setAttribute('id', th_var_name)
        th.appendChild(text);
        row.appendChild(th);
    }
}


// recréer le tableau trié : corps
function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
  
  
// supprimer et recréer un tableau vide avec un id
function remove_create(no_id) {
    let tab_id = no_id.getAttribute('id');
    let tbl = document.getElementById(tab_id);
    let container = document.getElementById(tbl.parentNode.id);
    if (tbl) tbl.parentNode.removeChild(tbl);
    
    // create table
    let ta = document.createElement('table');
    ta.setAttribute('id', tab_id);
    ta.setAttribute('class', 'tableau_1');
  
    container.appendChild(ta);
    return tab_id;
}
  
  
  
// tri du tableau
function sort_table(tab, col) {
    let lignes = recuper_contenu_tableau(tab);
    let new_arr=[];
    let new_index = tri_bulle(col);
    
    for (let i = 0; i < new_index.length; i++) {
        new_arr.push(lignes[new_index[i]]);
    }
  
    let tab_id = remove_create(tab);
    set_ids();
  
    let table = document.getElementById(tab_id);
  
    let data = Object.keys(new_arr[0]);
    generateTable(table, new_arr); // generate the table first
    generateTableHead(table, data); // then the header
    add_events(table);
}
  

set_ids();
add_event_onloading();
  