import asyncio
import websockets
import serial
import time
import json
import mysql.connector

db_config = {
    'host': "mysql-maxquin.alwaysdata.net",
    'user': "maxquin",
    'password': "HolaMundo23",
    'database': "maxquin_tendor"
}

try:
    db = mysql.connector.connect(**db_config)
    cursor = db.cursor()
except mysql.connector.Error as err:
    print(f"Error al conectar a MySQL: {err}")
    exit(1)

arduino_serial = serial.Serial('COM7', 9600, timeout=1)

async def comunicacion(websocket, path):
    usuario = None
    recibiendo_datos = False
    
    while True:
        try:
            message = await asyncio.wait_for(websocket.recv(), timeout=0.1) # Espera hasta 0.1 segundos para recibir mensajes
            print(f"Recibido del cliente: {message}")
            if message == "M":
                # Si se recibe el comando 'M', enviar el comando al Arduino
                arduino_serial.write(message.encode())
                time.sleep(0.9)
                distancia = arduino_serial.readline().decode().strip()
                print("Distancia:", distancia)
                # Enviar la distancia medida al cliente
                await websocket.send(json.dumps({"distancia": distancia}))
                sql_update_distancia = "UPDATE usuarios SET medida_lona = %s WHERE id_usuario = %s"
                cursor.execute(sql_update_distancia, (distancia, usuario))
                db.commit()

            elif message in ["D", "G"]:
                print(f"Enviando a Arduino: {message}")
                arduino_serial.write(message.encode())
            else:
                usuario = int(message)
        except asyncio.TimeoutError:
            pass  # Ignora si no hay mensajes del cliente

        if arduino_serial.inWaiting() > 0:
            datos_temperatura = arduino_serial.readline().decode().strip()
            humidity, temperature = map(float, datos_temperatura.split())
            
            print("Humedad:", humidity)
            print("Temperatura:", temperature)
            await websocket.send(json.dumps({"humedad": humidity, "temperatura": temperature}))
            
            sql_insert = "INSERT INTO ctrl_sensor (sensor_temperatura, sensor_humedad, usuario_id) VALUES (%s, %s, %s)"
            cursor.execute(sql_insert, (humidity, temperature, usuario))
            
            if not recibiendo_datos:
                sql_update_1 = "UPDATE ctrl_lluvia SET estado = %s WHERE usuario_id = %s"
                cursor.execute(sql_update_1, (1, usuario))
                recibiendo_datos = True
            
            db.commit()
        else:
            if recibiendo_datos:
                sql_update_0 = "UPDATE ctrl_lluvia SET estado = %s WHERE usuario_id = %s"
                cursor.execute(sql_update_0, (0, usuario))
                recibiendo_datos = False
                db.commit()

async def start_server():
    async with websockets.serve(comunicacion, "localhost", 8765):
        await asyncio.Future()  # Ejecuta el servidor indefinidamente

if __name__ == "__main__":
    print("Iniciando servidor WebSocket...")
    asyncio.run(start_server())
