import Product from "#models/product";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

import { UserTypes } from "../../types/user.js";

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: "Nintendo Switch Lite",
        description: "Compact and lightweight handheld gaming console.",
        price: 17500,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "switch-lite.png",
      },
      {
        name: "GoPro Hero 4K 12MP Wi-Fi Bluetooth",
        description: "High-definition action camera with Wi-Fi and Bluetooth connectivity.",
        price: 17600,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "gopro-hero4.png",
      },
      {
        name: 'Monitor AOC 180Hz 23.8" FullHD 0.5ms',
        description: "Fast response time gaming monitor with high refresh rate.",
        price: 14200,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "aoc-monitor.png",
      },
      {
        name: "Instax Mini 12",
        description: "Compact instant camera for instant photo prints.",
        price: 11800,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "instax-mini.png",
      },
      {
        name: "Sony WH-CH720N Bluetooth",
        description: "High-quality wireless headphones with Bluetooth connectivity.",
        price: 11300,
        stock: 2,
        currency: "points",
        maxOrder: 1,
        image: "sony-wh-ch720n.png",
      },
      {
        name: "Mini projetor HD WIFI",
        description: "Projector with Wi-Fi and bluetooth connectivity.",
        price: 10900,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "mini-projector.png",
      },
      {
        name: "Telado DuckyOne2 Pro",
        description: "Ducky One 2 Pro is a powerful and versatile ducky with a built-in keyboard.",
        price: 10900,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "ducky-one-pro.png",
      },
      {
        name: "Anbernicn Consola Portátil Retro RG35XX",
        description: "Retro gaming console with built-in keyboard.",
        price: 10900,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "consola-retro.png",
      },
      {
        name: "Raspberry Pi 4 Modelo B 2GB",
        description: "Small, powerful single-board computer for developers and hobbyists.",
        price: 9000,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "raspberry-pi4.png",
      },
      {
        name: "Xiaomi TV Box S 8GB Google TV 4K",
        description: "4K streaming media player with Google TV.",
        price: 8700,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "xiaomi-tv-box.png",
      },
      {
        name: "Coluna JBL GO 4",
        description: "Portable Bluetooth speaker with powerful sound.",
        price: 7600,
        stock: 5,
        currency: "points",
        maxOrder: 1,
        image: "jbl-go4.png",
      },
      {
        name: "Xiaomi Smart Band 9 Active",
        description: "Smart band",
        price: 6000,
        stock: 4,
        currency: "points",
        maxOrder: 1,
        image: "xiaomi-smart-band.png",
      },
      {
        name: "Logitech G203 Prodigy",
        description: "Wireless gaming mouse",
        price: 6000,
        stock: 3,
        currency: "points",
        maxOrder: 1,
        image: "logitech-g203.png",
      },
      {
        name: "JLAB Go Air Pop",
        description: "",
        price: 6000,
        stock: 5,
        currency: "points",
        maxOrder: 1,
        image: "jlab-go-air-pop.png",
      },
      {
        name: "Teclado NPLAY Control 3.1",
        description: "Gaming keyboard with RGB lighting.",
        price: 5300,
        stock: 5,
        currency: "points",
        maxOrder: 1,
        image: "nplay-keyboard.png",
      },
      {
        name: "Kodak descartável",
        description: "Câmara descartável",
        price: 5300,
        stock: 4,
        currency: "points",
        maxOrder: 1,
        image: "kodak-descartavel.png",
      },
      {
        name: "Raspberry Pi Zero WH 1GHz 512MB",
        description: "Ultra-small Raspberry Pi board with Wi-Fi.",
        price: 5100,
        stock: 2,
        currency: "points",
        maxOrder: 1,
        image: "raspberry-pi-zero.png",
      },
      {
        name: "Xiaomi Redmi Buds 6 Play",
        description: "Earbuds wireless",
        price: 3900,
        stock: 3,
        currency: "points",
        maxOrder: 1,
        image: "xiaomi-redmi-buds.png",
      },
      {
        name: "Power Bank Goodis 10mAh",
        description: "Power bank",
        price: 5300,
        stock: 20,
        currency: "points",
        maxOrder: 1,
        image: "power-bank-goodis.png",
      },
      {
        name: "Carregador Usb-C Fast Charge",
        description: "",
        price: 4500,
        stock: 1,
        currency: "points",
        maxOrder: 1,
        image: "usb-c-charger.png",
      },
      {
        name: "LED Strip",
        description: "",
        price: 4000,
        stock: 10,
        currency: "points",
        maxOrder: 1,
        image: "led-strip.png",
      },
      {
        name: "JBL T110",
        description: "",
        price: 3700,
        stock: 10,
        currency: "points",
        maxOrder: 1,
        image: "jbl-t110.png",
      },
      {
        name: "NPLAY Glide 1.1",
        description: "",
        price: 3400,
        stock: 10,
        currency: "points",
        maxOrder: 1,
        image: "nplay-glide.png",
      },
      {
        name: "Organizador de cabos",
        description: "",
        price: 2800,
        stock: 10,
        currency: "points",
        maxOrder: 1,
        image: "cable-organizer.png",
      },
      {
        name: "Protetores de Cabo 20 pcs",
        description: "Cable protectors to prevent wear and tear.",
        price: 2700,
        stock: 20,
        currency: "points",
        maxOrder: 1,
        image: "cable-protectors.png",
      },
      {
        name: "Bilhete",
        description: "",
        price: 500,
        stock: 50,
        currency: "points",
        restrictions: {
          groups: [UserTypes.PROMOTER],
        },
        image: "/favicon.svg",
      },
    ]);
  }
}
