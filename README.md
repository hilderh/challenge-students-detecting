![Image Console](./images/console.jpg)

# Test Challenge Foris
## ✅ Solución
Partiendo del lado conceptual, sabemos que un problema puede ser abordado de diferentes maneras. En este caso, se aborda la solución en base a tres factores : Escalabilidad, test, legibilidad.

En la medida de lo posible ( **siempre** **se puede mejorar** ) se trato de implementar practicas de desarrollo estandarizadas, de manera que se haga legible la lectura del codigo.

La solucion principal paso por el manejo de objetos basados en Estudiantes ( **Student** ) y Asistencias ( **Presence** ). Los cuales estan relacionados entre si con una relacion de composicion, donde la asistencia ( **Presence** ) puede existir solo si el estudiante la compone.

En su momento, el planteamiento inicial buscaba adicionar ***Typescript***, ya que este da la posibilidad de manejar tipos de datos (  clases, tipos de entradas, salidas, atributos publicos/privados etc). Sin embargo, para mantener la simplicidad ( ***kiss priciple*** ) de la solución se ejecutaron las clases ( *Student y Presence* ) de manera nativa de Javascript. Mas alla de la herramienta utiliazada, el fin era el mismo: Acceder a los atributos de estas clases desde sus "*Getters*" , asignar valores/comportamientos a traves de sus "*Setters*" e inicializar valores en el constructor.

Para controlar las ejecuciones por "consola" de las lineas del archivo se estableció un modulo el cual contiene los comandos permitidos ( ***Student* y *Presence* en este caso** ) , de manera que al entrar una linea del archivo, busca y ejecuta el comando solo si este se encuentra en este modulo mencionado. La idea principal es almacenar los comandos ejecutores de forma que si existe un comando nuevo se agrega a dicho modulo y evitamos cambios demasiado profundos en logica.

Hay un archivo llamado "*report.js*" ( /logic/report ). Que busca mostrar reportes segun se solicite. De esta manera la logica de reportes se maneja en un solo lugar.

#### Estándares aplicados
Como se mencionó anteriormente siempre se puede y se debe mejorar, para ello se trató de implementar en la medida de lo posible reglas de desarrollo en el programa. Que le dieron legibilidad al codigo y las cuales fueron.

 - *cammelCase* como "patron" para cada nombramiento de las variables y metodos.
 - Las funciones llevan verbo, para obtener referencias de sus ejecuciones.
 - Las funciones devuelven objetos con las propiedades ***error***, ***message*** y si asi lo requeria tambien ***data*** 
 - Cada función debe tener **un** **solo** propósito, y a medida que alguna de estas crecia se buscaba refactorizar asignandole responsabilidad a otra funcion si era necesario.
 
## 👩‍💻👨‍💻 Ejecución

Como es el lenguaje donde se cuenta con mas habilidad y destreza al dia de hoy, el programa esta escrito en Javascript con el conjunto de librerias Node Js.

Para la ejecucion del programa necesitas tener instaladas estas herramientas localmente:
 - node > v9.5.0
 - npm > 6.11.3
 - git

Como se solicitó el archivo esta en un bundle de git, para obtener los archivos desde este bundle el comando de ejecucion es: 

    git clone -b master foris.bundle foris

Esto traera los ultimos cambios de *master* del repo y lo almacenara en una carpeta llamada *foris*.

Una vez estando dentro de la carpeta "foris", ahora instala nuestro programa globalmente e instala las dependencias:

    npm install -g .

Hecho esto, puedes ejecutar el programa donde desees. Ademas, acabas de instalar nuestra ejecucion personalizada. ¿Que quiere decir esto?, bueno ahora nuestro programa ejecuta tipeando "***foris***" 🔥 :

    foris test/mock/data.txt

Con este comando principal el programa se ejecuta. *foris* ejecuta el programa con un archivo de entrada *data.txt* ubicado en la direccion dentro del proyecto *test/mock/* .

Si deseas utilizar un archivo .txt de tu propiedad entonces el comando seria algo como 

    foris tu_carpeta/tu_archivo.txt

O simplemente si el archivo esta en el root folder del repo seria:

    foris tu_archivo.txt
 
Al ejecutar este comando, el programa lee el archivo linea por linea y al finalizar pregunta si quieres ver el reporte de resultados con una pregunta en la terminal como esta : 

    ? Do you want to watch the students presence's report ? (Y/n) 

( **¡Por favor di que si a la consola!** 😄)
 
Una vez aceptado, el programa debe mostrar un reporte de estudiantes ordenado por el acumulado de asistencias expresadas en minutos.

```
   ╒════════════════════════════════════╕
   │                                    │
   │   PRESCENCES REPORT:               │
   │                                    │
   │   Penny: 998 minutes in 3 days     │
   │   Sheldon: 209 minutes in 2 days   │
   │   Raj: 142 minutes in 2 days       │ 
   │   Howard: 0 minutes in 0 days      │
   │   Leonard: 0 minutes in 0 days     │
   │                                    │
   │                                    │
   ╘════════════════════════════════════╛
``` 
#### Testing
Las pruebas unitarias se realizaron por funciones, y en base a las librerias [Mocha](https://mochajs.org/) y [Chai](https://www.chaijs.com/)

    npm test 

Esto ejecutará 31 pruebas unitarias por cada funcion involucrada en la lógica del programa.

## 📁 Estructura

### bin / *index.js*
Es el ejecutor del programa. Seria algo parecido a un "Main" por llamarlo de alguna forma.

### data
Esta carpeta esta destinada a los archivos que manejaran almacenaran la data, o bien dicho una capa de datos. En este caso sencillo por tratarse de data no persistente se manejó un archivo que simplemente contiene dos arrays, estos a su vez almacenan la data de Estudiantes y Asistencias simulando el funcionamiento de "tablas". Si fuese el caso de tablas reales en esta carpeta se podria manejar las llamadas a BD por ejemplo.


### images
La función de esta carpeta es simple, tener imagenes para este archivo Readme.md en este caso solo contiene 1 imagen. La que se observa mas arriba.

### logic
Contiene la lógica donde se manejan las funciones principales de cada actor del programa: Estudiantes, Asistencias y Funciones de la consola. Cumpliria el papel parecido a los "controladores". La idea principal es tratar de que cada una funcion tenga un solo proposito, y asi evitar funciones extramadamente largas y que a la larga se transformen en poco leíbles.

### models
Es la base del programa, ya que maneja las clases y schemas que le dan vida al manejo de objetos. En las clases existen Estudiante y Asistencia, las cuales manejan sus setters y getters que manipulan el comportamiento de estas entidades. Dentro de "schemas", se encuenta la base de las validaciones, estos archivos sirven para validar la entrada y salida de estos datos, asi como tambien los nombres para que estos campos puedan ser reportados de forma clara al momento de estar involucrados en alguna salida de datos. En el caso del archivo "*CommandList*", este basicamente permite buscar en forma de funcion los comandos disponibles para el programa, es decir, se maneja de forma dinamica haciendolo escalable si queremos adicionar un comando nuevo.

### test
Contiene las pruebas unitarias del programa se desarrollaron las pruebas por cada una de las entidades asi como tambien para las funciones que manejan el prompt. Dentro esta una carpeta llamada "mock" que contiene dato de prueba en diferentes casos que lo requieran los test unitarios.

## 🤝 Consideraciones y Mejoras

Obviamente, un programa/sistema/solución siempre tendrá mejoras y las ideas grupales siempre prevalecen sobre la individual, es por ello que seria de total agrado recibir feedback lo mas critico posible para tenerlo en cuenta en la mejora continua personal 💪. 

Hay muchas cosas que por prioridad y tiempo me hubiesen gustado que tengan una mejor ejecucion y planteamiento. Aqui se lista las consideraciones al respecto:

 - Los mensajes de salida del programa estan en español, y el resto en ingles. Me hubiese gustado unificar todos los mensajes en una misma linea.
 - Me hubiese gustado probar el programa con mas de 1000 lineas, de manera de ver el performance de la solución aplicada.
 - Seria estupendo implementar logs, en los cuales se viera las salidas inesperadas/errores/fallos del sistema.

> ***Nota**: Gracias por la oportunidad de expresarme a través de este test.* 👍

