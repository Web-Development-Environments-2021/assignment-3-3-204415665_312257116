<template>
  <!-- <div class="container"> -->
    <div>

    <div class="row register-css">
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">

      <!-- <div class="login-card">
        <div class="login-box"> -->
          <div class="login-snip"> 
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
                             <!----------  email  ---------->
                              <div class="group left-input">
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
                               <!----------  firstName  ---------->
                              <div class="group top-80">
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
                              <div class="group left-input top-80">
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
                              <!----------  Password  ---------->
                              <div class="group top-160">
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
                              <div class="group left-input top-160">
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

                              <!----------  Country  ---------->
                              <div class="group top-240">
                                <b-form-group
                                  id="input-group-country"
                                  label-for="country"
                                >
                                <label for="country" class="label">country</label>

                                  <b-form-select
                                    id="country"
                                    v-model="$v.form.country.$model"
                                    :options="countries"

                                    type="select"
                                    class="select"
                                    :state="validateState('country')"
                                  ></b-form-select>
                                  <b-form-invalid-feedback>
                                    Country is required
                                  </b-form-invalid-feedback>
                                </b-form-group>
                              </div>

                            <!----------  image_url  ---------->
                             <div class="group left-input top-240">
                                <b-form-group
                                  id="input-group-image_url"
                                  label-for="image_url"
                                >
                                 <label for="image_url" class="label">image url</label>
                                  <b-form-input
                                    class="input"
                                    id="image_url"
                                    type="text"
                                    placeholder="Enter your url image "

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

                              <div class="register-button" >
                                <b-button
                                  type="submit"
                                  variant="primary"
                                  style="padding-inline: 70px;">Register</b-button>
                              </div>
                                  
                              <div class="register-button" style="left:850px;">
                                  <b-button 
                                  type="reset" 
                                  variant="danger"
                                  style="padding-inline: 70px;" >Reset</b-button>
                              </div>

                              <div class="hr">
                                You have an account already?
                                <router-link to="login"> Log in here</router-link></div>
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

.register-css{
  height: 80vh;

  margin: auto;
  color: white;
}

.login-snip {
  height: 100vh;
  width:2000vh;

  top:46px;
  left:0px;
  padding: 30px 0px 0px 80px;
  margin-bottom: 100px;
}

.group{
  position: absolute; 
  width:500px;
  margin: auto;
}



//   .login-box {
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     background: url(https://images.unsplash.com/photo-1507208773393-40d9fc670acf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1268&q=80) no-repeat center;
// }

.register-button{
  position: absolute;
  bottom:-50px;
  left:600px;
  margin:auto;
  padding-inline:20px;
  padding-bottom: 10px;
}

.hr{
  /* position:absolute; */
  width:1000px;
  margin: auto;
  top:460px;
}
.left-input{
  left:600px;
}
.top-80{
  top: 80px;
}
.top-160{
  top: 160px;
}
.top-240{
  top: 240px;
}
.select{
    border: none;
    // padding: 15px 20px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);    // text-emphasis-color:#fff ;
    display: block;
    color: rgb(19, 3, 3);

}

</style>
