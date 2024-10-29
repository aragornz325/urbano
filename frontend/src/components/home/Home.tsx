import React from 'react';

import WelcomeCard from './WelcomeCard';

const WelcomeSection: React.FC = () => (
  <section className="px-1 my-8 w-full min-h-[75vh]">
    <h2 className="mb-5 text-2xl font-semibold text-center dark:text-gray-100">
      Bienvenido al Dashboard
    </h2>
    <div className="grid grid-cols-1 auto-rows-fr gap-2 w-full sm:grid-cols-2 lg:grid-cols-4">
      {/* Tarjetas superiores */}
      <WelcomeCard
        title="Notificaciones"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730175340/courses/panel/clakxwhc70003718t53i23a28_jfknck.jpg"
        description="Revisa las notificaciones recientes"
        bgColor="bg-red-100"
      />
      <WelcomeCard
        title="Estadísticas"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730175340/courses/panel/istockphoto-1407983911-612x612_v8redd.jpg"
        description="Consulta el resumen de tus datos"
        bgColor="bg-blue-100"
      />
      <WelcomeCard
        title="Nuevos Suscriptores"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730176627/courses/panel/90a5c5cd-4f3c-4e9d-b0bd-4dcbd599f4e9.png"
        description="Suscriptores recientes"
        bgColor="bg-yellow-100"
      />
      <WelcomeCard
        title="Pagos Pendientes"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730176661/courses/panel/110494ec-23e9-462e-b4cf-c2a21b8f27a9.png"
        description="Verifica pagos atrasados"
        bgColor="bg-green-100"
      />

      <div
        className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform lg:col-span-2 lg:row-span-2 dark:bg-gray-800 hover:scale-105"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/do5hovkvl/image/upload/v1730175273/courses/panel/173e3acd-6939-427e-942e-5631af1cdbe4.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="p-4 text-center bg-white bg-opacity-75 rounded-lg dark:bg-gray-800 dark:bg-opacity-75">
          <h3 className="mb-4 text-lg font-semibold">Análisis Central</h3>
          <p className="text-sm text-black dark:text-white">
            Gráfico o contenido central
          </p>
        </div>
      </div>

      <WelcomeCard
        title="Configuración"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730175300/courses/panel/3b865064-cdd5-4dcc-a6de-6ba3d1f63001.png"
        description="Ajusta tu perfil y preferencias"
        bgColor="bg-indigo-100"
      />
      <WelcomeCard
        title="Soporte"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730175300/courses/panel/3b865064-cdd5-4dcc-a6de-6ba3d1f63001.png"
        description="Contacta con el equipo de soporte"
        bgColor="bg-teal-100"
      />
      <WelcomeCard
        title="Archivos Subidos"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730176712/courses/panel/4afb3cdf-9261-4874-b56b-2c3e3bc10914.png"
        description="Revisa los archivos recientes"
        bgColor="bg-pink-100"
      />
      <WelcomeCard
        title="Tareas Pendientes"
        imageUrl="https://res.cloudinary.com/do5hovkvl/image/upload/v1730176812/courses/panel/5605e764-641c-4045-bb9e-c70751006c33.png"
        description="Completa las tareas pendientes"
        bgColor="bg-purple-100"
      />
    </div>
  </section>
);

export default WelcomeSection;
