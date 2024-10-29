// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: 'Welcome to the Dashboard',
        notifications: 'Notifications',
        profile: 'Profile',
        contact: 'Contact',
        users: 'Users',
        courses: 'Courses',
        content: 'Content',
        addCourse: 'Add Course',
        refresh: 'Refresh',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        created: 'Created',
        image: 'Image',
        description: 'Description',
        bgColor: 'Background Color',
        previous: 'Previous',
        next: 'Next',   
      },
    },
    es: {
      translation: {
        welcome: 'Bienvenido al Dashboard',
        notifications: 'Notificaciones',
        profile: 'Perfil',
        contact: 'Contacto',
        users: 'Usuarios',
        courses: 'Cursos',
        content: 'Contenido',
        addCourse: 'Agregar Curso',
        refresh: 'Recargar',
        name: 'Nombre',
        email: 'Correo Electrónico',
        password: 'Contraseña',
        confirmPassword: 'Confirmar Contraseña',
        created: 'Creado',
        image: 'Imagen',
        description: 'Descripción',
        bgColor: 'Color de Fondo',
        previous: 'Anterior',
        next: 'Siguiente',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
