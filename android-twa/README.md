# App Android de ANOTA-T (APK)

Es una *Trusted Web Activity*: un APK liviano que abre https://anotat.vercel.app
a pantalla completa (sin barra del navegador), con su ícono en el inicio y las
notificaciones de la web como notificaciones de la app. Se descarga desde
`/descargas/anota-t.apk` (botón «Descargar la app» en el celular).

## Volver a compilar

Requisitos: JDK 17+, Gradle 8.9+, Android SDK (platforms;android-35, build-tools;35.0.0).

```bash
export ANDROID_HOME=/ruta/al/android-sdk
export ANOTAT_KEYSTORE=/ruta/segura/anotat-release.jks
export ANOTAT_KEYSTORE_PASSWORD='***'
export ANOTAT_KEY_ALIAS=anotat
export ANOTAT_KEY_PASSWORD='***'
cd android-twa && gradle assembleRelease
cp app/build/outputs/apk/release/app-release.apk ../public/descargas/anota-t.apk
```

Antes de publicar una actualización sube `versionCode` en `app/build.gradle`.

## La clave de firma

`anotat-release.jks` **no** está en el repositorio (es privada). Sin ella no se
puede actualizar la app: Android solo instala una versión nueva si está firmada
con la misma clave. Su huella SHA-256 está en `public/.well-known/assetlinks.json`
(es lo que permite abrir la web a pantalla completa).

## iPhone

Apple no permite instalar APK ni apps fuera de su tienda. En iPhone se instala
la app web desde Safari → Compartir → «Agregar a inicio» (la guía aparece al
tocar «Descargar la app»). Desde iOS 16.4 esa app puede recibir notificaciones.
