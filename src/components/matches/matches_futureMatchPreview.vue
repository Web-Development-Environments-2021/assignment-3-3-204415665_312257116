<template>
  <div class="match-preview">
    <div :title="matchID" class="match-title">
      <b>Match Id:</b> {{ matchID }}
    </div>
    <ul class="match-content">
      <li> Match date: {{ matchDate }}</li>
      <li> Local team: {{ localTeamName }}</li>
      <li> Visitor team: {{ visitorTeamName }}</li>
      <li> Venue: {{ venueName }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "futureMatchPreview",
  props: {
      matchID: {
        type: Number,
        required: true
      },
      matchDate: {
        type: String,  //TODO: Match change type to dateTime
        required: true
      },
      localTeamName: {
        type: String,
        required: true
      },
      visitorTeamName: {
        type: String,
        required: true
      },
      venueName: {
        type: String,
        required: true
      },
      // TODO: What About Referee???

  }, 
  mounted(){
    console.log("match preview mounted")
  } 
};
</script>

<style>
.match-preview {
  display: inline-block;
  width: 250px;
  height: 200px;
  position: relative;
  margin: 10px 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 5px;
  border-color:cadetblue;
}

.match-preview .match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.match-preview .match-content {
  width: 100%;
  overflow: hidden;
}



</style>
