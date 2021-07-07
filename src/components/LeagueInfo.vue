<template>
    <div class="league-preview">
      <div class="match-card league-card  text-white">
      <!-- img-alt="Image"
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    > -->
    <div class="card-img-overlay d-flex flex-column">
      <div class="card-body" >                         
        <h4 class="card-title mt-0">
          <!-- <a class="text-white" herf="#"> -->
            <div>
              <b-card-title>{{leagueName}}</b-card-title>
              <b-card-text>
                Season: {{ season }}
                <br/>
                Stage: {{ stage }}
              </b-card-text>
            </div>
          </h4>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "LeagueInfo",
  
  data() {
      return {
        leagueName:"superliga", 
        season:"season", 
        stage:"stage"
      };
    },
}
</script>

<style>
.match-card.league-card{
    min-height: 100% !important;
    border-radius: 0px;
    font-size: 17px;
    background: #293241e0;

}
.league-preview {
  display: inline-block;
  width: 300px;
  height: 673px;
  position: relative;
  margin: 10px 10px;
  /* border-style: solid; */
  /* border-radius: 10px; */
  border-width: 5px;
}

.league-preview .league-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 155, 197);
}

.league-preview .league-content {
  width: 100%;
  overflow: hidden;
}

</style>