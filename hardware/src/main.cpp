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

#define SCALE_PIN_DAT A2
#define SCALE_PIN_CLK A1

#define RFID_PIN_RST 6
#define RFID_PIN_SDA 5

// Object initialization
// EthernetClient ethClient;
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);
LiquidCrystal595 lcd(7, 8, 9);
HX711 scale(SCALE_PIN_DAT, SCALE_PIN_CLK);

// Timing
static const unsigned long REFRESH_INTERVAL = 5000;
static unsigned long lastReconnectAttempt = 0;
static unsigned long lastDataSent = 0;

// Scale variables
const int timeout = 10000;
const int calibration_factor = 1265;
const float minimum_weight_treshold = 0.05;

float prevWeight = 0.00;

// MQTT variables
constexpr size_t BUFFER_SIZE = 7; // 1 char for the sign, 1 char for the decimal dot, 4 chars for the value & 1 char for null termination
char buffer[BUFFER_SIZE];
// PubSubClient client(ethClient);

// RFID variables
char rfid_buffer[100];
String rfidtag = "";
String prevrfidTag = "";

// Ethernet variables
// uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x06};
// IPAddress mqtt_server(192, 168, 178, 10);

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
    if (millis() - lastDataSent > REFRESH_INTERVAL)
    {
        Serial.print("CurrentWeight: ");
        Serial.print(weight);
        Serial.print("             ");
        Serial.print("Previous weight: ");
        Serial.print(prevWeight);
        Serial.println();

        // Only sent weight to mqtt when there is atleast a difference of 5g
        if (weight - prevWeight > 5.00 || prevWeight - weight > 5.00)
        {
            dtostrf(weight, BUFFER_SIZE - 1 /*width, including the decimal dot and minus sign*/, 2 /*precision*/, buffer);
            // client.publish("home/catbert/scales/Scale001/currentWeight", buffer, BUFFER_SIZE);
            lastDataSent = millis();
            prevWeight = weight;
        }
    }
}

void publishRFID()
{

    if (rfid.isCard())
    {
        rfidtag = rfid.readTag();
        rfid.printTag(rfidtag);
        lcd.setCursor(0, 0);
        lcd.print("Huidige RFID:");
        lcd.setCursor(0, 1);
        lcd.print(rfidtag);
        if (millis() - lastDataSent > 5000)
        {
            rfidtag.toCharArray(rfid_buffer, 11);
            // client.publish("home/catbert/scales/Scale001/currentRFID", rfid_buffer);
            lastDataSent = 0;
        }
    }
}

// boolean connect()
// {
//     Serial.println("Connecting to MQTT");
//     if (client.connect("client"))
//     {
//         client.publish("home/catbert/scales/Scale001/status", "\"online\"");
//     }
//     return client.connected();
// }

void setup()
{
    Serial.begin(9600);
    Serial.println("Starting..");

    // Ethernet
    // if (Ethernet.begin(mac) == 0)
    // {
    //     Serial.println(F("Unable to configure Ethernet using DHCP"));
    //     for (;;)
    //         ;
    // }

    // if (!client.connected())
    // {
    //     if (connect())
    //     {
    //         lastReconnectAttempt = 0;
    //     }
    // }

    // Serial.println(F("Ethernet configured via DHCP"));
    // Serial.print("IP address: ");
    // Serial.println(Ethernet.localIP());

    // Cleanup any previous commands

    // Scale
    // scale.set_scale(calibration_factor);
    // scale.tare();

    // RFID
    rfid.init();

    // LCD
    lcd.begin(16, 2); // 16 characters, 2 rows
    lcd.setCursor(0, 0);
    lcd.print("IP: " + Ethernet.localIP());

    // client.setServer(mqtt_server, 1883);

    Serial.println("Setup done");
}

void loop()
{

    // if (!client.connected())
    // {
    //     Serial.println("MQTT not connected!");

    //     if (millis() - lastReconnectAttempt > REFRESH_INTERVAL)
    //     {

    //         if (connect())
    //         {
    //             lastReconnectAttempt += REFRESH_INTERVAL;
    //         }
    //     }
    // }
    // else
    // {
    // client.loop();

    // double currentWeight = getWeight();
    //  publishWeight(currentWeight);

    publishRFID();

    // Subscribe to command topic to check if there are tasks to be done.

    // client.setKeepAlive(1000);
    // }

    delay(500);
}
