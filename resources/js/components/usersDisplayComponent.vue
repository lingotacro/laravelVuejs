<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"> Liste des utilisateurs </h3>
                        <div class="card-tools">
                            <button class="btn btn-primary" @click="creatModal"> Ajouter <i class="fa fa-user-plus"></i></button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody><tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Description</th>
                                <th> date création</th>
                                <th>Action</th>
                            </tr>
                            <tr v-for="user in users" :key="user.id">
                                <td>{{user.id}}</td>
                                <td>{{user.name | capText}}</td>
                                <td>{{user.email}}</td>
                               <td><span class="tag tag-success">{{user.role}}</span></td>
                                <td>{{user.description}}</td>
                                <td>{{user.created_at | created_moment}}</td>
                                <td>
                                    <button @click="editModal(user)">
                                        <i class="fa fa-edit blue"></i>
                                    </button>
                                    /
                                    <button @click="supprimerUser(user.id)">
                                        <i class="fa fa-trash red"></i>
                                    </button>
                                </td>
                            </tr>
                            </tbody></table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>

        <!--modeal registe User-->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="modeEdition ? editUser() :creatUser()">
                    <div class="modal-body">
                        <div class="form-group">
                            <label> Nom et prénom</label>
                            <input v-model="form.name" type="text" name="name"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                            <has-error :form="form" field="name"></has-error>
                        </div>
                        <div class="form-group">
                            <label>Adresse Email </label>
                            <input v-model="form.email" type="email" name="email"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                            <has-error :form="form" field="email"></has-error>
                        </div>
                        <div class="form-group">
                            <label> Description </label>
                            <textarea v-model="form.description"  name="description"
                                      class="form-control" :class="{ 'is-invalid': form.errors.has('description') }">
                            </textarea>
                            <has-error :form="form" field="description"></has-error>
                        </div>
                        <div class="form-group">
                            <select name="role" id="role" class="form-control" v-model="form.role" :class="{ 'is-invalid': form.errors.has('role') }">
                                <option value=""> Choisir le type d'utilisateur</option>
                                <option value="admin"> Admin </option>
                                <option value="user"> User </option>
                                <option value="autres"> Autres</option>
                            </select>
                            <has-error :form="form" field="role"></has-error>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="form.password" type="password" name="password"
                                   class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                            <has-error :form="form" field="password"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                        <button v-if="!modeEdition" type="submit" class="btn btn-primary">Enregistrer</button>
                        <button v-if="modeEdition" type="submit" class="btn btn-success">Modifier</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                modeEdition: false,
                users:{},
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    role: '',
                    description: '',
                    photo: ''
                })
            }
        },
        methods:{
            creatModal(){
                this.modeEdition = false;
                this.form.reset();
                $('#exampleModalCenter').modal('show');
            },
            editModal(user){
                this.modeEdition = true;
                this.form.reset();
                $('#exampleModalCenter').modal('show');
                this.form.fill(user);
            },
            supprimerUser(id){
                swal({
                    title: 'Etes vous sur ? ',
                    text: "voulez vous éffectuer cette action ? ",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'confirmer',
                    cancelButtonText: 'Annuler'
                }).then((result) => {
                    // j'effectue une requete pour avoir l'élément à supprimer
                    if (result.value) {
                    this.form.delete('/api/user/' + id).then(() => {
                        swal(
                            'Merci !',
                            'Votre action à bien été pris en compte ',
                            'success'
                        )
                        Fire.$emit('ApresCreation');
                    }).catch(() => {
                        swal('Echec !', 'vote opération à été annuler', 'warning');
                    })
                }
                })
            },
            creatUser(){
                // this.modeEdition = true;
                this.$Progress.start();
                this.form.post('api/user')
                    .then(() =>
                    {
                        Fire.$emit('ApresCreation');
                        $('#exampleModalCenter').modal('hide');
                        toast({
                            type: 'success',
                            title: 'Utilisateur crée avec succès'
                        });
                     })
                    .catch(()=>{

                });
                this.$Progress.finish();
            },
            editUser(){
                this.modeEdition = true;
            },
            loadeUser(){
                axios.get("api/user").then(({data})=>(this.users = data.data));
            }
        },
        created() {
            this.loadeUser();
            Fire.$on('ApresCreation',() => {this.loadeUser();})
        }
    }
</script>
