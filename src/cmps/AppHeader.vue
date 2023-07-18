<template>

<header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="app-header">
        <!-- <HelloWorld msg="You did it!" /> -->

        <nav>
             <RouterLink to="/" class="nav-link home-link">Home</RouterLink>
             <RouterLink to="/toy" class="nav-link toy-link">Toys</RouterLink>
             <RouterLink to="/about" class="nav-link about-link">About</RouterLink>
        </nav>		
    </div>
</header>
</template>

<script>

export default {
    name: 'AppHeader'
}

</script>
