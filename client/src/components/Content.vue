<template>
    <section class="container">
			<div class="columns">
				<div class="column is-3">
					<a class="button is-primary is-block is-alt is-large" href="#">New Post</a>
					<aside class="menu">
						<p class="menu-label">
							Tags
						</p>
						<ul class="menu-list">
							<li><span class="tag is-primary is-medium ">Dashboard</span></li>
							<li><span class="tag is-link is-medium ">Customers</span></li>
							<li><span class="tag is-light is-danger is-medium ">Authentication</span></li>
							<li><span class="tag is-dark is-medium ">Payments</span></li>
							<li><span class="tag is-success is-medium ">Transfers</span></li>
							<li><span class="tag is-warning is-medium ">Balance</span></li>
							<li><span class="tag is-medium ">Question</span></li>
						</ul>
					</aside>
				</div>
				<div class="column is-9">
					<div class="box content">

					</div>
				</div>
			</div>
		</section>
</template>

<script>

export default {
    
}
</script>


<style scoped>
.container .columns {
  margin: 3rem 0;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8F99A3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #E6EAEE;
}
article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li{
  padding: 5px;
}
</style>
