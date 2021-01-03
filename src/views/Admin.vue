<template>
    <div class="container my-5 py-5 admin">
        <div class="row">
            <div class="col-12">
                <h2>Hello its Admin</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-4">
                <div class="card my-5 w-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3 text-center">Użytkownicy</h5>
                        <router-link to="/admin/users">
                        <a class="btn btn-primary mx-auto" href="">Sprawdź
                        </a></router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card my-5 w-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3 text-center">Rodzaje piw</h5>
                       <router-link to="/admin/types">
                        <a class="btn btn-primary mx-auto" href="">Sprawdź
                        </a></router-link>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="card my-5 w-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title mb-3 text-center">Kraje pochodzenia</h5>
                        <router-link to="/admin/countries">
                        <a class="btn btn-primary mx-auto" href="">Sprawdź
                        </a></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin {
    width: 100vw;
    min-height: 100vh;
}
</style>
