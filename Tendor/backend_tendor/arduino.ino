// #include <Ultrasonic.h>
// #include <DHT.h>
// #include <Stepper.h>
// #include <math.h>

// #define DHTTYPE DHT11
// #define DHTPIN 3

// Ultrasonic ultrasonico(12, 13);
// DHT dht(DHTPIN, DHTTYPE);

// int sensor_lluvia;
// int UnaVuelta = 2048;
// Stepper motor(UnaVuelta, 8, 10, 9, 11);
// Stepper motor2(UnaVuelta, 4, 6, 5, 7);
// void setup() {
//   Serial.begin(9600);
//   motor.setSpeed(10);
// }

// void loop() {
//   sensor_lluvia = analogRead(A0);
//   float humidity = dht.readHumidity();
//   float temperature = dht.readTemperature();
//   if(sensor_lluvia != 0) {
//     Serial.println(sensor_lluvia);
//   }

//   delay(1000);

//   if (Serial.available() > 0) {
//     String mensaje = Serial.readStringUntil('\n');
//     if (mensaje == "medir_lona") {
//       long distancia = ultrasonico.distanceRead("CM");
//       Serial.println(distancia);
//     } else if (mensaje.startsWith("encendido")) {
//       int medida_lona = mensaje.substring(10).toInt();
//       // pendiente la logica para calcular las vueltas por distancia
//       motor.step(UnaVuelta);
//       motor2.step(UnaVuelta);
//       if (!isnan(humidity) && !isnan(temperature)) {
//         Serial.print("humedad: ");
//         Serial.println(humidity);
//         Serial.print("temperatura: ");
//         Serial.println(temperature);
//       }
//     } else if (mensaje == "apagado") {
//       motor.step(-UnaVuelta);
//       motor2.step(-UnaVuelta);
//     }
//   }
// }