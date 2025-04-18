import Event from "#models/event";
import { BaseSeeder } from "@adonisjs/lucid/seeders";

async function attach(eventId: number, speakers: [number, ...number[]]) {
  const event = await Event.find(eventId);

  if (!event) {
    console.log("Event not found, skipping...");
    return;
  }

  await event.related("speakers").attach(speakers);
}

export default class extends BaseSeeder {
  async run() {
    await attach(1, [1]);
    await attach(2, [2]);
    await attach(3, [3]);
    await attach(4, [4]);
    await attach(5, [5]);
    await attach(6, [6]);
    await attach(7, [7]);
    await attach(8, [8, 9, 10, 11]);
    await attach(9, [12]);
    await attach(10, [13]);
    await attach(11, [14]);
    await attach(12, [15]);
    await attach(13, [16]);
    await attach(14, [17]);
    await attach(15, [18]);
    await attach(16, [19]);
    await attach(17, [20]);
    await attach(18, [21, 22]);
    await attach(19, [23]);
    await attach(20, [24]);
    await attach(21, [25, 26]);
    await attach(22, [27]);
    await attach(23, [28]);
    await attach(24, [29]);
    await attach(25, [30, 31]);
    await attach(26, [32, 33]);
    await attach(27, [34]);
    await attach(28, [35]);
    await attach(29, [36]);
    await attach(30, [37]);
    await attach(31, [38, 39]);
    await attach(32, [40]);
    await attach(33, [41]);
    await attach(34, [42]);
    await attach(35, [43]);
    await attach(36, [44]);
    await attach(37, [45]);
    await attach(38, [46]);
    await attach(39, [47, 48]);
    await attach(40, [49]);
    // await attach(41, [50]);
    await attach(42, [51]);
    await attach(43, [52]);
    await attach(44, [53]);
    await attach(46, [54]);
  }
}
