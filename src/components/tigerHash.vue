<template>
  <div class="hash-tiger">
    <div class="formulario">
      <h1 class="title">Hash Tiger</h1>

      <label for="name">Nombre:</label>
      <input 
        id="name"
        type="text" 
        placeholder="Ingresa tu nombre (máximo 8 letras)" 
        class="input" 
        v-model="name" 
        maxlength="8" 
        pattern="[a-zA-ZáéíóúüñÑ]{1,8}" 
        required 
      />

      <label for="matricula">Matrícula:</label>
      <input 
        id="matricula"
        type="text" 
        placeholder="Ingresa tu matrícula (8 números)" 
        class="input" 
        v-model="matricula" 
        maxlength="8" 
        pattern="\d{8}" 
        required 
      />

      <label for="password">Contraseña:</label>
      <input 
        id="password"
        type="password" 
        placeholder="Contraseña (8 caracteres)" 
        class="input" 
        v-model="password" 
        maxlength="8" 
        required 
      />

      <div>
        <button class="button" @click="hashData">Generar Hash (Tiger)</button>
      </div>

      <h2>Hash Generado:</h2>
      <p class="resultado">{{ hashedData.name }}</p>
      <p class="resultado">{{ hashedData.matricula }}</p>
      <p class="resultado">{{ hashedData.password }}</p>
    </div>

    <div class="guia-container">
      <h2 class="guia-titulo">Guía para el Hash Tiger</h2>
      <p class="guia-texto">
        El hashing convierte los datos sensibles en un valor irrevertible, garantizando que las contraseñas no se puedan recuperar en texto plano.
      </p>
      <p class="guia-texto"><strong>Pasos:</strong></p>
      <ul class="guia-lista">
        <li>Ingresa tu nombre, matrícula y contraseña.</li>
        <li>Haz clic en "Generar Hash" para proteger los datos con Tiger Hash.</li>
        <li>El hash generado no se puede revertir para obtener el texto original.</li>
      </ul>
      <p class="guia-ejemplo">Ejemplo: Al aplicar hash a la contraseña "password123", se convierte en un valor irreconocible que no puede revertirse para obtener la contraseña original.</p>
   
    </div>
  </div>
</template>

<script>
import { tigerHash } from './tiger';  

export default {
  name: 'HashTiger',
  data() {
    return {
      name: "",
      matricula: "",
      password: "",
      hashedData: {
        name: "",
        matricula: "",
        password: "",
      }
    };
  },
  methods: {
    hashData() {
      if (!this.name || !this.matricula || !this.password) {
        alert("Por favor, completa todos los campos antes de generar el hash.");
        return;
      }
      this.hashedData = {
        name: tigerHash(this.name),
        matricula: tigerHash(this.matricula),
        password: tigerHash(this.password),
      };
    },
    verMas() {
      this.$router.push('/documentacion');
    },
  },
};
</script>

<style scoped>
.hash-tiger {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
  flex-wrap: wrap;
}

.formulario {
  flex: 1 1 300px;
  margin-right: 20px;
  min-width: 250px;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.guia-container {
  flex: 1 1 300px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  min-width: 250px;
}

.guia-titulo {
  color: #007bff;
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

.guia-texto {
  color: #333;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.guia-lista {
  margin: 10px 0;
  padding-left: 20px;
  color: #555;
}

.guia-ejemplo {
  background-color: #f0f8ff;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #007bff;
  color: #333;
}

.input {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  transition: border 0.3s;
}

.button {
  width: 100%;
  margin: 1%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.resultado {
  margin: 20px 0;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
}

.ver-mas {
  margin-top: 20px;
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .hash-tiger {
    flex-direction: column;
    align-items: center;
  }

  .formulario, .guia-container {
    max-width: 100%;
    margin: 10px 0;
  }
}
</style>
