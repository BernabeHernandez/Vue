<template>
  <div class="cifrado-rc5">
    <div class="formulario">
      <h1 class="title">Cifrado RC5</h1>

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

      <label for="encryptionKey">Clave de Cifrado:</label>
      <input 
        id="encryptionKey"
        type="text" 
        placeholder="Ingresa la clave (mínimo 16 caracteres)" 
        class="input" 
        v-model="encryptionKey" 
        minlength="16"
        required 
      />

      <div>
        <button class="button" @click="handleEncrypt">Cifrar</button>
        <button class="button" @click="handleDecrypt">Descifrar</button>
      </div>

      <h2>Resultado Cifrado:</h2>
      <p class="resultado">{{ encryptedData.name }}</p>
      <p class="resultado">{{ encryptedData.matricula }}</p>
      <p class="resultado">{{ encryptedData.password }}</p>

      <h2>Resultado Descifrado:</h2>
      <p class="resultado">{{ decryptedData.name }}</p>
      <p class="resultado">{{ decryptedData.matricula }}</p>
      <p class="resultado">{{ decryptedData.password }}</p>
    </div>

    <div class="guia-container">
      <h2 class="guia-titulo">Guía para el Cifrado RC5</h2>
      <p class="guia-texto">
        El Cifrado RC5 es un método de cifrado simétrico que utiliza una clave secreta para proteger los datos. Es rápido y adecuado para diferentes plataformas.
      </p>
      <p class="guia-texto"><strong>Pasos:</strong></p>
      <ul class="guia-lista">
        <li>Ingresa tu nombre, matrícula, contraseña y clave de cifrado.</li>
        <li>Haz clic en "Cifrar" para proteger los datos.</li>
        <li>Haz clic en "Descifrar" para ver los datos originales.</li>
      </ul>
      <p class="guia-ejemplo">Ejemplo: Al cifrar tu nombre "Carlos", se convertirá en una secuencia de caracteres cifrados que solo pueden ser descifrados con la clave adecuada.</p>
  
    </div>
  </div>
</template>

  
<script>
import { rc5Decrypt, rc5Encrypt } from './LibreriaRC5';

export default {
  name: 'CifradoRC5',
  data() {
    return {
      name: "",
      matricula: "",
      password: "",
      encryptedData: {},
      decryptedData: {},
      encryptionKey: "", 
    };
  },
  methods: {
    handleEncrypt() {
      if (!this.name || !this.matricula || !this.password || !this.encryptionKey) {
        alert("Por favor, completa todos los campos antes de cifrar.");
        return; 
      }

      const encryptedName = rc5Encrypt(this.name.padEnd(16, ' '), this.encryptionKey);
      const encryptedMatricula = rc5Encrypt(this.matricula.padEnd(16, ' '), this.encryptionKey);
      const encryptedPassword = rc5Encrypt(this.password.padEnd(16, ' '), this.encryptionKey);

      this.encryptedData = {
        name: btoa(encryptedName).replace(/=+$/, ''),
        matricula: btoa(encryptedMatricula).replace(/=+$/, ''),
        password: btoa(encryptedPassword).replace(/=+$/, ''),
      };
    },
    handleDecrypt() {
      if (!this.encryptedData.name || !this.encryptedData.matricula || !this.encryptedData.password) {
        alert("No hay datos cifrados para descifrar.");
        return;
      }

      const decryptedName = rc5Decrypt(atob(this.encryptedData.name), this.encryptionKey).trim();
      const decryptedMatricula = rc5Decrypt(atob(this.encryptedData.matricula), this.encryptionKey).trim();
      const decryptedPassword = rc5Decrypt(atob(this.encryptedData.password), this.encryptionKey).trim();

      this.decryptedData = {
        name: decryptedName,
        matricula: decryptedMatricula,
        password: decryptedPassword,
      };
    },
    verMas() {
      this.$router.push('/documentacion');
    },
  },
};
</script>

  
  <style scoped>
  .cifrado-rc5 {
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
    width: 48%;
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
    .cifrado-rc5 {
      flex-direction: column;
      align-items: center;
    }
  
    .formulario, .guia-container {
      max-width: 100%;
      margin: 10px 0;
    }
  }
  </style>
  