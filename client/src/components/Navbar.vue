<template>
<div class="navbaraja">
    <nav class="navbar is-white topNav">
			<div class="container">
				<div class="navbar-brand">
					<a class="navbar-item" href="../">
						<img src="../assets/logohk.png" width="112" height="28">
					</a>
					<div class="navbar-burger burger" data-target="topNav">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
				<div id="topNav" class="navbar-menu">
					<div class="navbar-start">
						<a class="navbar-item" ><router-link to="/">Home</router-link></a>
					</div>
					<div class="navbar-end">
						<div class="navbar-item">
							<div class="field is-grouped">
								<p class="control">
									
									<a @click="register" class="button is-small">
										<span class="icon">
											<i class="fa fa-user-plus"></i>
										</span>
										
										<span>
										 Register 
										</span>
										
									</a>
								</p>
								<p  class="control">
									<a @click="logout" v-if="currentUser!== undefined" class="button is-small is-info is-outlined">
										<span class="icon">
											<i class="fa fa-user"></i>
										</span>
										<span>Logout</span>
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

<!-- <nav class="navbar is-white">
			<div class="container">
				<div class="navbar-menu">
					<div class="navbar-start">
						<a class="navbar-item is-active" href="#">Popular</a>
						<a class="navbar-item" href="#">Recent</a>
						<a class="navbar-item" href="#">Rising</a>
					</div>
					<div class="navbar-end">
						<div class="navbar-item">
							<input class="input" type="search" placeholder="Search forum...">
						</div>
					</div>
				</div>
			</div>
		</nav> -->
</div>
</template>

<script>
export default {
	data:function(){
		return{
			currentUser:localStorage.getItem('userid')
		}
	},
	methods:{
		register(){
			swal({
			title: "Are you sure?",
			text: "If you register new account you'll have to login again",
			icon: "warning",
			buttons: true,
			dangerMode: true,
			})
			.then((willDelete) => {
			if (willDelete) {
				this.$router.push('/register')
				localStorage.clear()
			} 
			});
			
		},
		logout(){
			localStorage.clear()
			this.$router.push('/login')
		}
	}
}
</script>


<style>
.topNav {
  border-top: 5px solid #3498DB;
}
.topNav .container {
  border-bottom: 1px solid #E6EAEE;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}

</style>
