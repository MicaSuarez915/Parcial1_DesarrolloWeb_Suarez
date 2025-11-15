// ========================================
// THEME TOGGLE
// ========================================
function toggleTheme() {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('.theme-icon');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  
  // Guardar preferencia en localStorage
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}



// Validar nombre (sin números)
function validateName(name) {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  return nameRegex.test(name);
}

// Validar email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mostrar error en campo específico
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = field.parentElement.querySelector('.error-message') || createErrorElement();
  
  field.classList.add('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  
  if (!field.parentElement.querySelector('.error-message')) {
    field.parentElement.appendChild(errorElement);
  }
  
  // Focus en el campo con error
  field.focus();
}

// Limpiar error de campo
function clearFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = field.parentElement.querySelector('.error-message');
  
  field.classList.remove('error');
  if (errorElement) {
    errorElement.style.display = 'none';
  }
}

// Crear elemento de error
function createErrorElement() {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.color = '#ef4444';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '4px';
  errorDiv.style.fontWeight = '500';
  return errorDiv;
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
  const form = document.querySelector('form');
  const successDiv = document.createElement('div');
  successDiv.className = 'success-message';
  successDiv.style.cssText = `
    background: #d1fae5;
    color: #065f46;
    padding: 14px 18px;
    border-radius: 12px;
    margin-bottom: 1rem;
    font-weight: 600;
    border: 2px solid #10b981;
  `;
  successDiv.textContent = '✓ ¡Mensaje enviado con éxito! Te contactaré pronto.';
  
  form.insertBefore(successDiv, form.firstChild);
  
  // Remover mensaje después de 5 segundos
  setTimeout(() => {
    successDiv.remove();
  }, 5000);
}

// Validación en tiempo real
function setupRealtimeValidation() {
  const nombreField = document.getElementById('nombre');
  const emailField = document.getElementById('email');
  
  // Validar nombre mientras escribe
  if (nombreField) {
    nombreField.addEventListener('input', function() {
      if (this.value.length > 0) {
        if (!validateName(this.value)) {
          showFieldError('nombre', 'El nombre solo puede contener letras y espacios');
        } else {
          clearFieldError('nombre');
        }
      } else {
        clearFieldError('nombre');
      }
    });
  }
  
  // Validar email mientras escribe (solo después de que termine de escribir)
  if (emailField) {
    let emailTimeout;
    emailField.addEventListener('input', function() {
      clearTimeout(emailTimeout);
      clearFieldError('email');
      
      if (this.value.length > 0) {
        emailTimeout = setTimeout(() => {
          if (!validateEmail(this.value)) {
            showFieldError('email', 'Por favor, ingresa un email válido (ej: tu@email.com)');
          }
        }, 1000); // Espera 1 segundo después de que el usuario deje de escribir
      }
    });
  }
}

// Manejar envío del formulario
function handleSubmit(event) {
  event.preventDefault();
  
  // Limpiar errores previos
  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
  document.querySelectorAll('input, textarea, select').forEach(el => el.classList.remove('error'));
  
  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const asunto = document.getElementById('asunto').value;
  const mensaje = document.getElementById('mensaje').value.trim();
  
  let isValid = true;
  
  // Validar nombre
  if (!nombre) {
    showFieldError('nombre', 'El nombre es obligatorio');
    isValid = false;
  } else if (!validateName(nombre)) {
    showFieldError('nombre', 'El nombre solo puede contener letras y espacios');
    isValid = false;
  }
  
  // Validar email
  if (!email) {
    showFieldError('email', 'El email es obligatorio');
    isValid = false;
  } else if (!validateEmail(email)) {
    showFieldError('email', 'Por favor, ingresa un email válido (ej: tu@email.com)');
    isValid = false;
  }
  
  // Validar asunto
  if (!asunto) {
    showFieldError('asunto', 'Por favor, selecciona un asunto');
    isValid = false;
  }
  
  // Validar mensaje
  if (!mensaje) {
    showFieldError('mensaje', 'El mensaje es obligatorio');
    isValid = false;
  } else if (mensaje.length < 10) {
    showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
    isValid = false;
  }
  
  // Si todo es válido, enviar
  if (isValid) {
    // Aquí iría la lógica para enviar al servidor
    showSuccessMessage();
    event.target.reset();
  }
}

// ========================================
// LOAD SAVED PREFERENCES
// ========================================
function loadPreferences() {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    const icon = document.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = '☀️';
    }
  } 
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });
}


// form-validation.js
// Validación del formulario de contacto

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  // Verificar que el formulario existe antes de continuar
  if (!form) return;
  
  const nombreInput = document.getElementById('nombre');
  const emailInput = document.getElementById('email');
  const mensajeTextarea = document.getElementById('mensaje');
  const charCurrent = document.getElementById('char-current');
  const formMessage = document.getElementById('form-message');

  // Validación en tiempo real del nombre (solo letras)
  if (nombreInput) {
    nombreInput.addEventListener('input', function() {
      // Verificar si hay números
      if (/\d/.test(this.value)) {
        this.setCustomValidity('El nombre no puede contener números');
        this.reportValidity();
      } else {
        this.setCustomValidity('');
      }
    });
  }

  // Validación en tiempo real del email
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (this.value && !emailPattern.test(this.value)) {
        this.setCustomValidity('Por favor ingresá un email válido (ejemplo: nombre@dominio.com)');
        this.reportValidity();
      } else {
        this.setCustomValidity('');
      }
    });

    emailInput.addEventListener('input', function() {
      this.setCustomValidity('');
    });
  }

  // Contador de caracteres
  if (mensajeTextarea && charCurrent) {
    mensajeTextarea.addEventListener('input', function() {
      charCurrent.textContent = this.value.length;
    });
  }

  // Al enviar el formulario
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Verificar validación nativa del navegador
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    
    // Mostrar mensaje de éxito
    if (formMessage) {
      formMessage.textContent = '✅ ¡MENSAJE ENVIADO CON ÉXITO! Te responderemos pronto.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      formMessage.style.fontSize = '1.2rem';
      formMessage.style.fontWeight = 'bold';
      formMessage.style.textAlign = 'center';
      formMessage.style.padding = '20px';
      
      // Scroll al mensaje
      window.scrollTo({
        top: formMessage.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    
    // También mostrar un alert por las dudas
    alert('¡MENSAJE ENVIADO CON ÉXITO!\n\nTu mensaje ha sido enviado correctamente.\nTe responderemos pronto.');
    
    // Limpiar el formulario
    setTimeout(function() {
      form.reset();
      if (charCurrent) charCurrent.textContent = '0';
    }, 500);
    
    // Ocultar mensaje después de 10 segundos
    setTimeout(function() {
      if (formMessage) formMessage.style.display = 'none';
    }, 10000);
  });
});

