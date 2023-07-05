import {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import './Header.css';
import './content.css';
import './article.css';


const App = () => {
  const [photos, setPhotos] = useState([]); //estado para guardar las fotos que se obtienen de la api de unsplash
  const open = (url) => window.open(url); //funcion para abrir la imagen en otra pestaña
  //console.log({photos})
  return (
    <div>
      <header>
        <Formik
        initialValues={{ search: '' }}  //valores iniciales del formulario de busqueda de imagenes 
        onSubmit={async values => { //funcion para enviar el formulario de busqueda de imagenes 
          //llamar a api de unsplash
          const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, { //se obtienen 20 imagenes por busqueda
            headers: {
              'Authorization':'Client-ID RRt0oiEHVjDR1WyyMj2LFlHID0lBxK3zlAgQDOaxqpw' //token de acceso a la api de unsplash 
            }
        });
          const data = await response.json(); //se obtiene la respuesta de la api en formato json 
          setPhotos(data.results); //se guardan las fotos en el estado photos
        }}
        >
        <Form>
          <Field name='search' /> {/* campo de busqueda de imagenes */}
        </Form>
        </Formik>      
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo => ( //se recorren las fotos obtenidas de la api de unsplash 
            <article key={photo.id} onClick={() => open(photo.link.html)}> {/* se muestra la imagen y su descripcion */}
              <img src={photo.urls.regular} alt={photo.alt_description} /> 
              <p>{[photo.description, photo.alt_description].join(' - ')}</p> 
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
