<template>
    <div id="currentstagematches">
        <b-container class="bv-example-row">
        <b-row>
            <b-col>1 of 1</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 3</b-col>
            <b-col cols="8">2 of 3 (wider)</b-col>
            <b-col>3 of 3</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 3</b-col>
            <b-col>2 of 3</b-col>
            <b-col>3 of 3</b-col>
            <b-col>3 of 3</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 1</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
        </b-row>
        <b-row>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
            <b-col>1 of 1</b-col>
        </b-row>
        </b-container>
        
        <!-- <div>
        <div class="box">
            <div class="shadow"></div>
            <div class="gravity">
                <div class="ball"></div>
            </div>
        </div>
        <div class="loading loading03">
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
        </div>
        </div> -->
        <LoadingIcon/>
    </div>
</template>


<script>
import LoadingIcon from "../../components/loading.vue"
export default {
    name: "CurrentStageMatches",
    components:{
      LoadingIcon,
    }
    
}
</script>


<style scoped>
  /* .container{
      background-color: lightsteelblue;
      text-align: center;
      max-height: 100%;
      max-width: 80%;
      border-style: dotted;
  } 
  .row{
      margin: 10px;
       } 
  .col {
      border-style: dotted; 
      } 
  .col-8 {
      border-style: dotted; 
      }  */



</style>