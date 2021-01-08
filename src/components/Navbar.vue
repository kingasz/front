<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-warning fixed-top">
		<div class="container">
			<a class="navbar-brand" href="#">call-of-beer</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarResponsive"
				aria-controls="navbarResponsive"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarResponsive">
				<ul class="navbar-nav ml-auto" v-if="!loggedIn">
					<li class="nav-item active">
						<router-link to="/">
							<a class="nav-link" href="">Start </a></router-link
						>
					</li>
					<li class="nav-item active">
						<router-link to="/register">
							<a class="nav-link" href=""
								>Rejestracja
							</a></router-link
						>
					</li>
					<li class="nav-item active">
						<router-link to="/about">
							<a class="nav-link" href=""
								>O aplikacji
							</a></router-link
						>
					</li>
				</ul>
				<ul class="navbar-nav ml-auto" v-if="loggedIn">
					<li class="nav-item active">
						<router-link to="/">
							<a class="nav-link" href=""
								>Twoje grupy
							</a></router-link
						>
					</li>
					<li class="nav-item active">
						<router-link to="/beers">
							<a class="nav-link" href=""
								>Baza piw
							</a></router-link
						>
					</li>
					<li
						class="nav-item active"
						v-if="$acl.not.check('isAdmin')"
					>
						<router-link to="/admin">
							<p class="nav-link">Admin</p></router-link
						>
					</li>
					<li class="nav-item active">
						<router-link to="/beers">
							<p class="nav-link">Wyloguj się</p></router-link
						>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	name: "Navbar",
	data() {
		return {
			items: [
				{ id: 1, url: "/", name: "Start" },
				{ id: 2, url: "/register", name: "Rejestracja" },
				{ id: 3, url: "/about", name: "O aplikacji" },
			],
			inloggeds: [
				{ id: 1, url: "/", name: "Start" },
				{ id: 2, url: "/groups", name: "Grupy" },
				{ id: 3, url: "/beers", name: "Twoja piwa" },
			],
		};
	},
	computed: {
		...mapGetters({
			loggedIn: "loggedIn",
			user: "user",
		}),
		...mapActions({
			signOutAction: "auth/logout",
		}),
	},
	methods: {
		signOut() {
			this.signOutAction().then(() => {
				this.$router.replace({
					path: "/",
				});
			});
		},
	},
};
</script>
