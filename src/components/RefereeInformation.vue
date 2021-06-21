<template>
    <div>
        <ul class="future-match-content">
            <li> Referee ID: {{ refereeID }}</li>
            <li> First name: {{ firstname }}</li>
            <li> Last name: {{ lastname }}</li>
            <li> Course: {{ course }}</li>
        </ul>
    </div>
</template>


<script>
export default {
    name: "refereeInformation",

    props: {
        refereeID: {
            type: Number,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        course: {
            type: String,
            required: true
        }
    }
}
</script>


<style>
    
</style>