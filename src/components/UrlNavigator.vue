<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand :to="{ name: 'main' }">Superliga Vue</b-navbar-brand>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>

            <b-nav-item :to="{ name: 'search' }">Search</b-nav-item>
            <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-if="!$root.store.username">
            <b-nav-item :to="{ name: 'login' }">Login</b-nav-item>
            <b-nav-item :to="{ name: 'register' }">Register</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item-dropdown right>
            <template #button-content>
                User
            </template>
            <b-dropdown-item href="#">Favorites</b-dropdown-item>
            <b-dropdown-item href="#">Log Out</b-dropdown-item>
            </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
        </b-navbar>
        <router-view />
        </div>
</template>