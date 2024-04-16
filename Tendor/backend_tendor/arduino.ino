#include <Ultrasonic.h>
#include <DHT.h>
#include <Stepper.h>
#include <math.h>

#define DHTTYPE DHT11
#define DHTPIN 3

Ultrasonic ultrasonico(12, 13); // (Trig pin, Echo pin)
DHT dht(DHTPIN, DHTTYPE);

int sensor_lluvia;
boolean estado_lona = false;
boolean estado_motores = false;
int UnaVuelta = 2048;
Stepper motor(UnaVuelta, 8, 10, 9, 11);
Stepper motor2(UnaVuelta, 4, 6, 5, 7);

void setup() {
    Serial.begin(9600);
    motor.setSpeed(10);
}

void loop() {
    if (Serial.available() > 0) {
        char command = Serial.read();
        if (command == 'M') {
            long distancia = ultrasonico.distanceRead("CM");
            Serial.println(distancia);
        }
        else if (command == 'D') {
            motor.step(UnaVuelta);
            motor2.step(UnaVuelta);
            estado_lona = true;
            // Serial.println("lona desplegada");
        }
        else if (command == 'G') {
            motor.step(-UnaVuelta);
            motor2.step(-UnaVuelta);
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
                motor.step(UnaVuelta);
                motor2.step(UnaVuelta);
                estado_motores = true;
            }
        }
        if (sensor_lluvia == 0 && estado_motores) {
            motor.step(-UnaVuelta);
            motor2.step(-UnaVuelta);
            estado_motores = false;
        }
    }
}
