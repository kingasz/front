<template>
	<div class="container my-5 py-5 types">
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
						<tr v-for="type in types" :key="type.id">
							<th scope="row">{{ type.id }}</th>
							<td>{{ type.name }}</td>
							<td>{{ type.created_at }}</td>
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
.types {
	width: 100vw;
	min-height: 100vh;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
	name: "typebeer",
	computed: {
		...mapGetters({
			types: "getTypesBeers",
		}),
	},
	props: {
		types: {
			type: Object,
			required: true,
		},
	},
	created() {
		this.$store.dispatch("retrieveTypesBeer");
	},
	methods: {
		goToTypeBeerDetail(id) {
			this.$router.push({
				name: "TypeBeerDetail",
				params: {
					typeId: id,
				},
			});
		},
	},
};
</script>
