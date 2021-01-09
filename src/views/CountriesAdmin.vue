<template>
	<div class="container my-5 py-5 countries">
		<div class="row">
			<div class="col-12">
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">First</th>
							<th scope="col">Utworzono</th>
							<th scope="col">Akcja</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="country in countries" :key="country.id">
							<th scope="row">{{ country.id }}</th>
							<td>{{ country.name }}</td>
							<td>{{ country.created_at }}</td>
							<td>
								<p
									class="btn btn-dark text-white mt-2 mr-2"
									style="font-size: 0.8rem"
								>
									<i class="fas fa-trash left mr-2"></i>
									usuń
								</p>
								<p
									class="btn btn-warning text-white mt-2 mr-2"
									style="font-size: 0.8rem"
								>
									<i class="fas fa-plus mr-2"></i>
									dodaj
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<style scoped>
.countries {
	width: 100vw;
	min-height: 100vh;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
	name: "countries",
	computed: {
		...mapGetters({
			countries: "getCountriesBeers",
		}),
	},
	props: {
		countries: {
			type: Object,
			required: true,
		},
	},
	created() {
		this.$store.dispatch("retrieveCountriesBeer");
	},
	methods: {
		goToCountryDetail(id) {
			this.$router.push({
				name: "CountryDetail",
				params: {
					countryId: id,
				},
			});
		},
	},
};
</script>
