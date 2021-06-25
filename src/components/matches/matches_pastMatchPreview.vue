<template>
  <div class="past-match-preview">
    <div :title="matchID" class="past-match-title">
      <b>Match Id:</b> {{ matchID }}
    </div>
    <ul class="past-match-content">
      <li> Match date: {{ matchDateAndTime }}</li>
      <li> Local team: {{ localTeamName }}</li>
      <li> Visitor team: {{ visitorTeamName }}</li>
      <li> Venue: {{ venueName }}</li>
      <li> Local team score: {{ localTeamScore }}</li>
      <li> Visitor team score: {{ visitorTeamScore }}</li>
      <li> Referee Information:
        <referee-information v-if="hasRefereeInfo"
          :refereeID="refereeInformation.refereeID"
          :firstname="refereeInformation.firstname"
          :lastname="refereeInformation.lastname"
          :course="refereeInformation.course">
        </referee-information>
      </li>
      <li> Events log: 
        <event-log-preview
          v-for="event in eventsLog"
          :eventID="event.eventID" 
          :eventTimeAndDate="event.eventTimeAndDate" 
          :minuteInMatch="event.minuteInMatch" 
          :eventType="event.eventType"
          :eventDescription="event.eventDescription" 
          :key="event.id">
        </event-log-preview>
      </li>
    </ul>
  </div>
</template>


<script>

import RefereeInformation from "../RefereeInformation"
import EventLogPreview from "../EventLogPreview"

export default {
    name: "PastMatchPreview",

    components: {
      RefereeInformation,
      EventLogPreview
    },

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
      },
      refereeInformation: {
        type: Object,
        required: true
      },
      eventsLog: {
        type: Array,
        required: true
      }
  },
  computed: {
    hasRefereeInfo(){
      return Object.keys(this.refereeInformation).length
    },
    hasEventsLog(){
      return this.eventsLog.length
    }
  },
  mounted(){
    console.log("past match preview mounted")
  } 
};
</script>


<style>
.past-match-preview {
  display: inline-block;
  /* width: 250px; */
  /* height: 200px; */
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