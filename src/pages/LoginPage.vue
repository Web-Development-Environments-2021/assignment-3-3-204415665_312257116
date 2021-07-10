<template>
  <div class="container" >
    <div class="row log-css">
      <b-form @submit.prevent="onLogin">
      <div>
          <div class="login-card">
              <div class="login-box">
                  <div class="login-snip"> <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Login</label> 
                      <div class="login-space">
                          <div>
                            <!--------------- Username --------------->
                            <div class="group">
                                 <b-form-group
                                  id="input-group-Username"
                                  label-for="Username"
                                ><label for="Username" class="label">Username</label>
                                  <b-form-input
                                    id="Username"
                                    v-model="$v.form.username.$model"
                                    type="text"
                                    class="input"
                                    placeholder="Enter your username"
                                    :state="validateState('username')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback>
                                    Username is required
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                            <!--------------- Password --------------->
                              <div class="group">
                                  <b-form-group
                                    id="input-group-Password"
                                    label-for="Password"
                                  >
                                   <label for="Password" class="label">Password</label>

                                    <b-form-input
                                      id="Password"
                                      type="password"
                                      class="input"
                                      data-type="password"
                                      placeholder="Enter your password"
                                      v-model="$v.form.password.$model"
                                      :state="validateState('password')"
                                    ></b-form-input>
                                    <b-form-invalid-feedback>
                                      Password is required
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                              </div>

                            <!--------------- Password --------------->
                              <div class="hr"></div>

                              <div class="group">
                                <b-button
                                  type="submit"
                                  variant="primary"
                                  style="width:100px;display:block;"
                                  class="mx-auto w-100 button"
                                  value="Sign In"
                                  >Sign In</b-button>
                              </div>
                              <div class="mt-2 foot" style="color: white">
                                  Do not have an account yet?
                                  <router-link to="register"> <br>Register in here</router-link>
                              </div>
                              <b-alert
                                class="mt-2"
                                v-if="form.submitError"
                                variant="warning"
                                dismissible
                                show
                              >
                                Login failed: {{ form.submitError }}
                              </b-alert>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </b-form>
  </div>
</div>
</template>
      






    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->


<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      },
      mainStyle:false
    };
  },

  validations: {
    form: {
      username: {
        required, 
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        this.axios.defaults.withCredentials = true;
         const response = await this.axios.post(
          this.$root.store.serverUrl + "Login",
          {
            username: this.form.username,
            password: this.form.password
          }

        );
        // this.axios.defaults.withCredentials = false;


        this.$root.store.login(this.form.username);



        if ( this.form.username == "daniMoshe" ){

          this.$root.store.initDataForUnionAgent();
        }
        await this.$root.store.initDataForUser();
        if ( this.$route.path == "/Login" ) {
          this.$router.push("/");
        }
        
      } catch (err) {
        this.form.submitError = err?.response.data.message;
        this.$root.toast("Login", "Username or Password incorrect", "danger");

      }
    },
    async onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      await this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>

.log-css{
  margin: auto;
  left: -10px;
  position: absolute;
      height: 500px;

  
}
.login-box {
    height: 500px;
    height: 500px;
    border-radius: 30px;
}

.login-snip {
    height: 500px;
    position: absolute;
    border-radius: 30px;
    padding: 30px 80px 0px 80px;
    background: #293241e0;
    margin: auto;
}


</style>
