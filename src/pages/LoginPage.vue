<template>
  <div class="container">
    <div class="row log-css">
      <b-form @submit.prevent="onLogin">
      <div>
          <div class="login-card">
              <div class="login-box">
                  <div class="login-snip" > <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Login</label> 
                      <div class="login-space">
                          <div>
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

                              <div class="group"> <input id="check" type="checkbox" class="check" checked> <label for="check"><span class="icon"></span> Keep me Signed in</label> </div>
                              <div class="group">
                                <b-button
                                  type="submit"
                                  variant="primary"
                                  style="width:100px;display:block;"
                                  class="mx-auto w-100 button"
                                  value="Sign In"
                                  >Sign In</b-button>
                              </div>
                              <div class="hr"></div>

                              <div class="foot"> <a href="#">Forgot Password?</a> </div>
                              <div class="mt-2">
                                  Do not have an account yet?
                                  <router-link to="register"> Register in here</router-link>
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
      }
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
        // console.log(response);

        this.$root.store.login(this.form.username);

        
        if ( this.form.username == "daniMoshe" ){

          this.$root.store.initDataForUnionAgent();
        }

        await this.$root.store.initDataForUser();

        // console.log(localStorage.getItem("UserFavoriteMatches"));
        if ( this.$route.path != "/" ) {
          this.$router.push("/");
        }
        
      } catch (err) {
        // console.log(response);
        this.form.submitError = err?.response.data.message;
        this.$root.toast("Login", "Username or Password incorrect", "danger");

      }
    },
    async onLogin() {
      // console.log("login method called");
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("login method go");

      await this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>

.log-css{
  margin: auto;
}
</style>
