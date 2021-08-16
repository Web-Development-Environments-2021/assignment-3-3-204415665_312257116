
<template>
      <div class="container About">
      <h1 style="color:black;">About page</h1>
       <h4 class="titles">About us </h4>
          <div class="row my-row">

            <div class="match-card favoriteMatches dini card  text-white card-has-bg click-col" style="width: 20rem;">
              <div class="card-img-overlay d-flex flex-column">
                <div class="card-body">
                  
                  <p class="card-text">  
                   Daniel Dinshtein<br>                   
                  id:312257116
                  <br>Email:dinshdan@post.bgu.ac.il
                  linkdin:<a href="https://www.linkedin.com/in/daniel-dinshtein/">daniel-dinshtein</a><br>

                  </p>
                </div>
              </div>
            </div>

            <div class="match-card favoriteMatches card mos text-white card-has-bg click-col" style="width: 20rem;">
                <div class="card-img-overlay d-flex flex-column">
                  <div class="card-body">
                    <p class="card-text">   
                      Moshe Biran<br>                     
                      id:204415665
                      <br>Email:biranmos@post.bgu.ac.il
                      linkdin:<a href="https://www.linkedin.com/in/moshe-biran">moshe-biran</a><br>
                    </p>

                  </div>
                </div>
              </div>
      </div>
      <div class="website">
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
       
      <div class="previous">
        <br>
        <h4 class="titles">Previous works</h4>

          <a href="https://web-development-environments-2021.github.io/204415665/#"> Web-Ass-1</a><br>
          <a href="https://web-development-environments-2021.github.io/Assignment2_204415665_312257116/"> PAC-MAN - Web-Ass-2</a><br>
          <a href="https://app.swaggerhub.com/apis/Daniel-And-Moshe/Web-Ass-3/1.0.0">swaggerhub API Web-Ass-3.1</a><br>
          <a href="https://web-development-environments-2021.github.io/Assignment2_204415665_312257116/">Web-Ass-3.2</a><br>


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
    min-width:214vh;
    min-height: 95vh;
    background: #a1a2a57a;
    margin: auto;
    text-align: center;
    
}
.match-card.abo.card{
    min-height: 210px !important;
    min-width: 330px !important;
    background-image:url('../assets/AdobeStock_203017792.jpeg');
    // background-size: cover;
    font-size: 17px;
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
  left: 300px;
  padding: 10px;
  margin-left: 13%;
}

.match-card.favoriteMatches.card{
    min-height: 360px !important;
    min-width: 100px !important;
    font-size: 17px;
    margin-inline: 50px;
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
.card-text{
  text-align: center;
  position: relative;
  top:-80px;
}
.website{
  position: absolute;
  border-radius: 10px;
  padding: 10px;
  left: 8%;
  top: 60%;
  background-color: #293241f3;
  max-width: 1000px;
  max-height: 370px;

  color: aliceblue;
}
.previous {
  position: absolute;
  border-radius: 10px;
  padding: 10px;
  left: 62%;
  top: 60%;
  background-color: #293241f3;
  min-width: 500px;
  min-height: 370px;
  color: aliceblue;
}
</style>
