# import asyncio
# import websockets
# import serial
# import time
# import json
# import mysql.connector

# db_config = {
#     'host': "mysql-maxquin.alwaysdata.net",
#     'user': "maxquin",
#     'password': "HolaMundo23",
#     'database': "maxquin_sm52_arduinio"
# }

# try:
#     db = mysql.connector.connect(**db_config)
#     cursor = db.cursor()
# except mysql.connector.Error as err:
#     print(f"Error al conectar a MySQL: {err}")
#     exit(1)

# arduino_serial = serial.Serial('COM7', 9600, timeout=1)

# def get_medida_lona():
#     arduino_serial.write(b'medir_lona\n')  # Solicita la medida de la lona necesaria
#     time.sleep(1)  # Da tiempo al Arduino para responder
#     if arduino_serial.inWaiting() > 0:
#         medida = int(arduino_serial.readline().decode().strip())
#         return medida
#     return 0

# medida_lona = get_medida_lona()
# print(medida_lona)

# async def handle_led(websocket, path):
#     while True:
#         try:
#             # Espera recibir datos del Arduino
#             sensor_lluvia_str = await websocket.recv()  # Recibe el valor del sensor como cadena de texto
#             sensor_lluvia = int(sensor_lluvia_str)     # Convierte la cadena de texto a entero
#             print("Datos recibidos del Arduino:", sensor_lluvia)  # Agrega una impresión para debuggear
#             mensaje = "encendido {}".format(medida_lona)
#             if arduino_serial.inWaiting() > 0:
#                 if sensor_lluvia > 0:
#                     arduino_serial.write(mensaje.encode() + b'\n')
#                 elif sensor_lluvia == 0:
#                     arduino_serial.write(b'apagado\n')
#         except Exception as e:
#             print("Error al recibir datos del Arduino:", e)

#             distance = int(distancia)
#             if distance <= 10: 
#                 mensaje = "Verde"
#             elif distance <= 30:
#                 mensaje = "Amarillo"
#             else:
#                 mensaje = "Rojo"
#             await websocket.send(json.dumps({"valor": distance, "mensaje": mensaje}))
#             sql = "INSERT INTO ultrasonico (dato_lectura, mensaje) VALUES (%s, %s)"
#             cursor.execute(sql, (distance, mensaje))
#             db.commit()
        
#         try:
#             message = await asyncio.wait_for(websocket.recv(), timeout=0.1)
#             print(f"Recibido del cliente: {message}")
#             if message in ["1", "0"]:
#                 print(f"Enviando a Arduino: {message}")
#                 arduino_serial.write(message.encode())
#         except asyncio.TimeoutError:
#             pass
        
# async def start_server():
#     async with websockets.serve(handle_led, "localhost", 8765):
#         await asyncio.Future()  # Ejecuta el servidor indefinidamente

# if __name__ == "__main__":
#     print("Iniciando servidor WebSocket...")
#     asyncio.run(start_server())
