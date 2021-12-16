// Include Libraries
#include "Arduino.h"
#include "HX711.h"
#include "Ethernet.h"
#include "SPI.h"
#include "PubSubClient.h"
#include "SRAM.h"
#include "RFID.h"

// Pin Definitions
#define SCALE_PIN_DAT 3
#define SCALE_PIN_CLK 2

#define RFID_PIN_RST 4
#define RFID_PIN_SDA 5

// object initialization
HX711 scale(SCALE_PIN_DAT, SCALE_PIN_CLK);
EthernetClient ethClient;
RFID rfid(RFID_PIN_SDA, RFID_PIN_RST);

const int timeout = 10000;
const int calibration_factor = 32600;

uint8_t mac[6] = {0x00, 0x01, 0x02, 0x03, 0x04, 0x06};

// MQTT server
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
        //Serial.println(F("Unable to configure Ethernet using DHCP"));
        for (;;)
            ;
    }

    if (client.connect("arduinoClient"))
    {
        client.publish("outTopic", "hello world");
        client.subscribe("inTopic");
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

    // RFID
    rfid.init();
}

void loop()
{
    float scaleUnits = scale.get_units();
    Serial.print(scaleUnits);
    Serial.println(" Kg");

    delay(100);

    constexpr size_t BUFFER_SIZE = 7; //1 char for the sign, 1 char for the decimal dot, 4 chars for the value & 1 char for null termination
    char buffer[BUFFER_SIZE];
    dtostrf(scaleUnits, BUFFER_SIZE - 1 /*width, including the decimal dot and minus sign*/, 2 /*precision*/, buffer);
    client.publish("home/catbert/currentWeight", buffer, BUFFER_SIZE); //notice we're using the overload where you specify the length of the buffer, as we know it and it saves a call to strlen
    client.loop();

    String rfidtag = rfid.readTag();
    rfid.printTag(rfidtag);
}