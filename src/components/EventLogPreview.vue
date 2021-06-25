<template>
    <div>
        <ul class="event-log-content">
            <li> Event ID: {{ eventID }}</li>
            <li> Date and time: {{ eventTimeAndDate }}</li>
            <li> Minute in match: {{ minuteInMatch }}</li>
            <li> Event type: {{ eventType }}</li>
            <li> Event description: {{ eventDescription }}</li>
        </ul>
    </div>
</template>


<script>

export default {
    name: "EventLogPreview",

    props: {
        eventID: {
            type: Number,
            required: true
        },
        eventTimeAndDate: {
            type: String, //TODO: Match change type to dateTime
            required: true
        },
        minuteInMatch: {
            type: Number,
            required: true
        },
        eventType: {
            type: String,
            required: true
        },
        eventDescription: {
            type: String
        }
    }
}

</script>


<style>
    
</style>