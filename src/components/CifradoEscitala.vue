<template>
    <div :style="estilos.container">
      <div :style="estilos.formulario">
        <h1 :style="estilos.title">Cifrado Escítala</h1>
        <textarea
          placeholder="Ingresa tu mensaje"
          :style="estilos.textarea"
          v-model="mensaje"
        ></textarea>
        <input
          type="number"
          placeholder="Clave (número de columnas)"
          :style="estilos.input"
          v-model="clave"
        />
        <div>
          <button :style="estilos.button" @click="handleCifrar">Cifrar</button>
          <button :style="estilos.button" @click="handleDescifrar">Descifrar</button>
        </div>
        <p v-if="error" :style="estilos.error">{{ error }}</p>
        <h2>Resultado:</h2>
        <p :style="estilos.resultado">{{ resultado }}</p>
        <button v-if="resultado" :style="estilos.button" @click="copiarAlPortapapeles">
          Copiar Texto
        </button>
      </div>
  
      <div :style="estilos.guiaContainer">
        <h2 :style="estilos.guiaTitulo">Guía para el Cifrado Escítala</h2>
        <p :style="estilos.guiaTexto">
          El cifrado Escítala es un método antiguo donde el mensaje se organiza en columnas.
        </p>
        <p :style="estilos.guiaTexto"><strong>Pasos:</strong></p>
        <ul :style="estilos.guiaLista">
          <li>Ingresa el mensaje a cifrar o descifrar.</li>
          <li>Introduce la clave que representa el número de columnas.</li>
          <li>Presiona "Cifrar" o "Descifrar".</li>
          <li>Puedes copiar el resultado con el botón "Copiar Texto".</li>
        </ul>
        <p :style="estilos.guiaEjemplo">
          Ejemplo: Para un mensaje de "HOLA" con 2 columnas, el resultado será "HOAL".
        </p>
        <div :style="estilos.verMasButton" @click="verMas">Ver más</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CifradoEscitala',
    data() {
      return {
        mensaje: '',
        clave: '',
        resultado: '',
        error: '',
        estilos: {
          container: {
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '900px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif',
            flexWrap: 'wrap',
          },
          formulario: {
            flex: '1 1 300px',
            marginRight: '20px',
            minWidth: '250px',
          },
          title: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
          },
          guiaContainer: {
            flex: '1 1 300px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            marginLeft: '20px',
            minWidth: '250px',
          },
          guiaTitulo: {
            color: '#007bff',
            fontSize: '20px',
            marginBottom: '10px',
            fontWeight: 'bold',
          },
          guiaTexto: {
            color: '#333',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '10px',
          },
          guiaLista: {
            margin: '10px 0',
            paddingLeft: '20px',
            color: '#555',
          },
          guiaEjemplo: {
            backgroundColor: '#f0f8ff',
            borderRadius: '5px',
            padding: '10px',
            border: '1px solid #007bff',
            color: '#333',
          },
          textarea: {
            width: '100%',
            height: '100px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '16px',
            transition: 'border 0.3s',
          },
          input: {
            width: '100%',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            padding: '10px',
            fontSize: '16px',
            transition: 'border 0.3s',
          },
          button: {
            width: '48%',
            margin: '1%',
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
          },
          error: {
            color: 'red',
            textAlign: 'center',
            margin: '10px 0',
          },
          resultado: {
            margin: '20px 0',
            padding: '10px',
            backgroundColor: '#e9ecef',
            borderRadius: '5px',
          },
          verMasButton: {
            marginTop: '20px',
            cursor: 'pointer',
            color: '#007bff',
            textDecoration: 'underline',
          },
        },
      };
    },
    methods: {
      cifrar(mensaje, columnas) {
        let mensajeCifrado = '';
        const filas = Math.ceil(mensaje.length / columnas);
  
        for (let col = 0; col < columnas; col++) {
          for (let fila = 0; fila < filas; fila++) {
            const indice = fila * columnas + col;
            if (indice < mensaje.length) {
              mensajeCifrado += mensaje[indice];
            }
          }
        }
        return mensajeCifrado;
      },
      descifrar(mensaje, columnas) {
        const filas = Math.ceil(mensaje.length / columnas);
        let mensajeDescifrado = Array(mensaje.length).fill('');
        let indice = 0;
  
        for (let col = 0; col < columnas; col++) {
          for (let fila = 0; fila < filas; fila++) {
            if (indice < mensaje.length) {
              const idx = fila * columnas + col;
              mensajeDescifrado[idx] = mensaje[indice];
              indice++;
            }
          }
        }
        return mensajeDescifrado.join('');
      },
      handleCifrar() {
        const columnas = parseInt(this.clave, 10);
        if (isNaN(columnas) || columnas <= 0) {
          this.error = 'Por favor, ingresa una clave válida (número de columnas).';
          return;
        }
        this.error = '';
        const mensajeCifrado = this.cifrar(this.mensaje.replace(/\s/g, ''), columnas);
        this.resultado = mensajeCifrado;
      },
      handleDescifrar() {
        const columnas = parseInt(this.clave, 10);
        if (isNaN(columnas) || columnas <= 0) {
          this.error = 'Por favor, ingresa una clave válida (número de columnas).';
          return;
        }
        this.error = '';
        const mensajeDescifrado = this.descifrar(this.mensaje.replace(/\s/g, ''), columnas);
        this.resultado = mensajeDescifrado;
      },
      copiarAlPortapapeles() {
        navigator.clipboard.writeText(this.resultado)
          .then(() => alert('Texto copiado al portapapeles!'))
          .catch(err => console.error('Error al copiar: ', err));
      },
      verMas() {
        this.$router.push('/documentacion');
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  