<template>
   <div id="loading-icon" class="my-load-icon">
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
        </div>
</template>
<script>
export default {
    name:"LoadingIcon"
}
</script>
<style>

.my-load-icon{
    background-color: rgba(211, 211, 211, 0.468);
    margin: auto;
    height: 300px;
    width: 500px;
    border-radius:5% ; 
    position: relative;
}
</style>
