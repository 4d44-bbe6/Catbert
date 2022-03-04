/*
    This program is part of the Catbert project.
    Author: Jeroen van der Schaaf
*/

// Include libraries
#include "Arduino.h"
#include "HX711.h"
#include "LiquidCrystal595.h"
#include "Ethernet.h"
#include "SPI.h"
#include "PubSubClient.h"
#include "SRAM.h"
#include "RFID.h"

// Pin definitions

#define SCALE_PIN_DAT A1
#define SCALE_PIN_CLK A2

#define RFID_PIN_RST 2
#define RFID_PIN_SDA 3

// Object initialization
EthernetClient ethClient;
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);
LiquidCrystal595 lcd(7, 8, 9);
HX711 scale(SCALE_PIN_DAT, SCALE_PIN_CLK);

// Timing
static const unsigned long REFRESH_INTERVAL = 500;
static unsigned long lastReconnectAttempt = 0;
static unsigned long lastDataSent = 0;

// Scale variables
const int timeout = 1000;
const int calibration_factor = 1265;
const float minimum_weight_treshold = 0.05;

float prevWeight = 0.00;

// MQTT variables
constexpr size_t BUFFER_SIZE = 7; // 1 char for the sign, 1 char for the decimal dot, 4 chars for the value & 1 char for null termination
char buffer[BUFFER_SIZE];
PubSubClient client(ethClient);

// RFID variables
char rfid_buffer[100];
String rfidtag;
String newRfidtag;

// Ethernet variables
uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x06};
IPAddress mqtt_server(192, 168, 178, 10);

// Misc variables
String scaleName = "Catbert-001";

/**
 * Get current weight of HX711 Scale
 */
float getWeight()
{
    float scaleUnits = scale.get_units(5);
    if (scaleUnits < 0.00)
    {
        scaleUnits = 0.00;
    }

    lcd.setCursor(0, 0);
    lcd.print(String(scaleUnits) + " g     ");

    return scaleUnits;
}
/**
 * @brief Publish the current weight to the MQTT Broker.
 * If the weight didn't change more then 5 grams, it's not published.
 * If the last published weight is newer then the current REFRESH_INTERVAL, it's not published.
 *
 * @param weight
 */
void publishWeight(float weight)
{
    // limit the data with an interval
    if (millis() - lastDataSent > REFRESH_INTERVAL)
    {
        // Only sent weight to mqtt when there is atleast a difference of 5g
        if (weight - prevWeight > 5.00 || prevWeight - weight > 5.00)
        {
            Serial.print("CurrentWeight: ");
            Serial.print(weight);
            Serial.print("             ");
            Serial.print("Previous weight: ");
            Serial.print(prevWeight);
            Serial.println();

            dtostrf(weight, BUFFER_SIZE - 1 /*width, including the decimal dot and minus sign*/, 2 /*precision*/, buffer);
            client.publish("home/catbert/scales/Scale001/currentWeight", buffer, BUFFER_SIZE);
            lastDataSent = millis();
            prevWeight = weight;
        }
    }
}

String getRFID()
{
    if (rfid.readTag() != "None")
    {
        rfidtag = rfid.readTag();
        rfid.printTag(rfidtag);
        Serial.println(rfidtag);
        lcd.setCursor(0, 1);
        lcd.print("RFID: " + rfidtag);
    }
    else
    {
        rfidtag = "None";
    }

    return rfidtag;
}

void publishRFID(String rfidtag)
{
    if (millis() - lastDataSent > 5000 && rfidtag != "None")
    {
        rfidtag.toCharArray(rfid_buffer, rfidtag.length() + 1);
        client.publish("home/catbert/scales/Scale001/currentRFID", rfid_buffer);
        lastDataSent = 0;
    }
}

void callback(char *topic, byte *message, unsigned int length)
{
    Serial.print("Message arrived on topic: ");
    Serial.print(topic);
    Serial.print(". Message: ");
    String messageTemp;

    for (int i = 0; i < length; i++)
    {
        Serial.print((char)message[i]);
        messageTemp += (char)message[i];
    }
    Serial.println();

    if (String(topic) == "home/catbert/scales/Scale001/command")
    {
        lcd.clear();
        lcd.setCursor(0, 1);

        Serial.println("Receiving new command");
        if (messageTemp == "registerNewCat")
        {

            Serial.println("Register-mode");
            lcd.print("Register-mode");
            delay(3000);
            lcd.clear();
        }
    }
}

boolean reconnect()
{

    while (!client.connected())
    {
        Serial.println("Connecting to MQTT");
        if (client.connect("client"))
        {
            Serial.println("Connected");
            client.subscribe("home/catbert/scales/Scale001/command");
        }
        else
        {
            Serial.print("Failed: ");
            Serial.print(client.state());
            Serial.println("Trying again in 5 seconds");
            delay(5000);
        }
    }

    if (client.connect("client"))
    {
        client.publish("home/catbert/scales/Scale001/status", "\"online\"");
    }
    return client.connected();
}

void setup()
{
    Serial.begin(9600);
    Serial.println("Starting..");

    // Ethernet
    if (Ethernet.begin(mac) == 0)
    {
        Serial.println(F("Unable to configure Ethernet using DHCP"));
        for (;;)
            ;
    }

    Serial.println(F("Ethernet configured via DHCP"));
    Serial.print("IP address: ");
    Serial.println(Ethernet.localIP());

    // Scale
    scale.set_scale(calibration_factor);
    scale.tare();

    // RFID
    rfid.init();

    // LCD
    lcd.begin(16, 2); // 16 characters, 2 rows
    lcd.setCursor(0, 0);
    lcd.print("IP: " + Ethernet.localIP());
    delay(500); // Delaying to show IP
    lcd.clear();

    client.setServer(mqtt_server, 1883);
    client.setCallback(callback);
    client.setKeepAlive(1000);

    Serial.println("Setup done");
}

void loop()
{

    if (!client.connected())
    {
        reconnect();
    }

    client.loop();

    double currentWeight = getWeight();
    publishWeight(currentWeight);
    String currentRFID = getRFID();
    publishRFID(currentRFID);
    delay(500);
}
