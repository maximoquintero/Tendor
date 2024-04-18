#include <Ultrasonic.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Stepper.h>
#include <math.h>

#define DHTTYPE DHT11
int DHTPIN = 3;

Ultrasonic ultrasonico(12, 13); // (Trig pin, Echo pin)
long distancia;
int UnaVuelta = 2048;
float vueltasPorDistancia;
float PasosPorDistancia;

DHT dht(DHTPIN, DHTTYPE);

int sensor_lluvia;
boolean estado_lona = false;
boolean estado_motores = false;
Stepper motor(UnaVuelta, 8, 10, 9, 11);
Stepper motor2(UnaVuelta, 4, 6, 5, 7);

void setup() {
    Serial.begin(9600);
    dht.begin();
    motor.setSpeed(10);
    motor2.setSpeed(10);
}

void loop() {
  distancia = ultrasonico.distanceRead(CM);
    if (Serial.available() > 0) {
        char command = Serial.read();
        if (command == 'M') {
            Serial.println(distancia);
        }
        else if (command == 'D') {
            vueltasPorDistancia = distancia / 3.1416;
            PasosPorDistancia = vueltasPorDistancia * UnaVuelta;
            int PasosEnteros = PasosPorDistancia;
            motor.step(PasosEnteros);
            motor2.step(PasosEnteros);
            estado_lona = true;
            // Serial.println("lona desplegada");
        }
        else if (command == 'G') {
            vueltasPorDistancia = distancia / 3.1416;
            PasosPorDistancia = vueltasPorDistancia * UnaVuelta;
            int PasosEnteros = PasosPorDistancia;
            motor.step(-PasosEnteros);
            motor2.step(-PasosEnteros);
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
    distancia = ultrasonico.distanceRead(CM);
    vueltasPorDistancia = distancia / 3.1416;
    PasosPorDistancia = vueltasPorDistancia * UnaVuelta;
    int PasosEnteros = PasosPorDistancia;
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
            // Serial.println(sensor_lluvia);
            if (!estado_motores) {
                motor.step(PasosEnteros);
                motor2.step(PasosEnteros);
                estado_motores = true;
            }
        }
        if (sensor_lluvia == 0 && estado_motores) {
            motor.step(-PasosEnteros);
            motor2.step(-PasosEnteros);
            estado_motores = false;
        }
    }
}