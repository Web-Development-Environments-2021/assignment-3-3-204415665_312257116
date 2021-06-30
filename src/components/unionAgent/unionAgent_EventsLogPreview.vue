<template>
    <div>
        <b-table 
            :items="eventsLog" >
        </b-table>
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