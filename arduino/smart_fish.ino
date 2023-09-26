#include <WiFi.h>
#include <ESP32Servo.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
const int servo = 2;
const int trig = 14;
const int echo = 15;

Servo servo1;

WiFiClient wiFiClient;
PubSubClient client(wiFiClient);
long lastMsg = 0;

// WiFi
// const char *ssid = "diogo"; 
// const char *password = "espm6639";  

const char *ssid = "Avila_2G"; 
const char *password = "fi150400";  

// RabbitMQ
const char* rabbitMQUsername = "yapacich:yapacich";
const char* rabbitMQPassword = "pXgPlEQ4LD2hd5Doj-cEDNDOPULjw15I";
const char* rabbitMQServer = "sparrow.rmq.cloudamqp.com";
const int rabbitMQPort = 1883;


const char* registryEsp = "REGISTRY_ESP";
const char* statusEsp = "STATUS_ESP";


String macEsp;

void setup() 
{
  pinMode(trig, OUTPUT);
  pinMode(echo, INPUT);
  servo1.attach(servo);

  
  // Connecting to a Wi-Fi network
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  //  Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Conectado ao wifi.");

  client.setServer(rabbitMQServer, rabbitMQPort);
  client.setCallback(callback);  
}

void callback(char* topic, byte* payload, unsigned int length) {  
  String json = ""; 
  StaticJsonDocument<256> doc;  
  
  for (int i = 0; i < length; i++) {
    json += (char)payload[i]; 
  }
  Serial.println(json);
  
  deserializeJson(doc, json); 

  boolean active = doc["active"];
  int angle = doc["angle"];
  int time = doc["time"];

  if (doc["active"]) {
    servo1.write(angle);   

    unsigned long startTime = millis();
    while (millis() - startTime < time) {
      client.loop(); 
    }

    servo1.write(0);
  } else {
    servo1.write(0);
  }
}

void reconnect() {  
  
  while (!client.connected()) {
    Serial.print("conectando ao rabbitmq...");  

    macEsp = WiFi.macAddress(); 
  
    String clientId = macEsp; 
    
    if (client.connect(clientId.c_str(), rabbitMQUsername, rabbitMQPassword)) {
      Serial.println("connected");  

      macEsp = WiFi.macAddress(); 
           
      StaticJsonDocument<200> doc;  

      Serial.println(macEsp.c_str()); 
      
      
      doc["identifier"] = macEsp.c_str();
      doc["active"] = false;
      doc["angle"] = 0;
      doc["time"] = 0;

      String json;  
      serializeJson(doc, json); 

      client.publish(statusEsp, (char*)json.c_str()); 
      client.subscribe(macEsp.c_str());   
    } else {
      Serial.print("Falha ao conectar");  
      Serial.print(client.state()); 
      delay(5000);  
    }
  }
}

void loop(void)
{
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 30000) {
    lastMsg = now;   

    macEsp = WiFi.macAddress(); 
    
    StaticJsonDocument<200> doc;

    doc["identifier"] = macEsp.c_str();
    doc["temp"] = 40;
    doc["ph"] = 7;
    doc["water_level"] = 3;
    doc["turbidity"] = 1.4;

    String json;
    serializeJson(doc, json);

    Serial.print(json);
    client.publish(registryEsp, (char*)json.c_str());

    int position = servo1.read();
  }

  /*
  digitalWrite(trig, LOW);
  delayMicroseconds(2);
  digitalWrite(trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(trig, LOW);
 
  int retorno = pulseIn(echo, HIGH);
  
  int distancia = retorno/58.2;
  Serial.print("distancia = ");
  Serial.println(distancia);

  if (distancia <= 60)
  {
    servo1.write(90);
  }
  else
  {
    servo1.write(0);
  }
  */
}
