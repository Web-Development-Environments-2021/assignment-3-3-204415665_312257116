<template>
  <!-- <div class="container"> -->
    <div>

    <div class="row register-css">
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <div>
          <div class="login-card" >
              <div class="login-box">
                  <div class="login-snip" style="height: auto; width: auto;"> 
                    <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
                      <label for="tab-1" class="tab">Register</label>
                      <div class="login-space">
                          <div>
                             <!----------  username  ---------->
                              <div class="group">
                                <b-form-group
                                  id="input-group-username"
                                  label-for="username">
                                <label for="username" class="label">Username</label>
                                <b-form-input
                                    id="username"
                                    v-model="$v.form.username.$model"
                                    type="text"
                                    class="input" 
                                    placeholder="Enter your Username"
                                    :state="validateState('username')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback v-if="!$v.form.username.required">
                                    Username is required
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-else-if="!$v.form.username.length">
                                    Username length should be between 3-8 characters long
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-if="!$v.form.username.alpha">
                                    Username alpha
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                               <!----------  firstName  ---------->
                              <div class="group">
                              <b-form-group
                                id="input-group-firstName"
                                label-for="firstName">                                
                                <label for="firstname" class="label">first name</label>
                                <b-form-input
                                  id="firstname"
                                  v-model="$v.form.firstName.$model"
                                  type="text"
                                  class="input"
                                  placeholder="Enter your First name"
                                  :state="validateState('firstName')"
                                ></b-form-input>
                                <b-form-invalid-feedback v-if="!$v.form.firstName.required">
                                  first name is required
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-else-if="!$v.form.firstName.length">
                                  First name length should be at least 1 characters long
                                </b-form-invalid-feedback>
                                <b-form-invalid-feedback v-if="!$v.form.firstName.alpha">
                                  First name must contain only letters
                                </b-form-invalid-feedback>
                              </b-form-group>
                              </div>

                              <!----------  lastName  ---------->
                              <div class="group">
                                <b-form-group
                                  id="input-group-lastName"
                                  label-for="lastname"
                                >           
                                  <label for="lastname" class="label">lastname</label>
                                  <b-form-input
                                    id="lastName"
                                    class="input"
                                    placeholder="Enter your last Name"
                                    v-model="$v.form.lastName.$model"
                                    type="text"
                                    :state="validateState('lastName')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback v-if="!$v.form.lastName.required">
                                    Last name is required
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-else-if="!$v.form.lastName.length">
                                    Last name length should be at least 1 characters long
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-else-if="!$v.form.lastName.alpha">
                                    Last name must contain only letters
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                              <!----------  Country  ---------->
                              <div class="group">
                                <b-form-group
                                  id="input-group-country"
                                  label-for="country"
                                >
                                <label for="country" class="label">country</label>

                                  <b-form-select
                                    id="country"
                                    v-model="$v.form.country.$model"
                                    :options="countries"
                                    class="select"
                                    type="select"
                                    :state="validateState('country')"
                                  ></b-form-select>
                                  <b-form-invalid-feedback>
                                    Country is required
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                              <!----------  email  ---------->
                              <div class="group">
                                <b-form-group
                                  id="input-group-email"
                                  label-for="email">

                                  <label for="email" class="label">Email Address</label>
                                  <b-form-input
                                    id="email"
                                    type="email" 
                                    class="input" 
                                    placeholder="Enter your email address"
                                    v-model="$v.form.email.$model"
                                    :state="validateState('email')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback v-if="!$v.form.email.required">
                                    Email is required
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-else-if="!$v.form.email.email">
                                    Email is not valid
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                              <!----------  Password  ---------->
                              <div class="group">
                                  <b-form-group
                                    id="input-group-Password"
                                    label-for="password"
                                  >
                                    <label for="password" class="label">Password</label>

                                    <b-form-input
                                      id="password"
                                      type="password"
                                      class="input"
                                      data-type="password"
                                      placeholder="Create your password"
                                      v-model="$v.form.password.$model"
                                      :state="validateState('password')"
                                    ></b-form-input>
                                    <b-form-invalid-feedback v-if="!$v.form.password.required">
                                      Password is required
                                    </b-form-invalid-feedback>
                                    <b-form-text v-if="$v.form.password.$error" text-variant="info">
                                      Your password should be <strong>strong</strong>. <br />
                                      For that, your password should be also:
                                    </b-form-text>
                                    <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.length">
                                      Have length between 5-10 characters long
                                    </b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.hasNumber">
                                      Must contain at least one number character
                                    </b-form-invalid-feedback>
                                    <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.hasSpecialCharacter">
                                      Must contain at least one special character
                                    </b-form-invalid-feedback>
                                  </b-form-group>
                              </div>

                              <!----------  confirmedPassword  ---------->
                              <div class="group">
                                <b-form-group
                                  id="input-group-confirmedPassword"
                                  label-for="confirmedPassword"
                                >
                                <label for="pass" class="label">Repeat Password</label>
                                  <b-form-input
                                    id="confirmedPassword"
                                    type="password" 
                                    class="input"
                                    data-type="password"
                                    placeholder="Repeat your password"
                                    v-model="$v.form.confirmedPassword.$model"
                                    :state="validateState('confirmedPassword')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
                                    Password confirmation is required
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback
                                    v-else-if="!$v.form.confirmedPassword.sameAsPassword"
                                  >
                                    The confirmed password is not equal to the original password
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                             <div class="group">
                            <!----------  image_url  ---------->
                                <b-form-group
                                  id="input-group-image_url"
                                  label-for="image_url"
                                >
                                 <label for="image_url" class="label">image url</label>
                                  <b-form-input
                                    class="input"
                                    id="image_url"
                                    type="text"
                                    v-model="$v.form.image_url.$model"
                                    :state="validateState('image_url')"
                                  ></b-form-input>
                                  <b-form-invalid-feedback v-if="!$v.form.image_url.required">
                                    Image url is required
                                  </b-form-invalid-feedback>
                                  <b-form-invalid-feedback v-if="!$v.form.image_url.url">
                                    Image url is not valid
                                  </b-form-invalid-feedback>
                                </b-form-group>
                             </div>
                              <div class="register-button">
                                <b-button
                                  type="submit"
                                  variant="primary"
                                  style="border-radius: 10%; padding: 10px;"
                                  >Register</b-button>
                                  <b-button style="border-radius: 10%; padding: 10px;" type="reset" variant="danger" >Reset</b-button>
                              </div>
                              <div class="hr"></div>
                              <div class="foot"> <label for="tab-1">Already Member?</label> </div>
                              
                              <div class="mt-2">
                                You have an account already?
                                <router-link to="login"> Log in here</router-link>
                              </div>
                            <b-alert
                              class="mt-2"
                              v-if="form.submitError"
                              variant="warning"
                              dismissible
                              show
                            >
                              Register failed: {{ form.submitError }}
                            </b-alert>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      </b-form>
  </div>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  url,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image_url:"",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstName: {
        required,
        length: (f) => minLength(1)(f),
        alpha
      },
      lastName:{
        required,
        length: (l) => minLength(1)(l),
        alpha
      },
      country: {
        required
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        hasNumber: (l) => /[0-9]/.test(l),
        hasSpecialCharacter: (l) => /[#?!@$%^&*()_-]/.test(l)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      image_url:{       
        required,
        url
      },
      email:{       
        required,
        email
      },

    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          this.$root.store.serverUrl + "Register",
          {
            username: this.form.username,
            password: this.form.password,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            country: this.form.country,
            password: this.form.password,
            email: this.form.email,
            image_url: this.form.image_url
          }
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        this.$router.push("/login");
        // console.log(response);
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image_url: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// .container {
//   max-width: 500px;
// }
.register-css{
  top: 45px;
  right:400px; 
  height: auto;
  width: 650px;
  bottom: 0;
  position:absolute;
  padding-top: 0px;
  overflow: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(190, 186, 186, 0.671);
  border-radius: 10px;
}
.register-button{
  margin : auto;
  padding-inline: 50px;
}

</style>
