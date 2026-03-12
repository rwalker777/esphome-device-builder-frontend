/**
 * Mock data used while the real API is not yet available.
 * Replace these exports with real API calls when ready.
 */

// ─── Components ──────────────────────────────────────────────────────────────

export type ComponentCategory =
  | "sensor"
  | "binary_sensor"
  | "switch"
  | "light"
  | "button"
  | "fan"
  | "climate"
  | "display"
  | "cover"
  | "number"
  | "text_sensor";

export interface MockComponent {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  imageUrl: string | null;
  tags: string[];
  docsUrl: string;
}

export const MOCK_COMPONENTS: MockComponent[] = [
  {
    id: "analog_threshold",
    name: "Analog Threshold",
    description:
      "Convert an analog sensor value into a binary on/off state based on a configurable threshold.",
    category: "binary_sensor",
    imageUrl: "/assets/board/component1.svg",
    tags: ["analog", "threshold"],
    docsUrl: "https://esphome.io/components/binary_sensor/analog_threshold.html",
  },
  {
    id: "dht",
    name: "DHT Temperature & Humidity",
    description:
      "Read temperature and humidity from DHT11, DHT22, AM2302 sensors via a single-wire protocol.",
    category: "sensor",
    imageUrl: "/assets/board/component2.svg",
    tags: ["temperature", "humidity", "dht"],
    docsUrl: "https://esphome.io/components/sensor/dht.html",
  },
  {
    id: "gpio_binary_sensor",
    name: "GPIO Binary Sensor",
    description:
      "Monitor a digital GPIO pin as a binary sensor. Ideal for buttons, switches, and door/window contacts.",
    category: "binary_sensor",
    imageUrl: "/assets/board/component3.svg",
    tags: ["gpio", "button", "door"],
    docsUrl: "https://esphome.io/components/binary_sensor/gpio.html",
  },
  {
    id: "gpio_switch",
    name: "GPIO Switch",
    description:
      "Control a digital GPIO output as a switch. Commonly used to drive relays, LEDs, or other actuators.",
    category: "switch",
    imageUrl: null,
    tags: ["gpio", "relay"],
    docsUrl: "https://esphome.io/components/switch/gpio.html",
  },
  {
    id: "adc",
    name: "ADC Sensor",
    description:
      "Read the voltage on a GPIO pin using the built-in Analog-to-Digital Converter.",
    category: "sensor",
    imageUrl: null,
    tags: ["analog", "adc", "voltage"],
    docsUrl: "https://esphome.io/components/sensor/adc.html",
  },
  {
    id: "binary_light",
    name: "Binary Light",
    description: "Control a simple on/off light connected to a GPIO pin.",
    category: "light",
    imageUrl: null,
    tags: ["gpio", "led"],
    docsUrl: "https://esphome.io/components/light/binary.html",
  },
  {
    id: "gpio_button",
    name: "GPIO Button",
    description:
      "Momentary button component backed by a GPIO pin, with configurable press and release events.",
    category: "button",
    imageUrl: null,
    tags: ["gpio", "momentary"],
    docsUrl: "https://esphome.io/components/button/gpio.html",
  },
  {
    id: "speed_fan",
    name: "Speed Fan",
    description: "Control a variable-speed fan using a PWM or GPIO output.",
    category: "fan",
    imageUrl: null,
    tags: ["pwm", "gpio"],
    docsUrl: "https://esphome.io/components/fan/speed.html",
  },
  {
    id: "thermostat",
    name: "Thermostat",
    description:
      "Full thermostat controller with heating, cooling, and fan modes, using temperature sensor feedback.",
    category: "climate",
    imageUrl: null,
    tags: ["thermostat", "hvac", "temperature"],
    docsUrl: "https://esphome.io/components/climate/thermostat.html",
  },
  {
    id: "template_cover",
    name: "Template Cover",
    description:
      "Create a cover (blinds, shutter, garage door) using template expressions and custom actions.",
    category: "cover",
    imageUrl: null,
    tags: ["template", "blinds", "garage"],
    docsUrl: "https://esphome.io/components/cover/template.html",
  },
  {
    id: "bme280",
    name: "BME280",
    description:
      "Read temperature, humidity, and pressure from the popular BME280 environmental sensor over I²C or SPI.",
    category: "sensor",
    imageUrl: null,
    tags: ["i2c", "spi", "temperature", "humidity", "pressure"],
    docsUrl: "https://esphome.io/components/sensor/bme280.html",
  },
  {
    id: "ssd1306",
    name: "SSD1306 OLED Display",
    description:
      "Drive a small OLED display (128×64 or 128×32) over I²C or SPI using the SSD1306 controller.",
    category: "display",
    imageUrl: null,
    tags: ["i2c", "spi", "oled"],
    docsUrl: "https://esphome.io/components/display/ssd1306_i2c.html",
  },
  {
    id: "rotary_encoder",
    name: "Rotary Encoder",
    description:
      "Track the position and direction of a rotary encoder knob connected to two GPIO pins.",
    category: "sensor",
    imageUrl: null,
    tags: ["gpio", "encoder", "rotary"],
    docsUrl: "https://esphome.io/components/sensor/rotary_encoder.html",
  },
  {
    id: "monochromatic_light",
    name: "Monochromatic Light",
    description:
      "Control a single-color LED or light strip with brightness via a PWM output.",
    category: "light",
    imageUrl: null,
    tags: ["pwm", "led", "dimmer"],
    docsUrl: "https://esphome.io/components/light/monochromatic.html",
  },
  {
    id: "template_number",
    name: "Template Number",
    description:
      "Expose a numeric value that can be set from Home Assistant and used in automations.",
    category: "number",
    imageUrl: null,
    tags: ["template", "slider"],
    docsUrl: "https://esphome.io/components/number/template.html",
  },
];

// ─── Devices ─────────────────────────────────────────────────────────────────

export interface MockDevice {
  name: string;
  configuration: string;
  online: boolean;
  boardId: string;
}

export const MOCK_DEVICES: MockDevice[] = [
  { name: "Living Room Sensor", configuration: "living-room-sensor.yaml", online: true, boardId: "apollo-esp32-c6" },
  { name: "Bedroom Light Controller", configuration: "bedroom-light.yaml", online: true, boardId: "esp32-s3-devkitc-1" },
  { name: "Kitchen Motion Sensor", configuration: "kitchen-motion.yaml", online: false, boardId: "esp32-devkitc" },
  { name: "Garage Door Opener", configuration: "garage-door.yaml", online: true, boardId: "esp8266-nodemcu" },
  { name: "Office Air Quality", configuration: "office-air-quality.yaml", online: true, boardId: "seeed-xiao-esp32c3" },
  { name: "Hallway Presence", configuration: "hallway-presence.yaml", online: false, boardId: "esp32-c6-devkitc-1" },
  { name: "Basement Humidity", configuration: "basement-humidity.yaml", online: true, boardId: "rpi-pico-w" },
  { name: "Front Door Bell", configuration: "front-door-bell.yaml", online: false, boardId: "m5stack-atom-lite" },
];

// ─── Boards ──────────────────────────────────────────────────────────────────

export type Tag =
  | "esp32-c6"
  | "esp32-s3"
  | "esp32-s2"
  | "esp32"
  | "esp8266"
  | "rp2040"
  | "starter-kit"
  | "apollo-automation"
  | "wifi"
  | "bluetooth"
  | "zigbee"
  | "thread"
  | "matter"
  | "usb"
  | "low-power"
  | "dev-kit";

export interface MockBoard {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  docsUrl: string;
  /** For kit-style boards: what's in the box. Shown instead of description. */
  contents?: string[];
}

export const MOCK_BOARDS: MockBoard[] = [
  {
    id: "apollo-esp32-c6",
    name: "ESPHome Starter Kit (esp32-c6)",
    description:
      "The board that ships with the Apollo Automation starter kits. This board is the esp32-c6 board and is the same board that comes with the button, buzzer, temperature and PIR (motion) sensor kits.",
    tags: ["esp32-c6", "starter-kit", "apollo-automation"],
    docsUrl: "https://esphome.io/components/esp32.html",
    contents: [
      "1 x ESP32-C6 board",
      "1 x on board LED",
      "2 x FPC cables",
      "1 x Button",
      "1 x PIR Motion sensor",
      "1 x LED/Buzzer",
      "1 x Temperature/Humidity Sensor",
    ],
  },
  {
    id: "esp32-s3-devkitc-1",
    name: "ESP32-S3 DevKitC-1",
    description:
      "Espressif's official development board for the ESP32-S3, featuring dual-core Xtensa LX7, native USB, and abundant GPIO. Great for AI and vision projects.",
    tags: ["esp32-s3", "wifi", "bluetooth", "usb"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp32-devkitc",
    name: "ESP32 DevKitC",
    description:
      "The classic ESP32 development board. Dual-core Xtensa LX6, Wi-Fi, Bluetooth, and a large ecosystem of community projects and libraries.",
    tags: ["esp32", "wifi", "bluetooth"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp32-s2-saola-1",
    name: "ESP32-S2 Saola-1",
    description:
      "Single-core ESP32-S2 with native USB support. Ideal for USB HID projects and battery-powered sensors requiring low power consumption.",
    tags: ["esp32-s2", "wifi", "usb", "low-power"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp8266-nodemcu",
    name: "NodeMCU ESP8266",
    description:
      "The iconic ESP8266-based board that started the maker IoT revolution. Wi-Fi only, single-core, and perfect for simple automations.",
    tags: ["esp8266", "wifi"],
    docsUrl: "https://esphome.io/components/esp8266.html",
  },
  {
    id: "esp8266-d1-mini",
    name: "Wemos D1 Mini",
    description:
      "Compact ESP8266 board in a small form factor, popular for embedding into enclosures and custom PCBs. Great community support.",
    tags: ["esp8266", "wifi"],
    docsUrl: "https://esphome.io/components/esp8266.html",
  },
  {
    id: "rpi-pico-w",
    name: "Raspberry Pi Pico W",
    description:
      "RP2040-based board with Wi-Fi. Dual-core ARM Cortex-M0+, programmable I/O, and a large number of GPIO pins at a very low cost.",
    tags: ["rp2040", "wifi"],
    docsUrl: "https://esphome.io/components/rp2040.html",
  },
  {
    id: "esp32-c3-mini",
    name: "ESP32-C3 Mini",
    description:
      "Compact RISC-V based board with Wi-Fi and Bluetooth LE. Low power consumption, small form factor, and great for embedded projects.",
    tags: ["esp32", "wifi", "bluetooth", "low-power"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp32-s3-zero",
    name: "Waveshare ESP32-S3 Zero",
    description:
      "Ultra-compact ESP32-S3 board with a tiny footprint, USB-C, and native USB. Excellent choice for space-constrained builds.",
    tags: ["esp32-s3", "wifi", "bluetooth", "usb", "low-power"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp32-c6-devkitc-1",
    name: "ESP32-C6 DevKitC-1",
    description:
      "Espressif's official ESP32-C6 dev board with Wi-Fi 6, Bluetooth 5, Zigbee, and Thread/Matter support. The successor to the C3 for smart home projects.",
    tags: ["esp32-c6", "wifi", "bluetooth", "zigbee", "thread", "matter"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "esp32-s3-box-3",
    name: "ESP32-S3-BOX-3",
    description:
      "Espressif's all-in-one development kit with a touchscreen display, microphone, speaker, and camera connector. Designed for voice-assistant and display projects.",
    tags: ["esp32-s3", "wifi", "bluetooth", "usb"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "m5stack-atom-lite",
    name: "M5Stack ATOM Lite",
    description:
      "Tiny ESP32 board with a built-in LED, button, and Grove connector. Popular in compact sensor nodes and industrial prototyping.",
    tags: ["esp32", "wifi", "bluetooth"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "seeed-xiao-esp32c3",
    name: "Seeed XIAO ESP32-C3",
    description:
      "Thumb-sized ESP32-C3 board with ceramic antenna, LiPo charging, and a breadboard-friendly layout. Great for ultra-compact builds.",
    tags: ["esp32", "wifi", "bluetooth", "low-power", "usb"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
  {
    id: "seeed-xiao-esp32s3",
    name: "Seeed XIAO ESP32-S3",
    description:
      "Compact ESP32-S3 board with OV2640 camera support, microphone, LiPo charging, and native USB. Ideal for TinyML and vision projects.",
    tags: ["esp32-s3", "wifi", "bluetooth", "usb", "low-power"],
    docsUrl: "https://esphome.io/components/esp32.html",
  },
];
