import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [darkMode] = useState(getInitialMode());
  const [estadoLona, setEstadoLona] = useState(false);
  const [websocket, setWebsocket] = useState(null);
  const [medirLona, setMedirLona] = useState(false);
  // const [usuario, setUsuario ] = useState();
  const [temperatura, setTemperatura] = useState(null);
  const [humedad, setHumedad] = useState(null);

  const objetoString = localStorage.getItem('id_usuario');
  const objeto = JSON.parse(objetoString);
  console.log(objeto)

  useEffect(() => {
    // setUsuario(objeto);
    // console.log(usuario);

    const ws = new WebSocket("ws://localhost:8765");
    ws.onopen = () => {
      console.log("Conectado al servidor WebSocket");
      ws.send(objeto);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje recibido del servidor:", data);
      if (data.temperatura !== undefined && data.humedad !== undefined) {
        setTemperatura(data.temperatura);
        console.log(temperatura);
        setHumedad(data.humedad);
        console.log(humedad);
      }
    };

    setWebsocket(ws);
  }, []);

  useEffect(() => {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      if (estadoLona) {
        websocket.send("D");
      } else {
        websocket.send("G");
      }
    }
  }, [estadoLona, websocket]);

  useEffect(() => {
    if (medirLona && websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send("M");
    }
  }, [medirLona, websocket]);

  // Función para obtener el modo oscuro desde el almacenamiento local
  function getInitialMode() {
    const savedMode = JSON.parse(localStorage.getItem("darkMode"));
    return savedMode || false; // Devuelve false si no se encuentra en el almacenamiento local
  }

  // Efecto para aplicar el modo oscuro al cargar la página
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
    <button className="absolute top-[10%] left-[50%] text-[#858585] text-xl" onClick={() => setMedirLona(!medirLona)}>Medir lona</button>
      <Navbar />
      <div className={`card ${darkMode ? "dark" : ""}`}>
        <div className={`card1 ${darkMode ? "dark" : ""}`}>
          <a href="/historial">
            <div>
              <h1>Historial de cargas</h1>
            </div>
          </a>
        </div>

        <div className={`card2 ${darkMode ? "dark" : ""}`}>
          <h1>{estadoLona ? "Lona Desplegada" : "Lona guardada"}</h1>
          <button onClick={() => setEstadoLona(!estadoLona)}>
            {estadoLona ? "Quitar Lona" : "Poner Lona"}
          </button>
        </div>
        <div className={`card3 ${darkMode ? "dark" : ""}`}>
          <div>
            <img
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABS9JREFUaEPtml1oHFUUx/9n1sxsG9yZnU0ErdDmoZTog6FaURqICIpQLfiiBVEQX1KqVgRFsWCqQsAKVhTagg8q+qAv4hc+VMEi1UrUWlT8qsRgUxGzMzsbSHY22XvsbBPJTnZ35s7HBtud1zkf/985d+69c2cIF9lFFxkvusAXese7HU6zw7ZdHWKFnwNww1KeL0nQvnxePZVm3pWxO9Zhq+Q+D8JjzcDOiRjL69r+TkB3BLjoVG4j0MftgBh0Y0FXT6QNnSqw47Ap4N7HoEcAbAyAmSTwS8TaG4ZBdlrgqQD/U65syTCNAdgVUfhbGfCYrmdPR/Rv6ZYosG2zwUr1FQD3JCGUgdexqD5cKFA5iXhejMSAi7Pu1STwUYihK6v99xrxjv5c9hdZxxYTZPwwVnlhO1h8AiAbEO0LAFPEdNazY+INADatWKZauc+SoJF8Xj0ZV23sDpdK8wOClG8BGC3EnGai8YzoebfVZFQuc9+CWLiTiJ8EMNA0DmO61rO4rb+396840LGA/2Re11uufgNgsImIORCPmbnsARmBtuPuY+DZFj5fmbq2vGmRCfufbSxgy/EmKN7TJPMUK9hRuFT7MYqqGae6jYAPCXyZ35+BZwq69nSUuLEmrVJp/mZByqdNEv+UgTqs62RFFeX5zczNbVAWMyfAuNIfhwRtjfo8R+5w0XEnznXhupViCPR3rWfx2r7166fjwC77zsy6g4rABIBeX7wPTF3bGSVHJGB7dmGEhfhs1XBj3F0wtHeiCGnlYzuVvQw66LvPNeLBKEtVJGDLcd9ctbkgnDJz2lCSsMuxLMf1RswVDbEZL5iG1vRlpJ2GqMDeOnq5L/C9pq55hUj8skruEyCMNz4+mMjr2vWyyaSBHaeyuQb61ZeoWquqff39NCsrIIy9bc9vYkWZ9NkKJ6f2DhBVwsRYtpEGLpbcu4jwtm+yOprX1VtlEsvaWo77M4AtDX6kDJu5nuMysaSBrVJ1FMSHViZh4LWCrt0vk1jW1nLc9wHc0ZCXsatgaA3FD4obAXj18wTGAdPQHg9KFud+0akeJPDexkLzowU9+6JMXGngouOOEdCw02Fgf0HXvPff1K6k8naBg1qUVKWD8vjvJ5W32+GgyidV6aA83Q4nNFl2h3TQUOsOae8w7kJdh217fiMryjH/UexaAddPQIUYyefXTQWNTOmXhzosKcdB8I5WGy+m3aahHg6bNIpdsz18PQ5jmlhsDwsdatKqv55llM+bnS+dr7I6lM9TKQpIWJ/6V41M9fumGghnqCaGw0AHArfvrFx1w8K1sktCS1vgpW9F37X4fHKWRH0o/REXRMZ/6TDAewduPPI5H2SyVlWvaXcQ0RbYcip7API+jvme2c521p8+YD4ZNQ31SKsitgVutubKThIy3ZOxbQUdtGJIAwcFlBEd1zbKJkgaGMzHmGjVmXRc8VH8ifkmEI2s9A1qiDxwFGUd9OkC+4odNEs/CNDLHWxQAqn4IVPPrl5ZliIHrMP1A/DfAFySgJJOhFgkITa32xuE2mmJTOYWMK/6bNkJgtA5iM4otdrRoO1lIHDohP8Twy5wko2yHNf7/2OrZMyTpq7J+oROkWqH7XJlJzO9F1pN3ZBvN/Ws979XKleqwJ5iy6kcAmg0nHo+bOrZ3eFso1mlDuzJskuVV5nogbYSiY+YuWzIwkSD9bw6Auwl8n5FUsBPMXAVLb3LEjAtGD9kQOOGoX4dHSO8Z8eAw0tK17ILnG591z56t8Nr34N0FfwLURhGWw9vCNYAAAAASUVORK5CYII="
            />
          </div>
          <div>
            {/* <button className="text-white" onClick={() => setMedirLona(!medirLona)}>Empezo a llover</button> */}
            <h1>Empezo a llover</h1>
          </div>
        </div>
      </div>

      <div className="carta1">
        <div className={`card4 ${darkMode ? "dark" : ""}`}>
          <h1>Clima ahora</h1>
          <div style={{ display: "flex" }}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
                textAlign: "center",
              }}
            >
              <h2>Humedad</h2>
              <h2>Colgada a las 07:10 am</h2>
            </div>
            <div
              style={{ marginLeft: "60px", width: "130px", marginTop: "-12px" }}
            >
              <img
                alt=""
                src="data:image/png;base64,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"
              />
            </div>
          </div>
        </div>

        <div className={`card5 ${darkMode ? "dark" : ""}`}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "35px",
              }}
            >
              <h1>1:30 hrs</h1>
              <h2>Colgada a las 07:10 am</h2>
            </div>
            <div style={{ marginLeft: "60px", marginTop: "15px" }}>
              <img
                alt=""
                src="data:image/png;base64,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"
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`card6 ${darkMode ? "dark" : ""}`}>
        <div style={{ display: "flex", marginTop: "30px", marginLeft: "0px" }}>
          <div className="mx-auto">
            <h2>Domingo</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Lunes</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Martes</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Miercoles</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Jueves</h2>
            <img
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAABaZJREFUeF7tWlnIVlUUXQt6yLKI5kgMm2yQZsgGG6gegopeKgrTsoRKyGiwIiqKkEwKksgGIymj8UHpIQmKtGikIppQmkfDbLIJClZ31wni8557z3Dv9yWcDT//w7ens+4+Zw/nEIUaEWDBpxmBAlBLhBSACkB5h0iJoBJBJYLyECgRlIdfOYNKBJUIykOgRFAefuUMKhG0EUaQpC0BHA9gfwCTAOwCYDv3NwbANwB+APAdgBcBPErytbylpkkPdYtJGlct/BIAFwDYPNLlzysg7wewkOSaSNlk9qEAJGkCgGsBnA1gk2Rv/xH8A8AjFcDzSb6dqatVvHeAJM0DMKfVkzSGBSRnp4mGSfUGkKRNATwO4KQwV5K5XgVwGsnPkjU0CPYCkDuEnwJweB9O1+j8HsBxJN/s2l7nAEnaCsAzAA4KcHZllc1ecJnqYwAWBX8C2BHA9gAOdufWYQG61toHIflBAG8wSx8AWVpuW9ANABaR/CLEU0m7ArgUwKwW/k8dSF+F6A3h6RQgSdcBsMX76CUA01K/sqQdANwG4KwGGy+TbPtAIdj8zdMZQJIOAdBUzM0jeVWwZw2Mkm6q0v01DSxXkrylC1tdAvQsgGM9Ts0hOb8Lh//VIeliALc36NyX5Hu5NjsBSNIR7rCt82cJSSsQOydJVnze6FG8jOSpuUazAZI0EcASALbFBsl6qj1Irs911Ccv6UEAUz2/jydpLUoyJQMk6RgA1wOw/z6aTvKBZO8CBCXtDMCXDW8meXWAGi9LNECu4bwVwOkthteQ3CnHuVBZSXd4SoB1JLcN1VPHFwWQJBtRWKO4TYDRuSSbMk2AijAWSeMBWA1URweQfCtM04ZcwQBJmgHgvghDnWSRUHuSXvdU77NI3hmqZ5AvCCBJZ7jICbHzE4CVJE8OYe6KR5JFq9VHg/QwyabCstGFVoAk7VN1y++2LORbV5MsJflOV4uO0SPphKrNeLpGxjLoXNfamJ9RFALQGwAO9Gi1LtrqkLuqKvn3KMsdM0vau0ocbYXhYwCsorc1BVEjQJLOB3CvR9PXAA7NrTOCvAxgciOWHwNYbSJp86NlAbzNvZikVQD2rFH0m40iSL4fYmRYPJIUYcuaZisy084gSUdWQ6jnPdJTST7UpnzYv0cCZO61rsO7xSTZ2MLGF4Nk+3wSyZivNRSsEgCya6UJJC3z1lITQM8BOLpGKquuGApSzogbtF1e3bNd2GC3sR1pAsgqU6tQB2k3kh8Nc6G5tiTtB2A5AF/rM47kl3V2mgDybaExo07pKYBJOqqaV63wyM4muSAWINuXW9QIjSX5S4qTo5aRZImlrqq+u7qttdveDagpgnwpfmJVuq8e9WJT7EuyiadNPgdpBcnasU3KIT2T5KIUB0ctI2lrAOtq/FhbNbR2zRQVQTb0vqJGZjnJE0e92BT7ksYCqJturidpL06iALKrE7vjqqMpJO3Cb6MiSZMB2NXTIK0iuVcUQMZc9WI2yrSR5iB9WKXNySSju+NRIippMYDpMbuirVm1Ist3XWMdsd2H20On/z1JmmJzKo+j8WneRdBmAD5xL7/qdFvbMaM6k175PyMkyV6y2ayo9iC2F26+1yEh86CZAO5pAcC+zFJ3N7aaZMjYoXdMJdkkwnaBrcFHi0me6/uxFSAXSX0+guodqAYDv1Z3eruTtNlWLQUB5ECy2ue8Ua6mB9unkHyySW8wQA6ktkcDPayhN5UXkVzYpj0KIAfSOS6zZV3ItTnW4+82DT2zk5Grz0n3/tAOvsvcG+ce19OpaosYu9AMerhllqMjaNBdN5qd5i7t/vsYvNOVJSj7ucpeNuOxxvqJ6mbGXntEZ9dsgBIc36hECkAtn6sAVADK29ElgkoElQjKQ6BEUB5+5QwqEVQiKA+BEkF5+JUzqERQiaA8BFqk/wJWo5JY9tMqMgAAAABJRU5ErkJggg=="
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Viernes</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
          <div className="mx-auto">
            <h2>Sabado</h2>
            <img
              alt=""
              src="data:image/png;base64,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"
            />
            <p style={{ marginLeft: "18px", color: "white", fontSize: "18px" }}>
              31°C
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
