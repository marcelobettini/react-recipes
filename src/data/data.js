const pics = {
  bakedSalmon: "src//assets/BakedSalmon.webp",
  fishTacos: "src/assets/FishTacos.jpg",
  empanadas: "src/assets/Empanadas.webp",
  cesarSalad: "src/assets/CesarSalad.webp",
  spaghettiBolognesa: "src/assets/SpaghettiBolognesa.jpg",
  tomatoSoup: "src/assets/TomatoSoup.jpg",
  roastedChicken: "src/assets/RoastedChicken.jpg",
  guacamole: "src/assets/Guacamole.jpg",
  riceChicken: "src/assets/RiceChicken.jpg",
  dulceLeche: "src/assets/DulceLeche.jpg",
}

const data = [
  {
    "name": "Salmón al Horno",
    "pic": pics.bakedSalmon,
    "ingredients": [
      { "name": "Salmón", "amount": 1, "measurement": "kilo" },
      { "name": "Piñones", "amount": 1, "measurement": "taza" },
      { "name": "Lechuga Mantequilla", "amount": 2, "measurement": "tazas" },
      { "name": "Calabaza Amarilla", "amount": 1, "measurement": "med" },
      { "name": "Aceite de Oliva", "amount": 0.5, "measurement": "taza" },
      { "name": "Ajo", "amount": 3, "measurement": "dientes" }
    ],
    "steps": [
      "Precalentar el horno a 175 grados Celsius.",
      "Distribuir el aceite de oliva en una bandeja de vidrio para hornear.",
      "Añadir la calabaza amarilla y hornear durante 30 minutos.",
      "Añadir el salmón, los ajos y los piñones a la bandeja.",
      "Hornear por 15 minutos.",
      "Retirar del horno, añadir la lechuga y servir."
    ]
  },
  {
    "name": "Tacos de Pescado",
    "pic": pics.fishTacos,
    "ingredients": [
      { "name": "Pescado Blanco", "amount": 1, "measurement": "kilo" },
      { "name": "Queso", "amount": 1, "measurement": "taza" },
      { "name": "Lechuga Iceberg", "amount": 2, "measurement": "tazas" },
      { "name": "Tomates", "amount": 2, "measurement": "grandes" },
      { "name": "Aguacate", "amount": 1, "measurement": "grande" },
      { "name": "Tortillas", "amount": 3, "measurement": "med" }
    ],
    "steps": [
      "Cocinar el pescado en la parrilla hasta que esté bien cocido.",
      "Colocar el pescado en las 3 tortillas.",
      "Añadir lechuga, tomates, aguacate y queso por encima."
    ]
  },
  {
    "name": "Empanadas",
    "pic": pics.empanadas,
    "ingredients": [
      { "name": "Masa de Empanada", "amount": 12, "measurement": "unidades" },
      { "name": "Carne Picada", "amount": 500, "measurement": "g" },
      { "name": "Cebolla", "amount": 1, "measurement": "med" },
      { "name": "Huevos Duros", "amount": 2, "measurement": "unidades" },
      { "name": "Aceitunas", "amount": 100, "measurement": "g" }
    ],
    "steps": [
      "Cocinar la cebolla y agregar la carne hasta dorar.",
      "Añadir los huevos duros picados y aceitunas.",
      "Rellenar las masas con la mezcla y cerrarlas.",
      "Hornear a 180 grados Celsius durante 25 minutos."
    ]
  },
  {
    "name": "Ensalada César",
    "pic": pics.cesarSalad,
    "ingredients": [
      { "name": "Lechuga Romana", "amount": 3, "measurement": "tazas" },
      { "name": "Queso Parmesano", "amount": 0.5, "measurement": "taza" },
      { "name": "Crutones", "amount": 1, "measurement": "taza" },
      { "name": "Pechuga de Pollo", "amount": 1, "measurement": "l lb" },
      { "name": "Aderezo César", "amount": 0.25, "measurement": "taza" }
    ],
    "steps": [
      "Cocinar la pechuga de pollo a la parrilla.",
      "Cortar la lechuga y mezclar con los crutones y el queso parmesano.",
      "Añadir el aderezo César y el pollo por encima."
    ]
  },
  {
    "name": "Spaghetti a la Boloñesa",
    "pic": pics.spaghettiBolognesa,
    "ingredients": [
      { "name": "Spaghetti", "amount": 500, "measurement": "g" },
      { "name": "Carne Molida", "amount": 300, "measurement": "g" },
      { "name": "Salsa de Tomate", "amount": 2, "measurement": "tazas" },
      { "name": "Cebolla", "amount": 1, "measurement": "med" },
      { "name": "Ajo", "amount": 2, "measurement": "dientes" },
      { "name": "Aceite de Oliva", "amount": 2, "measurement": "cucharadas" }
    ],
    "steps": [
      "Cocinar la pasta según las instrucciones del paquete.",
      "En una sartén, saltear la cebolla y el ajo en aceite de oliva.",
      "Añadir la carne molida y cocinar hasta dorar.",
      "Agregar la salsa de tomate y cocinar a fuego lento por 20 minutos.",
      "Servir la salsa boloñesa sobre el spaghetti."
    ]
  },
  {
    "name": "Sopa de Tomate",
    "pic": pics.tomatoSoup,
    "ingredients": [
      { "name": "Tomates", "amount": 5, "measurement": "grandes" },
      { "name": "Cebolla", "amount": 1, "measurement": "med" },
      { "name": "Ajo", "amount": 2, "measurement": "dientes" },
      { "name": "Caldo de Pollo", "amount": 3, "measurement": "tazas" },
      { "name": "Aceite de Oliva", "amount": 1, "measurement": "cucharada" }
    ],
    "steps": [
      "Saltear la cebolla y el ajo en aceite de oliva.",
      "Añadir los tomates y cocinar hasta que estén suaves.",
      "Agregar el caldo de pollo y cocinar a fuego lento por 30 minutos.",
      "Licuar la sopa y servir caliente."
    ]
  },
  {
    "name": "Pollo Asado",
    "pic": pics.roastedChicken,
    "ingredients": [
      { "name": "Pollo Entero", "amount": 1, "measurement": "med" },
      { "name": "Romero", "amount": 2, "measurement": "ramitas" },
      { "name": "Ajo", "amount": 5, "measurement": "dientes" },
      { "name": "Limón", "amount": 1, "measurement": "med" },
      { "name": "Aceite de Oliva", "amount": 0.25, "measurement": "taza" }
    ],
    "steps": [
      "Precalentar el horno a 200 grados Celsius.",
      "Frotar el pollo con aceite de oliva, romero y ajo.",
      "Colocar rodajas de limón dentro del pollo.",
      "Asar en el horno durante 1 hora y 30 minutos."
    ]
  },
  {
    "name": "Guacamole",
    "pic": pics.guacamole,
    "ingredients": [
      { "name": "Aguacates", "amount": 3, "measurement": "grandes" },
      { "name": "Cebolla", "amount": 0.5, "measurement": "med" },
      { "name": "Tomates", "amount": 2, "measurement": "med" },
      { "name": "Cilantro", "amount": 0.25, "measurement": "taza" },
      { "name": "Jugo de Limón", "amount": 2, "measurement": "cucharadas" }
    ],
    "steps": [
      "Pelar y triturar los aguacates en un tazón.",
      "Añadir cebolla, tomates, cilantro y jugo de limón.",
      "Mezclar bien y servir con tortillas."
    ]
  },
  {
    "name": "Arroz con Pollo",
    "pic": pics.riceChicken,
    "ingredients": [
      { "name": "Arroz", "amount": 2, "measurement": "tazas" },
      { "name": "Pechuga de Pollo", "amount": 2, "measurement": "med" },
      { "name": "Cebolla", "amount": 1, "measurement": "med" },
      { "name": "Pimiento Rojo", "amount": 1, "measurement": "med" },
      { "name": "Caldo de Pollo", "amount": 3, "measurement": "tazas" }
    ],
    "steps": [
      "Cocinar el arroz en el caldo de pollo.",
      "Saltear la cebolla y el pimiento.",
      "Añadir el pollo y cocinar hasta que esté dorado.",
      "Mezclar el arroz cocido con el pollo y servir."
    ]
  },
  {
    "name": "Dulce de Leche",
    "pic": pics.dulceLeche,
    "ingredients": [
      { "name": "Leche", "amount": 1, "measurement": "litro" },
      { "name": "Azúcar", "amount": 300, "measurement": "g" },
      { "name": "Bicarbonato de Sodio", "amount": 1, "measurement": "cucharadita" },
      { "name": "Vainilla", "amount": 1, "measurement": "cucharadita" }
    ],
    "steps": [
      "Calentar la leche en una cacerola a fuego medio.",
      "Añadir el azúcar y el bicarbonato de sodio, mezclando bien.",
      "Cocinar a fuego lento, removiendo ocasionalmente, hasta obtener un color dorado.",
      "Añadir la vainilla y cocinar por unos minutos más antes de enfriar."
    ]
  }
]
  ;
export default data