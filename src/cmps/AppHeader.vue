<template>
  <header>
    <div class="app-header">
      <nav>
        <RouterLink to="/" class="nav-link home-link">Home</RouterLink>
        <RouterLink to="/toy" class="nav-link toy-link">Toys</RouterLink>
        <RouterLink to="/about" class="nav-link about-link">About</RouterLink>
        <RouterLink to="/toy/dashboard" class="nav-link dashboard-link">Dashboard</RouterLink>
        <RouterLink to="/toy/edit" class="btn-add">Add Toy</RouterLink>
        <a href="#" class="nav-link login">Login</a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>
