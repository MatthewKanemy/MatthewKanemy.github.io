//The purpose of the below function is to call data in the API which is returned in arrays then lopp through each object in the array to output the relevant information on style cards.
function getData(){
  var countryCode = document.querySelector('#selecter').value;
  $.getJSON("https://api.globalgiving.org/api/public/projectservice/countries/"+countryCode+"/projects/active/summary?api_key=40638fa2-919b-488e-a80d-13c714fe09b9",
  function(data){
    console.log(data);
    if(data.projects.numberFound > 0){
      //implementing the bootstrap stylesheet for the output
      let output = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';
      // adding our own styling to the cards
      output += `
      <style> 
      body { 
        background-color: #00b4d8; 
      } 
      
      .card {
        width: 25%; 
        display: inline-block; 
        margin: 1em;
        vertical-align: top;

      }

      @media (max-width: 1400px) { 
        .card { 
          width: 35%; 
        }
      } 
      
      @media (max-width: 950px) { 
        .card { 
          width: 75%; 
        }
      } 
      
      @media (max-width: 550px) { 
        .card { 
          width: 100%; 
        }
      }

      .btn-group {

        display: none;
        text-align: right;
        padding: 1em;
        position: absolute;
        right: 1em;
      
      }

      @media (max-width: 720px) {

        .nav {
      
          display: none;
      
        }
      
        .btn-group {
      
          display: block;
      
        }
      
        .navBar {
      
          height: 15vw;
      
        }
      
      }

      #country-heading {

        display: none;

      }

      .submit-country {

        display: none;

      }

      #selecter {

        display: none;

      }
    
      .btn {

        position: inline-block;

      }

      </style>
      
      <a href="index2.html" class="btn btn-primary">Search Again</a>

      `;
      // creating card columns
      output += "<div class= 'card-colums' style='width: 100%;'>";
      // for each charaity in api, add a card to the webpage
      $(data.projects.project).each(function(data,result){  
        //adding the card html with variables from API
        output+= `
        
        <div class="card"> 
        <img src="${result.imageLink}" class="card-img-top" alt="..."></img>
        <div class="card-body">
          <h5 class="card-title">${result.title}</h5>
          <p class="card-text">${result.summary}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Topic: ${result.themeName}</li>
          <li class="list-group-item">Program's Mission: ${result.organization.mission}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link"></a>
          <a href="${result.organization.url}" class="card-link">${result.organization.url}</a>
        </div>
      </div>`;
          
    })
      output+= '</div>';
      //adding the card to the page
      var a= document.createElement("div");
      a.innerHTML= output;
      document.getElementById("results").appendChild(a);
      //if theres no charaties found, give an alert saying so
    }else {
      alert("There are no available internationally approved NGOs for this country :(");
    }
     
  }); 
    
}
