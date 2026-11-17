---
name: rastrear-envio
description: >
  Consultar en qué estado está un envío por agencia (hoy Shalom) y responderle al
  vendedor o al comprador. Usar cuando pregunten "¿dónde está mi pedido?",
  "¿ya llegó el paquete?", "rastrea este envío", "estado del envío", "consulta en
  Shalom", o cuando haya un número de orden y código de un ticket de agencia.
  Solo lectura: no crea guías, no inicia sesión y no pide contraseñas.
---

# /rastrear-envio — Estado de un envío por agencia

Nacido de la prueba del 2026-11-16: el rastreo público de Shalom respondió en
6 a 7 segundos, con navegador sin ventana y sin credenciales.

## Principio rector

**El guion navega; el modelo solo redacta.** Los pasos de una consulta son
siempre los mismos, así que viven en un script. No recorrer la página clic por
clic con el modelo: cuesta decenas de miles de tokens por consulta y no agrega
nada.

**Consultar cuando alguien pregunta, no por adelantado.** No revisar todos los
pedidos en curso cada cierto tiempo: se consulta el pedido de quien está
escribiendo, en ese momento.

## Qué se necesita

| Dato | Dónde está |
|---|---|
| Número de orden (8 a 12 dígitos) | Ticket de la agencia y rótulo («GR») |
| Código (4 caracteres) | Ticket de la agencia, junto al número |

Si falta el código, pedirlo: sin él Shalom no muestra nada.

## Cómo consultar

```bash
node scripts/rastrear-shalom.js <orden> <codigo>
```

Se ejecuta desde la carpeta de este skill. Requiere haber preparado una vez
las dependencias (ver README del repositorio). Devuelve JSON:

```json
{
  "transportista": "shalom",
  "orden": "100000000",
  "ok": true,
  "estado": "Entregado",
  "etapa": "Entregado",
  "etapas": ["En origen", "En tránsito", "En destino", "Entregado"],
  "registrado_el": "01/03/26 10:15",
  "entregado_el": "04/03/26 16:40"
}
```

| Salida | Significa | Qué hacer |
|---|---|---|
| `0` | Encontrado | Responder con `estado` y la fecha |
| `3` | Orden no encontrada | Pedir que revisen número y código del ticket |
| `4` | La página cambió o no respondió | Decir que no se pudo consultar; no inventar estado |
| `2` | Datos mal formados | Corregir el número o el código |

## Cómo responder

- Decir el estado y la fecha en una frase: «Tu pedido ya está en destino desde
  el 14/11».
- **No repetir nombre ni DNI de quien recogió.** Shalom los muestra en su
  página; el script los omite. `--con-destinatario` los incluye y solo se usa
  cuando el vendedor lo pide en privado, nunca en un grupo.
- Si el estado es «En destino», recordar que el retiro en agencia pide la clave
  de seguridad y que hay plazo de recojo.
- Las fechas son las que publica Shalom; no corregirlas ni completarlas.

## Límites conocidos

- Probado desde una computadora en casa. Falta probar desde un servidor en la
  nube, donde el reCAPTCHA de la página puede comportarse distinto.
- No se conoce el tope de consultas seguidas antes de un bloqueo. Otra razón
  para consultar solo bajo demanda.
- El detalle completo del envío exige cuenta Shalom Pro del remitente o del
  destinatario. Este skill no entra ahí.
- **Crear guías no pertenece a este skill.** Es una operación real y cobrable,
  sin ambiente de prueba, y un reintento duplica el envío: necesita confirmación
  humana.

## Otro transportista

Agregar `scripts/rastrear-<transportista>.js` con el mismo contrato de salida
(`transportista`, `orden`, `ok`, `estado`, fechas, mismos códigos de salida) y
una fila en «Qué se necesita». No crear otro skill por transportista.
