import Productos from '../Productos/Productos';
import CarritoDiseño from '../CarritoDiseño/Carrito';
import CategorySelect from '../SelectorCategorías/CategorySelect';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function Tienda() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);

  const openCarrito = () => {
    setShowCarrito(true);
  };

  const closeCarrito = () => {
    setShowCarrito(false);
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setCart([...cart]);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart([...cart, newProduct]);
    }

    setTotal(total + product.price);
  };

  const removeFromCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart);
      }
      setTotal(total - product.price);
    }
  };

  const products = [
    {
      id: 1,
      name: 'Motherboard Gigabyte - Z690 Aorus Elite',
      description: 'Socket LGA1700: Compatibilidad con procesadores Intel Core, Pentium Gold y Celeron de 12.ª generación',
      categories: ['PC'],
      price: 3000,
      image: 'https://cdn.kemik.gt/2022/07/%E2%80%8EZ690-AORUS-ELITE-AX-DDR4-GIGABYTE-1200X1200-1-1-768x768.jpg',
    },
    {
      id: 2,
      name: 'Intel Procesador Core i9-11900K',
      description: 'El procesador cuenta con enchufe LGA-1200 para la instalación en el PCB 16 MB de caché L3 recupera rápidamente los datos para más rendimiento',
      categories: ['PC'],
      price: 3620,
      image: 'https://cdn.pacifiko.com/image/cache/catalog/p/NDIwZDg2Yj_1-1000x1000.jpg',
    },
    {
      id: 3,
      name: 'NVME M.2 Kingston 2TB',
      description: 'Es una solución de almacenamiento de nueva generación mejorada basada en un controlador NVME Gen 4x4. NV2',
      categories: ['PC'],
      price: 995,
      image: 'https://cdn.kemik.gt/2023/03/SNV2S-2000G-KINGSTON-1200X1200-1-1-768x768.-700x700.jpg',
    },
    {
      id: 4,
      name: 'Microsoft Windows 11 Profesional - Key',
      description: 'Windows 11 cuenta con herramientas fáciles de usar que te pueden ayudar a optimizar el espacio de la pantalla y maximizar tu productividad.',
      categories: ['PC', 'Licencias'],
      price: 1500,
      image: 'https://cdn.kemik.gt/2022/05/FQC-10553-MICROSOFT-1200x1200-1-1-768x768.jpg',
    },
    {
      id: 5,
      name: 'Microsoft Office Hogar y Empresas 2021',
      description: 'es una suscripción que incluye aplicaciones premium como Word, Excel, PowerPoint, OneNote, Outlook, Publisher y Access.',
      categories: ['PC', 'Licencias'],
      price: 2200,
      image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWLb12?ver=d511',
    },
    {
      id: 6,
      name: ' Refrigerador Samsung',
      description: 'Mantén tus alimentos siempre frescos, sin importar dónde los coloques tiene diseño perfecto, armonioso y elegante, utiliza un 50% menos de energía.',
      categories: ['Hogar', 'Electrodomésticos'],
      price: 9800,
      image: 'https://images.samsung.com/is/image/samsung/mx-side-by-side-rs27t5200s9-rs27t5200s9-em-rperspectivegray-207482470?$684_547_PNG$',
    }
    ,
    {
      id: 7,
      name: 'Sofá Kalea Chaiselongue Norwich Derecho',
      description: 'Un sofa para esquinas en configuracion de sofa con chaiselongue adherido para un uso variable y diferentes opciones de posiciones para relajacion y descanso.',
      categories: ['Hogar', 'Muebles'],
      price: 8500,
      image: 'https://cdn.kemik.gt/2023/07/BA1397-KALEA-1200X1200-1.-700x700.jpg',
    }
    ,
    {
      id: 8,
      name: 'Whirlpool Estufa',
      description: 'Cubierta de acero porcelanizado, rejillas de hierro fundido, encendido electrónico Touch, perillas negras de plástico en el frente, comal teflonizado y ganador del reconocimiento A’ Design Award.',
      categories: ['Hogar', 'Electrodomésticos'],
      price: 6100,
      image: 'https://cdn.kemik.gt/2022/07/Whirlpool-LWF7551S-1200x1200-1-768x768.jpg',
    }
    ,
    {
      id: 9,
      name: 'Continental Escritorio Ejecutivo de Metal',
      description: 'Este escritorio es ideal ya sea para tu hogar u oficina, permite mantener tus cosas en orden y a tu alcance, asimismo brinda una vista elegante. Medidas: 200cmX150cmX75cm',
      categories: ['Hogar', 'Muebles'],
      price: 4900,
      image: 'https://cdn.kemik.gt/2022/10/669-ESCRI.MILAN-CONTINENTAL-1200X1200-1-768x768.jpg',
    }
    ,
    {
      id: 10,
      name: 'Steren Reloj Digital',
      description: 'Este reloj digital incorpora display en el que se muestran los números en tamaño grande para facilitar la lectura. Además de la hora, indica la temperatura y la fecha. También tiene función de alarma.',
      categories: ['Hogar'],
      price: 130,
      image: 'https://cdn.kemik.gt/2020/02/reloj-digital-con-alarma-y-termometro-768x768.jpg',
    },
    {
      id: 11,
      name: 'Horno Tostador y Freidora de Aire',
      description: 'Horno tostador y freidora de 8 funciones incluyen freidora, asar, hornear, recalentar, mantener caliente, papas fritas y deshidratar. Justo lo que necesitas para preparar todos tus platillo preferidos',
      categories: ['Electrodomésticos'],
      price: 1800,
      image: 'https://cdn.kemik.gt/2023/09/3619-PAFD4200-PREMIUM-1200X1200-2.-700x700.jpg',
    },
    {
      id: 12,
      name: 'Dispensador de agua fría y caliente',
      description: 'Dispensador de agua fría y caliente laterales de acero inoxidable. Cuenta con Botón de encendido y apagado independiente, botón de seguridad para el agua caliente y enfriamiento por compresor.',
      categories: ['Electrodomésticos'],
      price: 1600,
      image: 'https://cdn.kemik.gt/2022/11/355-large_default.-700x700.jpg',
    },
    {
      id: 13,
      name: 'Cafetera para Expresso y Capuchino',
      description: 'Cafetera 3 en 1 para espresso, capuchino y café con leche, posee varilla de espuma desmontable para difrutar deliciosos capuchinos y cafés con leche.',
      categories: ['Electrodomésticos'],
      price: 1100,
      image: 'https://cdn.kemik.gt/2023/09/3616-PEM1510B-PREMIUM-1200X1200-1.-700x700.jpg',
    },
    {
      id: 14,
      name: 'Basic Living Estante De Acero',
      description: 'Elegante diseño escalonado perfecto para combinarlo a tu gusto en cualquier espacio del hogar. Las repisas ofrecen suficiente espacio para colocar libros, artículos de colección, fotografías, etc',
      categories: ['Muebles'],
      price: 350,
      image: 'https://cdn.kemik.gt/2022/06/Basicliving-2712447000007-1200x1200-1-768x768.jpg',
    },
    {
      id: 15,
      name: 'Cama Rowan Matrimonial',
      description: 'Un ejemplo fantástico de una cama multi funcional que no pierde su estilo modernista. Su diseño es rectilíneo y de ánimo minimalista; un valor poco reconocido.',
      categories: ['Muebles'],
      price: 3400,
      image: 'https://cdn.kemik.gt/2021/05/AA0922-1-768x768.jpg',
    },
    {
      id: 16,
      name: 'Silla para Oficina',
      description: 'Una silla con un diseño muy limpio en el que destaca el cromo de las partes metálicas. Está tapizada con cuero textil, un material suave al contacto con al tacto y fácil de mantener.',
      categories: ['Muebles'],
      price: 1700,
      image: 'https://cdn.kemik.gt/2021/05/JB1155-KALEA-1200x1200-1-1-768x768.jpg',
    },
    {
      id: 17,
      name: 'Microsoft 365 Familia',
      description: '6 Usuarios. Incluye: Word, Excel, PowerPoint, OneNote, Outlook, Publisher y Access. 1 TB de almacenamiento en la nube por persona. Para PC, Mac, iOS y Android.',
      categories: ['Licencias'],
      price: 700,
      image: 'https://cloudflare.shopincdn.ovh/le-sofycon/cache/images/_product_catalogue_/3/7/565x565_q91_cr0_fix1/17556375_04451704081.jpg',
    },
    {
      id: 18,
      name: 'Antivirus Kaspersky Premium',
      description: '6 Usuarios. Incluye: Word, Excel, PowerPoint, OneNote, Outlook, Publisher y Access. 1 TB de almacenamiento en la nube por persona. Para PC, Mac, iOS y Android.',
      categories: ['Licencias'],
      price: 700,
      image: 'https://www.pcmediaonline.es/27678-thickbox_default/antivirus-kaspersky-premiun-10u-1ao-kl1047s5kfs-mini-es.jpg',
    },
    {
      id: 19,
      name: 'Antivirus Bitdefender Internet Security',
      description: 'Elija lo que utilizan los expertos usa las tecnologías más innovadoras previenen, detectan y reparan las amenazas digitales más recientes',
      categories: ['Licencias'],
      price: 700,
      image: 'https://cdn.kemik.gt/2022/11/7095595432131-Bitdefender-1200x1200-1-768x768.jpg',
    },
    {
      id: 20,
      name: 'Prehistoric Australasia',
      description: 'Durante la mayor parte de los últimos 300 millones de años, los continentes del mundo estuvieron interconectados formando los supercontinentes Pangea y luego Gondwana.',
      categories: ['Libros'],
      price: 700,
      image: 'https://cdn.pacifiko.com/image/cache/catalog/p/ODBmN2RjZW-1000x1000.jpg',
    },
    {
      id: 21,
      name: 'The Lord of the Rings Collection',
      description: 'Desde 1954, El Señor de los Anillos ha sido un libro que la gente adora. Llena de magia incomparable y de otro mundo, su amplia fantasía y aventura épica han tocado los corazones de las personas',
      categories: ['Libros'],
      price: 1200,
      image: 'https://m.media-amazon.com/images/I/81oxUCslWdL._SY425_.jpg',
    },
    {
      id: 22,
      name: 'Álgebra de Baldor (Spanish Edition)',
      description: 'El libro más vendido en Latinoamérica para la enseñanza del álgebra, se presenta en su tercera edición, completamente revisada, renovada y con numerosos soportes en línea.',
      categories: ['Libros'],
      price: 450,
      image: 'https://www.elsotano.com/imagenes_grandes/9786075/978607550209.JPG',
    },
    {
      id: 23,
      name: 'The Elder Scrolls V: Skyrim: Official Game Guide: Legendary Edition',
      description: 'Un libro en alta calidad que recorre este monstruo absoluto de guía de estrategia publicado en 2016 por Prima Games. Con más de 1115 páginas, esta guía del juego Skyrim Special Edition contiene todo lo que necesitas para triunfar en el mundo de Skyrim.',
      categories: ['Libros'],
      price: 950,
      image: 'https://m.media-amazon.com/images/I/91WTuq+vEwL._SY425_.jpg',
    },
    {
      id: 24,
      name: 'Dark Souls: The Official Guide',
      description: 'Entrar en Dark Souls sin ayuda hará que te maten. Incluso armado con el conocimiento completo del juego que te proporcionará esta guía, seguramente morirás al menos unas cuantas veces. Pero cuando un demonio gigantesco te pille por sorpresa tendrás la oportunidad de no perder todo. Esta es una verdadera guía de supervivencia para un juego en el que es casi imposible sobrevivir.',
      categories: ['Libros'],
      price: 800,
      image: 'https://m.media-amazon.com/images/I/811Lr7Dzy4L._SY425_.jpg',
    }    
  ];

  const allCategories = [...new Set(products.flatMap((product) => product.categories))];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };


  return (
    <div className="container">
     <br />
      <Button className='float-end btn-custom' variant="primary" onClick={openCarrito}>
        Ver carrito ({cart.length} productos)
      </Button>
      <br />
      <br />
      <div>
        <h3>Selecciona una categoría:</h3>
        <CategorySelect
          categories={[...allCategories]}
          selectedCategory={selectedCategory}
          onChange={handleSelectCategory}
        />
      </div>
      <br />
      <br />
      <div>
      <h3>Listado de Productos:</h3>
        <div className="row">
          {products
            .filter((product) => {
              if (selectedCategory === 'Todos') {
                return true;
              }
              return product.categories.includes(selectedCategory);
            })
            .map((product) => (
              <Productos
                key={product.id}
                {...product}
                onAddToCart={() => addToCart(product)}
              />
            ))}
        </div>
        <br /><br /><br />
      </div>
      <CarritoDiseño
        show={showCarrito}
        onClose={closeCarrito}
        cart={cart}
        total={total}
        onRemoveFromCart={removeFromCart}
      />
    </div>
  );
}

export default Tienda;