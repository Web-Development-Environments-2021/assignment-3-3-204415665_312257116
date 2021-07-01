<template>
    <div>
        <b-table
            hover
            bordered
            striped
            outlined
            :items="eventsLog" >
        </b-table>
        <b-button variant="primary" size="md" >
            Add New Event
        </b-button>
    </div>
</template>


<script>

export default {
    name: "EventsLogPreview",

    date(){
        return{

        }
    },
    props: {
        eventsLog: {
            type: Array,
            require: true
        }
    },
    mounted(){
        console.log("Events Log Mounted");
    }
}

</script>


<style>
    
</style>