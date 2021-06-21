<template>
  <div class="past-match-preview">
    <div :title="matchID" class="past-match-title">
      <b>Match Id:</b> {{ matchID }}
    </div>
    <ul class="past-match-content">
      <li> Match date: {{ matchDate }}</li>
      <li> Local team: {{ localTeamName }}</li>
      <li> Visitor team: {{ visitorTeamName }}</li>
      <li> Venue: {{ venueName }}</li>
    </ul>
  </div>
</template>


<script>
export default {
    name: "pastMatchPreview",
    props: {
      matchID: {
        type: Number,
        required: true
      },
      matchDateAndTime: {
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
      localTeamScore: {
        type: Number
      },
      visitorTeamScore: {
        type: Number
      }
      // TODO: What About Referee???

  }, 
  mounted(){
    console.log("past match preview mounted")
  } 
};
</script>


<style>
.past-match-preview {
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

.past-match-preview .past-match-title {
  text-align: center;
  text-transform: uppercase;
  color:  rgb(111, 197, 157);
}

.past-match-preview .past-match-content {
  width: 100%;
  overflow: hidden;
}
</style>