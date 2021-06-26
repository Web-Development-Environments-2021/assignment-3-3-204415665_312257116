<template>
    <div>
        <b-card >
            <b-table 
                :items="eventsLog" >
            </b-table>
        </b-card>
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
    }
}

</script>


<style>
    
</style>