<template>
	<div class="container tasting my-5 py-5">
		<div class="row">
			<div
				class="col-12 col-md-12 d-flex flex-column"
				v-for="tasting in tasting"
				:key="tasting.id"
			>
				<div class="my-auto text-center">
					<h1>{{ tasting.title }}</h1>
					<p class="mt-n2">{{ tasting.description }}</p>
				</div>
			</div>
			<div v-for="tasting in tasting" :key="tasting.id">
				<p class="card-text text-center mt-3" style="font-size: 0.8rem">
					Utworzono: {{ tasting.created_at }}
				</p>
			</div>
		</div>

		<div class="row">
			<hr class="mt-4 mb-5" />
			<div class="col-12 col-md-6 d-flex flex-column mt-4 border-right">
				<div class="card mb-5 d-flex align-items-center">
					<div
						class="bg-image hover-overlay ripple"
						data-mdb-ripple-color="light"
					>
						<img
							src="https://mdbootstrap.com/img/new/standard/nature/111.jpg"
							class="img-fluid"
						/>
						<div
							class="mask"
							style="background-color: rgba(251, 251, 251, 0.15)"
						></div>
					</div>
					<div
						class="card-body d-flex text-center"
						v-for="tasting in tasting"
						:key="tasting.id"
					>
						<div class="mt-n1">
							<h3 class="card-title my-auto text-warning">
								{{ tasting.beer.name }}
							</h3>
							<p class="card-text my-2">
								{{ tasting.beer.description }}
							</p>
						</div>
					</div>

					<div v-for="tasting in tasting" :key="tasting.id">
						<p
							class="card-text mt-2 mb-1 border-top pt-2"
							style="font-size: 0.8rem"
						>
							Zawartość alkoholu:
							{{ tasting.beer.alcohol_volume }}
							promila
						</p>
					</div>
					<div v-for="tastings in tasting" :key="tastings.id">
						<p class="card-title mt-n2" style="font-size: 0.8rem">
							{{ tastings.user.firstname }}
							{{ tastings.user.surname }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="container-fluid pr-md-5 mt-n4">
					<div class="row">
						<div class="col-12">
							<form class="ratingform d-flex flex-column">
								<div class="mb-5">
									<label class="form-label" for="customRange2"
										>Aromat</label
									>
									<div class="range">
										<input
											type="range"
											class="form-range"
											min="0"
											max="5"
											id="customRange2"
											v-model="form.aroma"
										/>
									</div>
								</div>
								<div class="mb-5">
									<label class="form-label" for="customRange2"
										>Kolor</label
									>
									<div class="range">
										<input
											type="range"
											class="form-range"
											min="0"
											max="5"
											id="customRange2"
											v-model="form.color"
										/>
									</div>
								</div>
								<div class="mb-5">
									<label class="form-label" for="customRange2"
										>Smak</label
									>
									<div class="range">
										<input
											type="range"
											class="form-range"
											min="0"
											max="5"
											id="customRange2"
											v-model="form.taste"
										/>
									</div>
								</div>
								<div class="mb-5">
									<label class="form-label" for="customRange2"
										>Gorycz</label
									>
									<div class="range">
										<input
											type="range"
											class="form-range"
											min="0"
											max="5"
											id="customRange2"
											v-model="form.bitterness"
										/>
									</div>
								</div>
								<div class="mb-5">
									<label class="form-label" for="customRange2"
										>Tekstura</label
									>
									<div class="range">
										<input
											type="range"
											class="form-range"
											min="0"
											max="5"
											id="customRange2"
											v-model="form.texture"
										/>
									</div>
								</div>
								<button
									type="button"
									class="btn btn-outline-warning waves-effect"
									v-for="tasting in tasting"
									:key="tasting.id"
									@click="submitRating(tasting.beer.id)"
								>
									Zagłosuj
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center">
			<div
				class="col-md-4 d-flex flex-column border-top mt-5 pt-4 border-right"
			>
				<div
					class="card mb-5 mt-n1"
					v-for="comment in comments"
					:key="comment.id"
				>
					<div class="card-body">
						<p class="text-light-dark" style="font-size: 0.7rem">
							{{ comment.user.firstname }}
							{{ comment.user.surname }} napisał:
						</p>
						<p class="card-text mt-n3">{{ comment.content }}</p>
					</div>
					<div class="card-footer bg-warning text-white">
						<p
							class="card-text text-right mt-n2 mb-n1"
							style="font-size: 0.7rem"
						>
							{{ comment.created_at }}
						</p>
					</div>
				</div>
			</div>
			<div class="col-md-6 d-flex flex-column border-top mt-5 pt-4">
				<AddCommentForm />
			</div>
		</div>
	</div>
</template>

<style scoped>
.tasting {
	width: 100vw;
	min-height: 100vh;
}
</style>

<script>
import { mapGetters } from "vuex";
import AddCommentForm from "./AddCommentForm";
import Axios from "axios";

export default {
	name: "TastingDetail",
	data() {
		return {
			form: {
				aroma: "",
				color: "",
				taste: "",
				bitterness: "",
				texture: "",
			},
		};
	},
	components: {
		AddCommentForm,
	},
	computed: {
		...mapGetters({
			tasting: "getTasting",
			comments: "getComments",
		}),
	},
	created() {
		this.$store.dispatch("retrieveTasting", this.$route.params.tastingId);
		this.$store.dispatch("retrieveComments", this.$route.params.tastingId);
	},
	methods: {
		submitRating(id) {
			Axios.defaults.headers.common.Authorization =
				"Bearer " + localStorage.getItem("token");

			Axios.post("/rating/store/" + id, {
				aroma: this.form.aroma,
				color: this.form.color,
				taste: this.form.taste,
				bitterness: this.form.bitterness,
				texture: this.form.texture,
			})
				.then((res) => {
					console.log(res);
				})
				.catch((e) => {
					console.error(e);
				});
		},
	},
};
</script>
