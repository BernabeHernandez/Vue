<template>
  <header>
    <nav>
      <button class="menu-toggle" @click="toggleMenu">
        &#9776; 
      </button>
      <ul :class="{ 'is-open': isMenuOpen }">
        <li 
          :class="{ active: currentPath === '/CifradoCesar' }" 
          @click="selectOption('/CifradoCesar')"
        >
          <span class="icon">🔒</span> Cifrado de César
        </li>
        <li 
          :class="{ active: currentPath === '/CifradoEscitala' }" 
          @click="selectOption('/CifradoEscitala')"
        >
          <span class="icon">🗝️</span> Cifrado de Escitala
        </li>
        <li 
          :class="{ active: currentPath === '/documentacion' }" 
          @click="selectOption('/documentacion')"
        >
          <span class="icon">📄</span> Guía
        </li>
        <li 
          :class="{ active: currentPath === '/comparacion' }" 
          @click="selectOption('/comparacion')"
        >
          <span class="icon">📊</span> Comparación
        </li>
        <li 
          :class="{ active: currentPath === '/CifradoRC5' }" 
          @click="selectOption('/CifradoRC5')"
        >
          <span class="icon">🔐</span> RC5
        </li>
        <li 
          :class="{ active: currentPath === '/CifradoEdDSA' }" 
          @click="selectOption('/CifradoEdDSA')"
        >
          <span class="icon">✍️</span> Cifrado EdDSA
        </li>
        <li 
          :class="{ active: currentPath === '/HashTiger' }" 
          @click="selectOption('/HashTiger')"
        >
          <span class="icon">🐯</span> Hash Tiger
        </li>
        <li 
          @click="openDriveUrl"
        >
          <span class="icon">📚</span> Documentación
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      currentPath: this.$route.path,
      isMenuOpen: false, 
    };
  },
  watch: {
    $route(to) {
      this.currentPath = to.path;
    }
  },
  methods: {
    navigate(path) {
      this.$router.push(path); 
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    selectOption(path) {
      this.navigate(path);
      this.isMenuOpen = false;
    },
    openDriveUrl() {
      window.open('https://drive.google.com/file/d/1sZ3adjN_UGI-lcw-8wqbWJveHbQzXBGa/view?usp=sharing', '_blank');
    }
  }
}
</script>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 1em;
}

nav ul {
  list-style-type: none;
  display: flex;
  gap: 1px;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
}

nav li {
  cursor: pointer;
  padding: 0.4em 0.8em;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.3s ease, transform 0.2s;
  font-size: 0.95em;
}

nav li:hover {
  background-color: #555;
  transform: translateX(5px); 
}

.icon {
  font-size: 1.2em;
  display: inline-block;
}

nav li.active {
  background-color: #007BFF;
  color: white;
}

.menu-toggle {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.5em 1em;
  font-size: 1.5em;
  cursor: pointer;
  display: none;
  border-radius: 5px;
  width: 100%; 
}

@media (max-width: 600px) {
  .menu-toggle {
    display: block; 
    width: 100%;
    text-align: left;
    background-color: #0056b3; 
  }

  .menu-toggle:hover {
    background-color: #004a99; 
  }

  nav ul {
    flex-direction: column;
    align-items: center;
    display: none; 
    background-color: #333;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  nav ul.is-open {
    display: flex;
  }

  nav li {
    width: 100%;
    text-align: center;
    padding: 0.8em 0; 
    border-bottom: 1px solid #555;
  }

  nav li.active {
    background-color: #007BFF;
    font-weight: bold; 
  }

  nav li:hover {
    background-color: #555;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  nav ul {
    flex-direction: row;
    justify-content: flex-start;
  }

  nav li {
    padding: 0.4em 1em;
  }
}

@media (min-width: 1025px) {
  nav ul {
    justify-content: flex-start;
  }

  nav li {
    padding: 0.4em 1.5em;
  }
}
</style>
