<template>
    <div>
        <b-table
            hover
            bordered
            striped
            :items="informationList" >
        </b-table>
    </div>
</template>


<script>

export default {
    name: "RefereePreview",

    props: {
        refereeInfo: {
            type: Object,
            require: true,
        }
    },
    computed:{

        informationList(){

            var infoList = [];

            if ( this.refereeInfo != {} ){
                infoList.push( {
                    refereeId : this.refereeInfo.refereeID,
                    firstName : this.refereeInfo.firstname,
                    lastName : this.refereeInfo.lastname,
                    course : this.refereeInfo.course
                });
            }
            return infoList;
        }
    },
    mounted(){
        console.log("Referee Preview Mounted");
    }
}

</script>


<style>
    
</style>