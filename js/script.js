document.addEventListener('DOMContentLoaded', () => {
    // Hacer las funciones disponibles globalmente para los onclick en HTML
    window.showInterpretSection = function() {
      loadView('formView');
    };
    
    window.interpret = interpret;
    window.reset = reset;
    window.sendFeedback = sendFeedback;
    window.submitComment = submitComment;
    window.showConnection = showConnection;
    window.goBack = goBack;
    window.loadView = loadView;
    
    loadView('landingView');
  });
  
  async function loadView(viewName) {
    try {
      const response = await fetch(`views/${viewName}.html`);
      
      if (!response.ok) {
        throw new Error(`Error al cargar la vista: ${response.status} ${response.statusText}`);
      }
      
      const html = await response.text();
      
      if (!html || html.trim() === '') {
        throw new Error(`La vista ${viewName} está vacía`);
      }
      
      const appElement = document.getElementById('app');
      if (!appElement) {
        throw new Error('No se encontró el elemento #app en el DOM');
      }
      
      appElement.innerHTML = html;
      
      // Mostrar la vista cargada (remover display: none de .view)
      const loadedView = appElement.querySelector('.view');
      if (loadedView) {
        loadedView.style.display = 'block';
      }
      
      // Después de cargar la vista, adjuntar event listeners si es necesario
      if (viewName === 'landingView') {
        const button = document.querySelector('#landingView button');
        if (button) {
          button.addEventListener('click', showInterpretSection);
        }
      } else if (viewName === 'formView') {
        const interpretButton = document.querySelector('#formView button');
        if (interpretButton) {
          interpretButton.addEventListener('click', interpret);
        }
      } else if (viewName === 'resultView') {
        const likeButton = document.querySelector('.feedbackButtons button[onclick*="like"]');
        const dislikeButton = document.querySelector('.feedbackButtons button[onclick*="dislike"]');
        const resetButton = document.querySelector('#resultView button[onclick*="reset"]');
        const submitButton = document.querySelector('#commentSection button[onclick*="submitComment"]');
        
        if (likeButton) likeButton.onclick = () => sendFeedback('like');
        if (dislikeButton) dislikeButton.onclick = () => sendFeedback('dislike');
        if (resetButton) resetButton.onclick = reset;
        if (submitButton) submitButton.onclick = submitComment;
      } else if (viewName === 'thankYouView') {
        const button = document.querySelector('#thankYouView button');
        if (button) {
          button.addEventListener('click', showInterpretSection);
        }
      }
    } catch (error) {
      console.error(`Error al cargar la vista ${viewName}:`, error);
      const appElement = document.getElementById('app');
      if (appElement) {
        appElement.innerHTML = `
          <div style="padding: 2rem; color: #ff6b6b; text-align: center;">
            <h2>❌ Error al cargar la vista</h2>
            <p>${error.message}</p>
            <p style="font-size: 0.9rem; color: #999;">Vista: ${viewName}</p>
            <button onclick="loadView('landingView')" style="margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer;">Volver al inicio</button>
          </div>
        `;
      }
    }
  }
  



function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => view.style.display = 'none');
    const element = document.getElementById(viewId);
    if (element) {
      element.style.display = 'block';
    }
  }

async function interpret() {
const character = document.getElementById('characterInput').value;
const lyrics = document.getElementById('lyricsInput').value;

// Mostrar la vista de carga
await loadView('loadingView');
document.getElementById('loadingCharacter').textContent = character;

try {
  const response = await fetch('http://localhost:3001/interpreta', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ personaje: character, letra: lyrics })
  });

  const data = await response.json();
  console.log("Data recibida del backend:", data);

  // El backend ya devuelve { interpretacion: "...", moraleja: "..." } directamente
  if (data.interpretacion && data.moraleja) {
    // Escapar HTML para evitar XSS y formatear el texto
    const escapeHtml = (text) => {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    };

    const formatText = (text) => {
      return escapeHtml(text)
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    };

    const resultHTML = `
      <h3>Interpretación desde <span style="color: #00ccff;">${escapeHtml(character)}</span>:</h3>
      <p>${formatText(data.interpretacion)}</p>
      <h4>Moraleja:</h4>
      <p style="font-style: italic; color: #b0e0e6;">${formatText(data.moraleja)}</p>
    `;

    await loadView('resultView');
    document.getElementById('result').innerHTML = resultHTML;
  } else {
    await loadView('resultView');
    document.getElementById('result').innerHTML = '<p style="color: #ff6b6b;">❌ No se recibió una respuesta válida del servidor.</p>';
  }

} catch (error) {
  // En caso de error de la petición
  await loadView('resultView');
  document.getElementById('result').innerHTML = '❌ Error al interpretar. Intenta nuevamente.';
}
}
  async function reset() {
    await loadView('formView');
    // Los valores se resetean cuando se carga la vista nueva
  }

  let feedbackType = '';

  async function sendFeedback(type) {
    feedbackType = type;
    
    // Enviar feedback a la API
    try {
      const response = await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: type })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Feedback enviado correctamente');
      }
    } catch (error) {
      console.error('Error al enviar feedback:', error);
    }
    
    if (type === 'like') {
      // Mostrar la sección de agradecimiento
      await loadView('thankYouView');
    } else if (type === 'dislike') {
      const commentSection = document.getElementById('commentSection');
      if (commentSection) {
        commentSection.style.display = 'block';
      }
    }
  }

  async function submitComment() {
    document.getElementById('Humano-Máquina').style.display = 'none';
    const comment = document.getElementById('commentInput').value.trim();
    if (!comment) {
      alert('Por favor, escribe un comentario para ayudarnos a mejorar.');
      return;
    }

    // Enviar el comentario a la API (puedes adaptarlo según tu backend)
    try {
      const response = await fetch('http://localhost:3001/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: 'dislike', comment })
      });

      const data = await response.json();

      if (data.success) {
        alert('Gracias por tu comentario. ¡Lo tomaremos en cuenta!');
      } else {
        alert('Hubo un error al enviar tu comentario.');
      }
    } catch (error) {
      alert('Error al enviar comentario. Intenta nuevamente.');
    }

    // Ocultar la sección de comentarios y mostrar la respuesta
    document.getElementById('commentSection').style.display = 'none';
    document.getElementById('result').innerHTML += '<p>¡Gracias por tu comentario! 💬</p>';
  }

  function showConnection() {
    document.getElementById('formView').style.display = 'none';
    document.getElementById('machineHumanConnection').style.display = 'block';
  }

  function goBack() {
    document.getElementById('machineHumanConnection').style.display = 'none';
    document.getElementById('formView').style.display = 'block';
  }