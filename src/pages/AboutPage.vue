
<template>
      <div class="container About">
      <h1>About page</h1>
      <div>
        <h4 class="titles">About Our Website</h4>
        <p>
          <ul>
            This site was developed as part of a web development course at Ben Gurion University,<br>
            The site allows the user a variety of services related to the field of the current Super League - 2021/2020
            The services that the site provides are:<br>
            <b>For users:</b><br>
            <li>Tracking past / future games of the current league,</li>
            <li>Add / delete games to favorites,</li>
            <li>Search capabilities of team and players.</li>
            <b>for League management:</b><br>
            <li>Add / delete future games to the current league,</li>
            <li>Add / delete games moved to the current league,</li>
            <li>Placement of judges,</li>
            <li>Adding results to past games,</li>
            <li> Managing event logs of past games.</li>
          </ul>
        </p>
      </div>
        <h4 class="titles">About us </h4>
          <div class="row my-row">

          <div class="match-card favoriteMatches dini card  text-white card-has-bg click-col" style="width: 20rem;">
           <div class="card-img-overlay d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">Daniel Dinshtein:</h5>
              <p class="card-text">                        
              id:312257116
              <br>Email:dinshdan@post.bgu.ac.il
              <br>linkdin:https://www.linkedin.com/in/daniel-dinshtein/
              </p>
            </div>
           </div>
          </div>
          <div class="match-card favoriteMatches card mos text-white card-has-bg click-col" style="width: 20rem;">
            <div class="card-img-overlay d-flex flex-column">

              <div class="card-body">
                <h5 class="card-title">Moshe Biran:</h5>
                             <p class="card-text">                        
              id:204415665
              <br>Email:biranmos@post.bgu.ac.il
              <br>https://www.linkedin.com/in/moshe-biran/
              </p>

              </div>
            </div>
            </div>
      </div>
      <div>
        <br>
        <h4 class="titles">Previous works</h4>
        <p> 
          https://web-development-environments-2021.github.io/204415665/#<br>
          https://web-development-environments-2021.github.io/Assignment2_204415665_312257116/<br>

          https://app.swaggerhub.com/apis/Daniel-And-Moshe/Web-Ass-3/1.0.0<br>

        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: "About",
  components:{
  }
    
}
</script>

<style lang="scss" scoped>

.About {
    min-width:215vh;
    min-height: 94.8vh;
    background: #a1a2a5e0;
    margin: auto;
    // left: 1150px;
    padding: 10px;
    text-align: center;
    
}
h1{
  padding-top: 10px;
  color: aliceblue;
  font-weight: bold;
  font-size: 60px;

}
p{
  text-align: left;
}
.card-body{
  position: relative;
  top: 250px;
}
.my-row{
  position: relative;
  top: 00px;
  left: 400px;
}
.container{
    left: 0px!important;
    position: absolute!important;
}

.match-card.favoriteMatches.card{
    min-height: 500px !important;
    min-width: 330px !important;
    font-size: 17px;
}
.mos{
      background-image:url('../assets/mos.jpg');
}
.dini{
      background-image:url('../assets/dini.jpg');
}
.match-title{
  font-size: 25px!important;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-align: center;
  position: absolute;
  top:30px;
  left: 75px;
  margin: auto;
  color: rgb(32, 32, 32);
}
</style>
