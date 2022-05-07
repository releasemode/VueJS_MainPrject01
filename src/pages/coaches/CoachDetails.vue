<template>
    <h1>CoachDetails </h1>
    <h3>{{coach.firstName}} {{coach.lastName}}</h3>
    <p>{{coach.desciption}}</p>
    <h1>$ {{coach.rate}}/hour</h1>
    <ul v-for="area in coach.areaOfExpertise" :key="area">
        <li>{{area}}</li>
    </ul>
</template>

<script>
export default {
    data(){
        return{
            coachId:this.$route.params["id"],
          
        }
    },
    computed:{
        coach(){
            
            return this.$store.getters['coach/coachById'](this.coachId);
        }
    },
   
}
</script>