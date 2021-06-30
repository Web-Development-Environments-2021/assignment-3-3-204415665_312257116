<template>
  <div>
    <!-- <router-link :to="{name:player}">
    </router-link> -->
      <b-card
        :title="this.player.name"
        :img-src="this.player.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 15rem;"
      >
        <b-card-text>
          team name:{{this.player.team_name}} <br> position:{{this.player.position}}
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
  </div>
</template>

<script>
export default {
    name: "PlayersInformation",

    props: {
        player: {
            type: Object,
            required: true
        }
        
    }
}
</script>

<style>

</style>