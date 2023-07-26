<template>
  <v-app>
     <v-main>
        <v-container fluid fill-height>
           <v-layout align-center justify-end>

              <v-row>
                <v-col cols="7">

                </v-col>
                <v-col>
                 <v-card >
                    <v-toolbar dark color="indigo darken-4" >
                       <v-toolbar-title>{{isRegister ? state.register.name : state.login.name}}</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                    <form ref="form" @submit.prevent="isRegister ? register() : login()">
                           <v-text-field
                             v-model="username"
                             name="username"
                             label="Username"
                             type="text"
                             color="indigo darken-4"
                             placeholder="username"
                             required
                             outlined
                          ></v-text-field>
                           <v-text-field
                             v-model="password"
                             name="password"
                             label="Password"
                             type="password"
                             color="indigo darken-4"
                             placeholder="password"
                             required
                             outlined
                          ></v-text-field>

                          <v-text-field v-if="isRegister"
                             v-model="confirmPassword"
                             name="confirmPassword"
                             label="Confirm Password"
                             color="indigo darken-4"
                             type="password"
                             placeholder="confirm password"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="firstName"
                             name="firstName"
                             label="First Name"
                             type="text"
                             color="indigo darken-4"
                             placeholder="firstName"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="lastName"
                             name="lastName"
                             label="Last Name"
                             type="text"
                             color="indigo darken-4"
                             placeholder="lastName"
                             required
                             outlined
                          ></v-text-field>
                          <v-text-field v-if="isRegister"
                             v-model="email"
                             name="email"
                             label="Email"
                             type="text"
                             color="indigo darken-4"
                             placeholder="email"
                             required
                             outlined
                          ></v-text-field>
                          <v-container>
                            <v-row>
                               <v-col>
                                  <v-btn dark type="submit" class="mt-4" color="indigo darken-4" value="log in">{{isRegister ? state.register.name : state.login.name}}</v-btn>
                               </v-col>
                               <v-col>
                                  <v-btn class="text-h7 mt-4" small text v-on:click="toggleAction()">
                                     {{toggleMessage}}  
                                 </v-btn>
                               </v-col>
                            </v-row>
                          </v-container>
                     </form>
                    </v-card-text>
                 </v-card>
                </v-col>
                <v-col cols="1">
                </v-col>
              </v-row>
           </v-layout>
        </v-container>
     </v-main>
  </v-app>
</template>

<script>


export default {
 name: "App",
 data() {
   return {
     username: "",
     password: "",
     confirmPassword: "",
     firstName: "",
     lastName: "",
     email: "",
     isRegister : false,
     errorMessage: "",
     state: {
        register :{
           name: 'Register',
           message: 'Already have an Account? Login'
        },
        login : {
           name: 'Sign In',
           message: "Don't have an Account? Register"
        }
     },
   };
 },
 methods: {
  async login() {
    console.log(this.username)
    // // const resp = await UserService.validateUser(this.username, this.password); 
    
    //  if(resp.isUserValid==true){
    //    const { username } = resp;
    //    this.userStore.setUser(resp);
    //    this.$router.replace({ name: "dashboard", params: { username: username } });
    //  }else{
    //    this.errorMessage = "Invalid credentials."
    //  }
   
   },
   async register() {
    return
      // if(this.password == this.confirmPassword){
      //    this.isRegister = false;
      //    this.errorMessage = "";
      //    const resp = await UserService.registerUser(this.username, this.password);
      //    console.log(resp)
      //    this.$refs.form.reset();
      // }
      // else {
      //   this.errorMessage = "Passwords did not match, try again."
      // }
   },
   toggleAction()
   {
    this.resetForm();
    this.isRegister = !this.isRegister; this.errorMessage="";
   },
   resetForm(){
    this.password = "";
    this.confirmPassword ="";
   }
  },
     computed: {
      toggleMessage : function() { 
         return this.isRegister ? this.state.register.message : this.state.login.message }
   }
};
</script>
<style>
#app {
  background: url('https://images.unsplash.com/photo-1487700160041-babef9c3cb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80')
    no-repeat center center fixed !important;
  background-size: cover;
}
</style>