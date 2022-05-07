<template>
<base-card>
<li>
    <h3 class="actions">{{coach.firstName}} {{coach.lastName}}</h3>
    <h4>${{coach.rate}}/hour</h4>
    <div>
        <span v-for="area in coach.areaOfExpertise" :key="area">
            {{area}}
        </span>
    </div>
    <div class="actions">
        <router-link :to="getContactCoachPath">Contact Coach</router-link>
         <router-link :to="getDetailsPath">View Details</router-link>
    </div>
</li>
</base-card>
</template>
<script>
export default {
    props:['coach'],
    computed:{
        getContactCoachPath(){
            return "/coaches/" + this.coach.id +"/contact";
        },
        getDetailsPath(){
            return "/coaches/" + this.coach.id;
        }
    }
}
</script>
<style scoped>
li {
  margin: 1rem 0;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>