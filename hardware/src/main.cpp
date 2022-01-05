// Include Libraries
#include "Arduino.h"
#include "HX711.h"
#include "LiquidCrystal595.h"
#include "Ethernet.h"
#include "SPI.h"
#include "PubSubClient.h"
#include "SRAM.h"
#include "RFID.h"

// Pin Definitions

#define SCALE_PIN_DAT A2
#define SCALE_PIN_CLK A1

#define RFID_PIN_RST 6
#define RFID_PIN_SDA 5

// object initialization
HX711 scale(SCALE_PIN_DAT, SCALE_PIN_CLK);
EthernetClient ethClient;
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);
LiquidCrystal595 lcd(7, 8, 9);

const int timeout = 10000;
const int calibration_factor = 32600;
const float minimum_weight_treshold = 0.05;

float currentWeight = 0.00;
constexpr size_t BUFFER_SIZE = 7; //1 char for the sign, 1 char for the decimal dot, 4 chars for the value & 1 char for null termination
char buffer[BUFFER_SIZE];
char rfid_buffer[100];

uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x06};

// // MQTT server
IPAddress server(192, 168, 178, 10);

SRAM sram(4, SRAM_1024);

void callback(char *topic, byte *payload, unsigned int length)
{
    sram.seek(1);

    // do something with the message
    for (uint8_t i = 0; i < length; i++)
    {
        Serial.write(sram.read());
    }
    Serial.println();

    // Reset position for the next message to be stored
    sram.seek(1);
}

PubSubClient client(server, 1883, callback, ethClient, sram);

void setup()
{
    Serial.begin(9600);
    Serial.println("Starting..");

    // Ethernet
    if (Ethernet.begin(mac) == 0)
    {
        // Serial.println(F("Unable to configure Ethernet using DHCP"));
        for (;;)
            ;
    }

    if (client.connect("arduinoClient"))
    {
        Serial.println("Connected with MQTT Broker");
    }

    sram.begin();
    sram.seek(1);

    Serial.println(F("Ethernet configured via DHCP"));
    Serial.print("IP address: ");
    Serial.println(Ethernet.localIP());
    Serial.println();

    // Scale
    scale.set_scale(calibration_factor);
    scale.tare();

    // // RFID
    rfid.init();

    // LCD
    lcd.begin(16, 2); // 16 characters, 2 rows
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("IP: " + Ethernet.localIP());
    delay(1000);
}

void loop()
{

    client.loop();
    float scaleUnits = scale.get_units();
    String rfidUid = "";
    Serial.println(scaleUnits);
    if ((currentWeight - scaleUnits) < -minimum_weight_treshold || (currentWeight - scaleUnits > minimum_weight_treshold))
    {
        Serial.print(scaleUnits);
        Serial.println(" Kg");
        currentWeight = scaleUnits;

        dtostrf(currentWeight, BUFFER_SIZE - 1 /*width, including the decimal dot and minus sign*/, 2 /*precision*/, buffer);
        client.publish("home/catbert/currentWeight", buffer, BUFFER_SIZE);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print(scaleUnits);
    }

    String rfidtag = rfid.readTag();

    rfid.printTag(rfidtag);
    if (rfidtag != "None")
    {
        Serial.println(rfidtag);
        rfidtag.toCharArray(rfid_buffer, 11);
        // dtostrf(rfidtag, BUFFER_SIZE - 1 /*width, including the decimal dot and minus sign*/, 2 /*precision*/, buffer);
        // client.publish("home/catbert/currentRDIF", String.toCharArray(rfidtag), BUFFER_SIZE);
        // client.publish("home/catbert/currentRFID", rfid_buffer);

        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Huidige RFID:");
        lcd.setCursor(0, 1);
        lcd.print(rfidtag);
    }

    delay(100);
}