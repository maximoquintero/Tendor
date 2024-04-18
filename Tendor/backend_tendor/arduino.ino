#include <Ultrasonic.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Stepper.h>
#include <math.h>

#define DHTTYPE DHT11
int DHTPIN = 3;

Ultrasonic ultrasonico(12, 13); // (Trig pin, Echo pin)
long distancia;
int UnaVuelta = 1084;

DHT dht(DHTPIN, DHTTYPE);

int sensor_lluvia;
boolean estado_lona = false;
boolean estado_motores = false;
Stepper motor(UnaVuelta, 8, 10, 9, 11);
Stepper motor2(UnaVuelta, 4, 6, 5, 7);

void moverMotoresAdelante(int vueltasPorDistancia) {
  for(int i = 0; i < vueltasPorDistancia; i++) {
    motor.step(UnaVuelta);
    motor2.step(UnaVuelta);
  }
  estado_motores = true;
}

void moverMotoresAtras(int vueltasPorDistancia) {
  for(int i = 0; i < vueltasPorDistancia; i++) {
    motor.step(-UnaVuelta);
    motor2.step(-UnaVuelta);
  }
  estado_motores = false;
}

int calcularVueltasPorDistancia() {
  distancia = ultrasonico.distanceRead(CM);
  int vueltasPorDistancia = distancia / 3.1416;
  return vueltasPorDistancia;
}

void setup() {
  Serial.begin(9600);
  dht.begin();
  motor.setSpeed(30);
  motor2.setSpeed(30);
}

void loop() {
  int vueltasPorDistancia = calcularVueltasPorDistancia();
  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == 'M') {
      Serial.println(distancia);
    }
    else if (command == 'D') {
      moverMotoresAdelante(vueltasPorDistancia);
      estado_lona = true;
      // Serial.println("lona desplegada");
    }
    else if (command == 'G') {
      moverMotoresAtras(vueltasPorDistancia);
      estado_lona = false;
      // Serial.println("lona guardada");
    }
  }
  else {
    // Serial.println("No se reconocio el comando");
    automatico();
    delay(1000);
  }
}

void automatico() {
  int vueltasPorDistancia = calcularVueltasPorDistancia();
  if (!estado_lona) {
    sensor_lluvia = analogRead(A1);
    if (sensor_lluvia > 0) {
      float humidity = dht.readHumidity();
      float temperature = dht.readTemperature();
      if (!isnan(humidity) && !isnan(temperature)) {
        Serial.print(humidity);
        Serial.print(" ");
        Serial.println(temperature);
      }
      if (!estado_motores) {
        moverMotoresAdelante(vueltasPorDistancia);
      }
    }
    if (sensor_lluvia == 0 && estado_motores) {
      moverMotoresAtras(vueltasPorDistancia);
    }
  }
}
