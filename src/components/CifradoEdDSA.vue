<template>
  <div class="hash-tiger">
    <div class="formulario">
      <h1 class="title">EdDSA</h1>
      <h5>(Es un esquema de firma digital, no un algoritmo de cifrado)</h5>

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

      <div class="button-container">
        <button class="button" @click="generateKeyPair">Generar Claves</button>
        <button class="button" @click="generateSignature">Generar Firma Digital</button>
        <button class="button" @click="verifySignature">Verificar Firma</button>
      </div>

      <h2 class="result-title">Firmas y Claves:</h2>
      <div class="resultado-container">
        <p class="resultado">Clave Privada: <span>{{ keyPair?.secretKey }}</span></p>
        <p class="resultado">Clave Pública: <span>{{ keyPair?.publicKey }}</span></p>
        <p class="resultado">Firma Generada: <span>{{ signature }}</span></p>
        <p class="resultado">Verificación: <span>{{ verificationResult }}</span></p>
      </div>
    </div>

    <div class="guia-container">
      <h2 class="guia-titulo">Guía para la Firma Digital (EdDSA)</h2>
      <p class="guia-texto">
        La firma digital garantiza la autenticidad y la integridad de los datos, asegurando que no se puedan alterar.
      </p>
      <p class="guia-texto"><strong>Pasos:</strong></p>
      <ul class="guia-lista">
        <li>Ingresa tu nombre, matrícula y contraseña.</li>
        <li>Haz clic en "Generar Claves" para crear una clave privada y pública.</li>
        <li>Haz clic en "Generar Firma Digital" para firmar los datos.</li>
        <li>Haz clic en "Verificar Firma" para comprobar la autenticidad de la firma.</li>
      </ul>
      <p class="guia-ejemplo">Ejemplo: Al firmar el nombre "Bernabe", se genera una firma única que representa esa entrada.</p>
    
    </div>
  </div>
</template>

<script>
import nacl from 'tweetnacl';
import * as tweetnaclUtil from 'tweetnacl-util';

export default {
  name: 'HashTiger',
  data() {
    return {
      name: "",
      matricula: "",
      password: "",
      keyPair: null,
      signature: "",
      verificationResult: "",
    };
  },
  methods: {
    validateFields() {
      if (!this.name || !this.matricula || !this.password) {
        alert("Todos los campos son obligatorios.");
        return false;
      }
      return true;
    },
    generateKeyPair() {
      if (!this.validateFields()) return; 
      this.keyPair = nacl.sign.keyPair();
    },
    generateSignature() {
      if (!this.keyPair || !this.validateFields()) {
        alert("Primero debes generar un par de claves y llenar todos los campos.");
        return;
      }

      const message = `Nombre: ${this.name}, Matrícula: ${this.matricula}, Contraseña: ${this.password}`;
      const messageUint8 = tweetnaclUtil.decodeUTF8(message); 

      const signatureUint8 = nacl.sign.detached(messageUint8, this.keyPair.secretKey);
      this.signature = Array.from(signatureUint8).map(b => b.toString(16).padStart(2, '0')).join('');
    },
    verifySignature() {
      if (!this.keyPair || !this.signature || !this.validateFields()) {
        alert("Primero debes generar las claves, una firma y llenar todos los campos.");
        return;
      }

      const message = `Nombre: ${this.name}, Matrícula: ${this.matricula}, Contraseña: ${this.password}`;
      const messageUint8 = tweetnaclUtil.decodeUTF8(message); 

      const signatureUint8 = new Uint8Array(this.signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

      const isVerified = nacl.sign.detached.verify(messageUint8, signatureUint8, this.keyPair.publicKey);
      this.verificationResult = isVerified ? 'La firma es válida.' : 'La firma no es válida.';
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

.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.button {
  width: 100%;
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

.result-title {
  text-align: center;
  color: #007bff;
  margin-top: 20px;
}

.resultado-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 5px;
  border: 1px solid #ccc; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); 
  overflow-wrap: break-word; 
}

.resultado {
  margin: 5px 0;
  word-break: break-all; 
  color: #333; 
}

@media (max-width: 600px) {
  .hash-tiger {
    flex-direction: column;
    align-items: center;
  }

  .formulario,
  .guia-container {
    margin-right: 0;
    margin-left: 0;
    min-width: auto; 
  }
}
</style>
