<template>
    <div>
        <h4 class="display-1">Sign Up</h4>

        <instructions details="Sign up for our nifty site." />

        <v-form>
            <v-text-field
                    label="Team Name"
            ></v-text-field>
            <v-btn v-on:click="handleSubmit"
            >Create Team
            </v-btn>
        </v-form>
    </div>
</template>

<script>
  import Instructions from "../components/Instructions.vue";
  import axios from "axios";

  export default {
    name: "CreateTeamPage",
    components: {
      Instructions
    },
    data: function() {
      return {
        valid: false,
        teamname: "",

        dialogHeader: "<no dialogHeader>",
        dialogText: "<no dialogText>",

      };
    },
    methods: {
      handleSubmit: function() {
        axios
          .post("/team", {
            teamname: this.teamname,

          })
          .then(result => {
            if (result.status === 200) {
              if (result.data.ok) {
                this.showDialog("Success", result.data.msge);
              } else {
                this.showDialog("Sorry", result.data.msge);
              }
            }
          })
          .catch(err => this.showDialog("Failed", err));
      },
      showDialog: function(header, text) {
        this.dialogHeader = header;
        this.dialogText = text;
        this.dialogVisible = true;
      },
      hideDialog: function() {
        this.dialogVisible = false;
        this.$router.push({ name: "home-page" });
      }
    }
  };
</script>