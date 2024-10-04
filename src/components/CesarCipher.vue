<template>
  <div class="cesar-cipher">
    <div class="formulario">
      <h1 class="title">Cifrado César</h1>
      
      <textarea
        placeholder="Ingresa tu mensaje"
        class="textarea"
        v-model="message"
        @focus="focusTextarea"
        @blur="blurTextarea"
      ></textarea>
      <input
        type="number"
        placeholder="Clave (desplazamiento)"
        class="input"
        v-model="shift"
        @focus="focusInput"
        @blur="blurInput"
      />
      <div>
        <button
          class="button"
          @click="encrypt"
          @mouseover="buttonHover = true"
          @mouseleave="buttonHover = false"
        >
          Cifrar
        </button>
        <button
          class="button"
          @click="decrypt"
          @mouseover="buttonHover = true"
          @mouseleave="buttonHover = false"
        >
          Descifrar
        </button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <h2>Resultado:</h2>
      <p class="resultado">{{ result }}</p>
      <button v-if="result" class="button" @click="copyToClipboard">
        Copiar Texto
      </button>
    </div>

    <div class="guia-container">
      <h2 class="guia-titulo">Guía para el Cifrado César</h2>
      <p class="guia-texto">
        El Cifrado César es un método de cifrado donde las letras del mensaje se desplazan
        un número fijo de posiciones en el alfabeto.
      </p>
      <p class="guia-texto"><strong>Pasos:</strong></p>
      <ul class="guia-lista">
        <li>Ingresa el mensaje a cifrar o descifrar.</li>
        <li>Introduce la clave de desplazamiento.</li>
        <li>Presiona "Cifrar" o "Descifrar".</li>
        <li>Puedes copiar el resultado con el botón "Copiar Texto".</li>
      </ul>
      <p class="guia-ejemplo">
        Ejemplo: Con un desplazamiento de 3, "A" se convierte en "D".
      </p>
      <div class="ver-mas" @click="verMas">
        Ver más
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CesarCipher',
  data() {
    return {
      message: '',
      shift: '',
      result: '',
      errorMessage: '',
      buttonHover: false,
    };
  },
  methods: {
    encrypt() {
      const desplazamiento = parseInt(this.shift, 10);
      if (isNaN(desplazamiento)) {
        this.errorMessage = 'Por favor, ingresa una clave válida.';
        return;
      }
      this.errorMessage = '';
      this.result = this.cesarCipher(this.message, desplazamiento);
    },
    decrypt() {
      const desplazamiento = parseInt(this.shift, 10);
      if (isNaN(desplazamiento)) {
        this.errorMessage = 'Por favor, ingresa una clave válida.';
        return;
      }
      this.errorMessage = '';
      this.result = this.cesarCipher(this.message, 26 - (desplazamiento % 26));
    },
    cesarCipher(text, shift) {
      return text.split('').map((char) => {
        const code = char.charCodeAt(0);
        if (char.match(/[a-z]/i)) {
          const base = char === char.toLowerCase() ? 97 : 65;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char; // No cifrar caracteres que no son letras
      }).join('');
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.result)
        .then(() => alert('Texto copiado al portapapeles!'))
        .catch(err => console.error('Error al copiar: ', err));
    },
    verMas() {
      this.$router.push('/documentacion');
    },
    focusTextarea(e) {
      e.target.style.border = '1px solid #007bff';
    },
    blurTextarea(e) {
      e.target.style.border = '1px solid #ccc';
    },
    focusInput(e) {
      e.target.style.border = '1px solid #007bff';
    },
    blurInput(e) {
      e.target.style.border = '1px solid #ccc';
    },
  },
};
</script>

<style scoped>
.cesar-cipher {
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

.textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  transition: border 0.3s;
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

.error {
  color: red;
  text-align: center;
  margin: 10px 0;
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
</style>
